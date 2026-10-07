# JFT Master — Secure Cloud OCR Gateway

This Worker is the secure bridge between the public PWA and Gemini Vision/OCR.

## 1. Install / deploy

```bash
npx wrangler login
npx wrangler secret put GEMINI_API_KEY
npx wrangler deploy
```

The API key is stored as a Worker secret. **Do not put it in `app.js`, HTML, GitHub Pages, or the browser.**

## 2. Endpoint

After deployment, use:

`https://YOUR-WORKER.workers.dev/ocr`

Enter that URL in **WorkCheck → Cloud OCR Gateway URL** or Settings.

## 3. What the endpoint accepts

```json
{
  "mimeType": "image/jpeg",
  "imageBase64": "...",
  "task": "japanese_handwriting_ocr"
}
```

The Worker sends the image to Gemini's `generateContent` multimodal endpoint using the server-side `GEMINI_API_KEY` secret and returns only the extracted text, confidence, and notes.

## 4. Privacy

The Worker does not intentionally persist the uploaded image. The PWA also does not save the image to localStorage. The image is held in memory for the request and forwarded to the configured AI provider.

## 5. Important

The OCR result is an AI interpretation, not authoritative source data. WorkCheck therefore exposes a confidence value and a manual-review state instead of silently declaring uncertain OCR correct.
