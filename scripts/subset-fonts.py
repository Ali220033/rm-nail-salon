"""Optional asset maintenance: pip install fonttools brotli, then run after a build.

Keep full originals as fallback fonts for any future characters outside the subset.
The committed outputs need no Python at deployment time.
"""
from hashlib import sha256
from html.parser import HTMLParser
from pathlib import Path
import json
from fontTools import subset
from fontTools.ttLib import TTFont


class TextCollector(HTMLParser):
    def handle_data(self, data):
        characters.update(map(ord, data))


characters = set(range(32, 127))
parser = TextCollector()
for page in Path("dist").rglob("*.html"):
    parser.feed(page.read_text(encoding="utf-8"))
for file in Path("src").glob("*.*"):
    if file.suffix in (".jsx", ".js", ".css"):
        characters.update(map(ord, file.read_text(encoding="utf-8")))

root = Path("public/fonts")
css = ['@import "./site-fonts.css";']
report = []
for file, family, style, weight in [
    ("rm-inter-normal-latin", "Inter", "normal", "300 900"),
    ("rm-playfair-normal-latin", "Playfair Display", "normal", "400 600"),
    ("rm-playfair-italic-latin", "Playfair Display", "italic", "400 500"),
]:
    source = root / (file + ".woff2")
    font = TTFont(source)
    retained = sorted(characters.intersection(font.getBestCmap()))
    options = subset.Options()
    options.layout_features = ["*"]
    options.recalc_timestamp = False
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=retained)
    subsetter.subset(font)
    target = root / (file + "-subset.woff2")
    font.flavor = "woff2"
    font.save(target)
    digest = sha256(target.read_bytes()).hexdigest()[:10]
    versioned = target.with_name(file + "-" + digest + ".woff2")
    target.replace(versioned)
    unicode_range = ",".join(f"U+{code:X}" for code in retained)
    css.append(f"@font-face {{ font-family: '{family}'; font-style: {style}; font-weight: {weight}; font-display: swap; src: url('/fonts/{versioned.name}') format('woff2'); unicode-range: {unicode_range}; }}")
    report.append({"original": source.name, "optimized": versioned.name, "before": source.stat().st_size, "after": versioned.stat().st_size, "characters": retained})

(root / "optimized-fonts.css").write_text("\n".join(css) + "\n", encoding="utf-8")
Path("output/gallery-performance-20260907/font-subsets.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps([{k: v for k, v in row.items() if k != "characters"} for row in report], indent=2))
