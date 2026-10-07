# JFT Master v13 — Runtime Recovery + Timed Exam

- Restored the missing Exam Lab renderer in the v12 runtime so `case 'exam'` has a concrete UI.
- Added three session entry points: Adaptive 10Q, Timed 10Q, Weak Replay.
- Timed mode uses a 10-minute local countdown and automatically marks the active unanswered item incorrect when time expires.
- Existing source question/answer data remains unchanged.
- Service Worker cache: `jft-master-v13-timed-exam`.
- Syntax checks: `app.js` PASS, `sw.js` PASS.
