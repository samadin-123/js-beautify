# Evaluation Setup

This file is outside the editable surface. It defines how results are judged. Agents cannot modify the evaluator or the scoring logic — the evaluation is the trust boundary.

eval_cores: 1
eval_memory_gb: 1.0
prereq_command:

## Setup

Install Node.js dependencies:

```bash
npm install
```

This installs:
- `benchmark` package for performance measurement
- Core dependencies: `config-chain`, `editorconfig`, `glob`, `nopt`
- Dev dependencies including test frameworks

The project has no build step - the source in `js/src/` is used directly by Node.js. Test data files in `test/resources/` contain representative JavaScript files for benchmarking:
- `underscore.js` (48KB) - readable open-source library
- `underscore-min.js` (16KB) - minified version
- `github-min.js` (214KB) - large minified production code

## Run command

```bash
node .polyresearch/benchmark.js
```

The benchmark script:
1. Loads three representative JavaScript files from `test/resources/`
2. Runs warm-up passes to stabilize V8 optimization
3. Uses the Benchmark.js library to measure operations per second for each file
4. Calculates the average ops/sec across all three files
5. Outputs `METRIC=<number>` where number is the average operations per second

## Output format

The benchmark prints `METRIC=<number>` to stdout, where the number represents the average beautification operations per second across the three test files.

Example output:
```
METRIC=42.50
```

## Metric parsing

The CLI looks for `METRIC=<number>` in the output.

## Ground truth

Baseline measurement on a fresh checkout represents the beautification throughput of js-beautify's JavaScript parser/formatter. The metric is operations per second - higher values indicate the beautifier can process more files per second. The three test files represent different characteristics:
- **underscore.js**: Well-formatted, medium-complexity library code
- **underscore-min.js**: Minified version requiring extensive reformatting
- **github-min.js**: Large-scale production code stressing parser performance

The average across these files provides a balanced view of performance across different input types. Improvements should maintain correctness - the beautifier must produce valid, properly formatted output for all inputs.
