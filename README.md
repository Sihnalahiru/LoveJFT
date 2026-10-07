# JFT Master — Final Release Candidate v16

This release is built from the latest locally available JFT Master build, with source data preserved and release-blocking defects found during final QA corrected.

## Frozen source scope
- Past Papers: 4 sets / **211 questions**
- JFT Master Kanji: **exactly 450 source records**
- Source catalog: **18 documents**
- Evidence bank: **211 normalized evidence records**
- The two explicitly removed unprocessed source files remain excluded.

## Final fixes
- Service-worker cache version advanced to `jft-master-v16-final-release`.
- Cloudflare Worker name aligned to `i-jft`.
- OCR gateway defaults to the configured Worker URL but remains user-overridable.
- Gemini 3.8 Flash migration: deprecated `temperature` parameter removed from the GenerateContent request. Gemini 3.8 Flash is currently GA according to Google AI documentation.

## Important external dependency
The PWA contains no Gemini API key. The key must remain a Cloudflare Worker Secret (`GEMINI_API_KEY`). The final QA can validate the Worker contract locally, but a real Gemini OCR request cannot be certified without a live deployed Worker with its secret configured.

## Release QA
See `QA-REPORT-v16-FINAL.txt` and `qa-release.js`.
