"""Verify that optimized fonts retain the original glyph outlines and advance widths."""
import json
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.recordingPen import DecomposingRecordingPen

count = 0
for row in json.loads(Path("output/gallery-performance-20260907/font-subsets.json").read_text()):
    original = TTFont(Path("public/fonts") / row["original"])
    optimized = TTFont(Path("public/fonts") / row["optimized"])
    for weight in (400, 500, 600, 900):
        old_set = original.getGlyphSet(location={"wght": weight})
        new_set = optimized.getGlyphSet(location={"wght": weight})
        for char, name in optimized.getBestCmap().items():
            old = old_set[original.getBestCmap()[char]]
            new = new_set[name]
            old_pen = DecomposingRecordingPen(old_set)
            new_pen = DecomposingRecordingPen(new_set)
            old.draw(old_pen)
            new.draw(new_pen)
            assert old.width == new.width, (row["optimized"], char, weight, "width")
            assert old_pen.value == new_pen.value, (row["optimized"], char, weight, "outline")
            count += 1
print(f"Verified {count} original glyph outlines and widths across font weights.")
