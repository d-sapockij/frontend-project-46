import gendiff from '../gendiff.js';

const expected = `
{
 - follow: false,
   host: hexlet.io,
 - proxy: 123.234.53.22,
 - timeout: 50,
 + timeout: 20,
 + verbose: true
}
`;

test('diff', () => {
  expect(gendiff('file1.json', 'file2.json')).toEqual(expected);
});
