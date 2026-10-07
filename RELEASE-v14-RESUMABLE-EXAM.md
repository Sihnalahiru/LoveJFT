# JFT Master v14 — Resumable Exam Sessions

## New functional capability
- Exam sessions are autosaved locally outside frozen source data.
- Current question, typed answer, feedback, result arrays, mode, session number and timed deadline are persisted.
- Exam Review shows a Saved Session control after refresh/close.
- Resume reconstructs the session from canonical question IDs against the loaded evidence/source dataset.
- Timed sessions retain their original absolute deadline; reopening does not reset the timer.
- Saved sessions can be explicitly discarded.

## Source safety
- No source question wording, answers, Kanji records, or evidence records are rewritten.
- Resume state stores only learner/session metadata and canonical question IDs.

## Validation
- app.js syntax: PASS
- sw.js syntax: PASS
- past-papers.json question total: 211
- evidence bank question total: 211
- kanji source records: 450
- ZIP integrity: PASS
