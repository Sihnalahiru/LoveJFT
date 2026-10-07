# JFT Master v7 — Adaptive Exam Lab

## New
- Added `data/past-paper-evidence-bank-v2.json` from the verified 211-question evidence bank.
- Added source-grounded Adaptive Exam Lab with 10-question sessions.
- Questions are selected from the existing uploaded 211 questions; weak/unseen items are prioritized using local progress.
- User answers are checked against the existing source answer field after submission.
- Wrong-item bank is stored locally and used for future adaptive selection.
- Exam score/best score/review/XP state are stored separately from source data.
- Service Worker cache upgraded for the new evidence bank.

## Integrity
- 4 source papers
- 211 evidence-bank questions
- 211 unique paper/question pairs
- Existing past-paper question text and answers are not rewritten by the Exam Lab.
- No new question wording or official answer is invented.
