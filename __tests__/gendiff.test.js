import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename));

const expectedStylish = readFixtureFile('stylish.txt').toString();
const expectedPlain = readFixtureFile('plain.txt').toString();
const expectedJson = readFixtureFile('json.txt').toString();

const jsonFilePath1 = getFixturePath('file1.json');
const jsonFilePath2 = getFixturePath('file2.json');
const ymlFilePath1 = getFixturePath('file1.yml');
const ymlFilePath2 = getFixturePath('file2.yml');

test('2 json files STYLISH comparison', () => {
  expect(genDiff(jsonFilePath1, jsonFilePath2, 'stylish')).toEqual(expectedStylish);
});

test('2 yml files STYLISH comparison', () => {
  expect(genDiff(ymlFilePath1, ymlFilePath2, 'stylish')).toEqual(expectedStylish);
});

test('json and yml files STYLISH comparison', () => {
  expect(genDiff(jsonFilePath1, ymlFilePath2, 'stylish')).toEqual(expectedStylish);
});

test('2 json files PLAIN comparison', () => {
  expect(genDiff(jsonFilePath1, jsonFilePath2, 'plain')).toEqual(expectedPlain);
});

test('2 yml files PLAIN comparison', () => {
  expect(genDiff(ymlFilePath1, ymlFilePath2, 'plain')).toEqual(expectedPlain);
});

test('2 json files JSON comparison', () => {
  expect(genDiff(jsonFilePath1, jsonFilePath2, 'json')).toEqual(expectedJson);
});

test('2 yml files JSON comparison', () => {
  expect(genDiff(ymlFilePath1, ymlFilePath2, 'json')).toEqual(expectedJson);
});

test('json and yml files JSON comparison', () => {
  expect(genDiff(ymlFilePath1, jsonFilePath2, 'json')).toEqual(expectedJson);
});

test('DEFAULT format comparison', () => {
  expect(genDiff(jsonFilePath1, ymlFilePath2)).toEqual(expectedStylish);
});
