# Research Program

cli_version: 0.5.3
default_branch: main
lead_github_login: samadin-123
maintainer_github_login: samadin-123
metric_tolerance: 0.01
metric_direction: higher_is_better
required_confirmations: 0
auto_approve: true
min_queue_depth: 5
assignment_timeout: 24h

## Goal

Improve the beautification throughput (operations per second) of the js-beautify JavaScript beautifier. The baseline metric measures how many times per second the beautifier can process three representative JavaScript files (underscore.js, underscore-min.js, and github-min.js). Target improvements through algorithmic optimizations, better data structures, or reduced unnecessary work in the core beautification logic.

## What you CAN modify

- `js/src/javascript/*.js` — JavaScript beautifier source code
- `js/src/css/*.js` — CSS beautifier source code
- `js/src/html/*.js` — HTML beautifier source code
- `js/src/core/*.js` — Core utilities shared across beautifiers
- `js/src/unpackers/*.js` — Code unpackers
- `js/src/index.js` — Main entry point

## What you CANNOT modify

- `PROGRAM.md` — research program specification
- `PREPARE.md` — evaluation setup and trust boundary
- `.polyresearch/` — runtime directory and benchmark scripts
- `test/` — test data and test harness
- `js/test/` — test suites
- Any file that defines the evaluation harness or scoring logic

## Constraints

- All changes must pass the evaluation harness defined in PREPARE.md.
- Each experiment should be atomic and independently verifiable.
- All else being equal, simpler is better. A small improvement that adds ugly complexity is not worth keeping. Removing code and getting equal or better results is a great outcome.
- If a run crashes, use judgment: fix trivial bugs (typos, missing imports) and re-run. If the idea is fundamentally broken, skip it and move on.
- Document what you tried and what you observed in the attempt summary.

## Strategy hints

- Read the full codebase before your first experiment. Understand what you are working with.
- Start with the lowest-hanging fruit.
- Measure before and after every change.
- Read results.tsv to learn from history. Do not repeat approaches that already failed.
- If an approach does not show improvement after reasonable effort, release and move on.
- Try combining ideas from previous near-misses.
- If you are stuck, try something more radical. Re-read the source for new angles.
