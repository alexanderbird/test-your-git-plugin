const { testBufferModeThrowsError, testBufferOutputMatches } = require('./buffer-tests');
const { testStreamModeThrowsError, testStreamOutputMatches } = require('./stream-tests');

const _it = (testDescription, { plugin, input, output, error, pending: isPending }) => {
  if(isPending) {
    it(testDescription, () => {
      typeof isPending === 'string' ? pending(isPending) : pending();
    });
  } else {
    it(`${testDescription} in Buffer mode`, (done) => {
      if(error) {
        testBufferModeThrowsError(plugin, input, error, done);
      } else {
        testBufferOutputMatches(plugin, input, output, done);
      }
    });

    it(`${testDescription} in Stream mode`, () => {
      if(error) {
        testStreamModeThrowsError(plugin, input, error);
      } else {
        testStreamOutputMatches(plugin, input, output);
      }
    });
  }
}

  const _itIgnoresNullFiles = plugin => {
    it('ignores null files', pending);
  }

const testYourGulpPlugin = (name, body) => {
  describe(name, () => {
    body(_it, _itIgnoresNullFiles);
  });
}

module.exports = testYourGulpPlugin;
