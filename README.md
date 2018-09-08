# Easily test your Gulp plugin. 

In [gulp's testing docs](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/testing.md) it explains how to test in buffer & stream mode,
involves making new Buffers, Streams, etc. -- all pretty low level tests.

`test-your-gulp-plugin` gives you:

* the standard tests out of the box (i.e. `it('ignores null files', () => { ... })`) so you don't have to write them at all
* you provide expected inputs and outputs as strings, and they are validated in buffer mode and stream mode
* no messing about with files, streams, and buffers


Example: testing imaginary gulp plugin `gulp-swap-case` which mixes up casing
```
// test/index.js
const testPlugin = require('test-your-gulp-plugin');
const gulpSwapCase = require('..');

testPlugin('gulp-swap-case', (it, itIgnoresNullFiles) => {
  itIgnoresNullFiles(gulpSwapCase());

  it('switches mixed case', {
    plugin: gulpSwapCase(),
    input: 'some lower SOME UPPER',
    output: 'SOME LOWER some upper'
  })

  it('forces all to uppercase if allUpper: true is given in options', {
    plugin: gulpSwapCase({ allUpper: true }),
    input: 'some lower SOME UPPER',
    output: 'SOME LOWER SOME UPPER'
  });

  it('does something that I haven\'t written a test for yet', {
    pending: 'waiting on X'
    // or, `pending: true` will work too
  });

  it('errors in a given situation', {
    plugin: gulpSwapCase(),
    input: 'whatever',
    error: 'Can\'t change case when text is exactly `whatever`'
  });
});
```

For more examples, see [gulp-json-handlebars](https://github.com/alexanderbird/gulp-json-handlebars) which uses test-your-gulp-plugin.

## Run the tests: use Jasmine
from command line:
```
npm install --save-dev jasmine
npx jasmine test/index.js
```

Or, instead of using `[npx](https://www.npmjs.com/package/npx)`, add `"test": "jasmine test/index.js" to your `package.json`

# Contribution
Yes please! I will liberally accept PRs. 

## Future work
* Add support for testing file names
* add stream mode tests
* add null file tests (maybe? are they needed?)
* give examples of tests for side effects -- things other than input/output

## Implementation notes
See the [gulp docs for testing plugins](https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/testing.md) for details.
That page links to a few plugins with "high-quality Testing" -- they're good examples to work off of
