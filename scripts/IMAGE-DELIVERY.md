# Image build cache

The tracked AVIF files in `public/images/responsive/` are the exact responsive derivatives evaluated for this release. They avoid repeating expensive AVIF encoding during a cold hosting build. The filenames contain a hash of the native master and encoding recipe, followed by the output width. The image preparation script reuses matching files; a changed master or recipe gets a new hash and generates new candidates.

The original photographs remain the masters. These cached derivatives use native-size ceilings, without upscaling, sharpening, AI generation or crop changes. WebP fallbacks and the image manifest are still generated during the build.

For a future image change, run `npm run prebuild` locally, inspect the new derivatives, and explicitly stage only the current AVIF candidates with `git add -f` before deploying. The responsive directory remains ignored to keep experimental encodes out of commits. Preserve any existing candidates still referenced by another image.
