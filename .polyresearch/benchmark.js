#!/usr/bin/env node
/*
 * Performance benchmark for js-beautify
 * Measures operations per second across three representative files
 */

'use strict';

var fs = require('fs');
var path = require('path');
var Benchmark = require('benchmark');

// Load beautifier from source
var beautifier = require('../js/src/index');

function runBenchmark() {
  var testDir = path.join(__dirname, '../test/resources');

  // Load test files
  var underscoreJs = fs.readFileSync(path.join(testDir, 'underscore.js'), 'utf8');
  var underscoreMin = fs.readFileSync(path.join(testDir, 'underscore-min.js'), 'utf8');
  var githubMin = fs.readFileSync(path.join(testDir, 'github-min.js'), 'utf8');

  var options = {
    wrap_line_length: 80
  };

  // Warmup runs
  beautifier.js(underscoreJs, options);
  beautifier.js(underscoreMin, options);
  beautifier.js(githubMin, options);

  var suite = new Benchmark.Suite();
  var results = {};

  suite
    .add('underscore', function() {
      beautifier.js(underscoreJs, options);
    })
    .add('underscore-min', function() {
      beautifier.js(underscoreMin, options);
    })
    .add('github-min', function() {
      beautifier.js(githubMin, options);
    })
    .on('cycle', function(event) {
      var benchmark = event.target;
      results[benchmark.name] = benchmark.hz;
    })
    .on('complete', function() {
      // Calculate average ops/sec across all benchmarks
      var names = ['underscore', 'underscore-min', 'github-min'];
      var totalOps = 0;
      var count = 0;

      names.forEach(function(name) {
        if (results[name]) {
          totalOps += results[name];
          count++;
        }
      });

      var avgOps = count > 0 ? totalOps / count : 0;

      // Output in the required format
      console.log('METRIC=' + avgOps.toFixed(2));
    })
    .run({ async: false });
}

if (require.main === module) {
  try {
    runBenchmark();
  } catch (error) {
    console.error('Benchmark error:', error.message);
    process.exit(1);
  }
}
