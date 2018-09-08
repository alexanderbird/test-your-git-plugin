const { testBufferModeThrowsError, testBufferOutputMatches, testBufferModeIgnoresNullFiles } = require('./buffer-tests');
const { testStreamModeThrowsError, testStreamOutputMatches, testStreamModeIgnoresNullFiles } = require('./stream-tests');

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

    // TODO: implement Stream mode tests also
    it(`${testDescription} in Stream mode`, () => {
      if(error) {
        testStreamModeThrowsError(plugin, input, error);
      } else {
        testStreamOutputMatches(plugin, input, output);
      }
    });
  }
}

// TODO: implement null file tests also
const _itIgnoresNullFiles = plugin => {
  it('ignores null files in Buffer mode', () => {
    testBufferModeIgnoresNullFiles(plugin);
  });

  it('ignores null files in Stream mode', () => {
    testStreamModeIgnoresNullFiles(plugin);
  });
}

const testYourGulpPlugin = (name, body) => {
  describe(name, () => {
    body(_it, _itIgnoresNullFiles);
  });
}

module.exports = testYourGulpPlugin;
