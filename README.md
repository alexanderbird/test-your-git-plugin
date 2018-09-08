# Easily test your Gulp plugin. 

In [gulp's testing docs](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/testing.md) it explains how to test in buffer & stream mode,
involves making new Buffers, Streams, etc. -- all pretty low level tests.

`test-your-gulp-plugin` gives you:

* the standard tests out of the box (i.e. `it('ignores null files', () => { ... })`) so you don't have to write them at all
* you provide expected inputs and outputs as strings, and they are validated in buffer mode and stream mode
* no messing about with files, streams, and buffers


Example: testing imaginary gulp plugin `gulp-swap-case` which mixes up casing
```
const testYourGulpPlugin = require('test-your-gulp-plugin');
const gulpSwapCase = require('..');

testYourGulpPlugin('gulp-swap-case', () => {
  it('switches lowercase to uppercase', {
    plugin: gulpSwapCase(),
    input: `
      sample lowercase input
    `,
    output: `
      SAMPLE LOWERCASE INPUT
    `
  })

  it('switches mixed case', {
    plugin: gulpSwapCase(),
    input: `
      some lower SOME UPPER
    `,
    output: `
      SOME LOWER some upper
    `
  })

  it('forces all to uppercase if allUpper: true is given in options', {
    plugin: gulpSwapCase({ allUpper: true }),
    input: `
      some lower SOME UPPER 
    `,
    output: `
      SOME LOWER SOME UPPER
    `
  });
});
```


## Future work
* Add support for testing file names
