// import path from 'node:path';
// import { readFileSync } from 'node:fs';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

import compareObjects from '../src/index.js';

import { getFixturePath, readFile } from '../src/utils.js';

// const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

const expected = readFile('result.txt').toString();

test('2 json files comparison', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  expect(compareObjects(filepath1, filepath2)).toEqual(expected);
});

test('2 yml files comparison', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');

  expect(compareObjects(filepath1, filepath2)).toEqual(expected);
});
