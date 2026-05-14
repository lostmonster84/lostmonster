---
title: "It builds" does not mean "it works" - verify behaviour, not just compilation
platform: process
verified: 2026-03-18
severity: high
---

A successful build, a green deploy, and a passing healthcheck do NOT prove that a feature works. Infrastructure changes (cron jobs, background workers, webhooks, scheduled tasks) can build and deploy perfectly while being completely non-functional. AUDIX scored 9/10 on a change that broke all cron jobs because it only verified the build succeeded.

**Why:** Build systems verify code compiles. Deploy systems verify the container starts. Healthchecks verify the web server responds. None of these verify that a cron job fires, that a webhook receives data, that a background worker processes its queue, or that a scheduled email sends. The gap between "deployed" and "working" is where silent failures live.

**How to apply:**
- For cron jobs: wait for the first scheduled run and verify it completes (check logs, database records, or output)
- For webhooks: send a test event and verify it processes end-to-end
- For background workers: queue a test job and verify it completes
- For email: verify at least one email is sent and received (check provider dashboard)
- AUDIX must not score above 5/10 for infrastructure work until **proof of life** is confirmed - actual execution, not just successful deployment
- The Gaffer must not approve infra changes same-session unless proof of life is demonstrated
