# JFT Master v15 — Secure Cloud OCR Gateway

## New in v15

- WorkCheck now has a real cloud-OCR client path.
- Browser image is resized/compressed before upload.
- PWA sends the image only when the learner presses **Analyze with Cloud OCR**.
- Cloudflare Worker acts as the secure gateway.
- Gemini API key remains server-side in the Worker secret.
- Worker returns extracted Japanese text + confidence + notes.
- Client can compare the OCR result with the learner's typed answer.
- Low-confidence OCR is explicitly presented as review-needed, not silently accepted.
- Image is not stored in localStorage.

## Source safety

No source question, Kanji record, answer, or evidence record is rewritten by OCR. OCR is a derived learner-evidence result.

## Deployment requirement

The Worker must be deployed and configured with `GEMINI_API_KEY` before cloud OCR can execute. The PWA intentionally does not contain the secret.

## Verification

- app.js syntax: PASS
- worker.js syntax: PASS
- 211 past-paper source records preserved
- 450 Kanji source records preserved
- v14 base retained
- ZIP integrity: PASS
