# JFT Master v16 — Final Release

Release candidate built from the locally available v15 artifact and corrected during final QA.

## Included
- JFT Master PWA
- 450 Kanji source records
- 211 practice/past-paper questions across 4 sets
- 211 evidence records
- 18 source documents
- Adaptive Exam Lab, timed/resumable exam flow, history/review/replay
- WorkCheck Cloud OCR client flow
- Cloudflare Worker OCR gateway source
- PWA service worker/offline cache

## External live verification limitation
The package is locally syntax/data/HTTP/Worker-contract tested. Live Gemini OCR and live Cloudflare deployment cannot be truthfully marked PASS from this environment because the deployed Worker and secret are not accessible for an authenticated POST test.
