#!/usr/bin/env node
/**
 * @license
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const fs = require('fs');
if (process.argv.length < 3) {
  console.log('File not provided');
  process.exit(1);
}

try {
  const path = process.argv[2];
  const data = fs.readFileSync(path);
  const aggregations = JSON.parse(data).aggregations;
  const pwa = aggregations.find(a => a.name === 'Progressive Web App');
  const avg = pwa.score.reduce((last, s) => {
    return last + s.overall;
  }, 0) / pwa.score.length;

  // Failed to get more than 60% in the PWA section, so bail.
  // This is currently super lenient because I'm not testing over HTTPS, which
  // means those tests will fail.
  console.log(`Score: ${avg}`);

  if (avg < 0.4) {
    console.log(JSON.stringify(pwa, null, 2));
    process.exit(1);
  }

  // All good.
  process.exit(0);
} catch (e) {
  console.log(e);
  process.exit(1);
}