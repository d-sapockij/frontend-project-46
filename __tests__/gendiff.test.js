import genDiff from '../src/index.js';

import { getFixturePath, readFile } from '../src/utils/readFileUtils.js';

const expectedStylish = readFile('stylish.txt').toString();
const expectedPlain = readFile('plain.txt').toString();

test('2 json files stylish comparison', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  expect(genDiff(filepath1, filepath2, { format: 'stylish' })).toEqual(expectedStylish);
});

test('2 yml files stylish comparison', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');

  expect(genDiff(filepath1, filepath2, { format: 'stylish' })).toEqual(expectedStylish);
});

test('json and yml files stylish comparison', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.json');

  expect(genDiff(filepath1, filepath2, { format: 'stylish' })).toEqual(expectedStylish);
});

test('2 json files plain comparison', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  expect(genDiff(filepath1, filepath2, { format: 'plain' })).toEqual(expectedPlain);
});

test('2 yml files plain comparison', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');

  expect(genDiff(filepath1, filepath2, { format: 'plain' })).toEqual(expectedPlain);
});

test('default format comparison', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.json');

  expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish);
});
