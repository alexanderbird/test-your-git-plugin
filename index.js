const { testBufferModeThrowsError, testBufferOutputMatches, testBufferModeIgnoresNullFiles } = require('./buffer-tests');
const { testStreamModeThrowsError, testStreamOutputMatches, testStreamModeIgnoresNullFiles } = require('./stream-tests');

const _it = (testDescription, { plugin, input, output, error, pending: isPending }) => {
  const fullInput = !input || typeof input.contents === 'string' ? input : { contents: input.toString() };
  const fullOutput = !output || typeof output.contents === 'string' ? output : { contents: output.toString() };
  if(isPending) {
    it(testDescription, () => {
      typeof isPending === 'string' ? pending(isPending) : pending();
    });
  } else {
    it(`${testDescription} in Buffer mode`, (done) => {
      if(error) {
        testBufferModeThrowsError(plugin, fullInput, error, done);
      } else {
        testBufferOutputMatches(plugin, fullInput, fullOutput, done);
      }
    });

    // TODO: implement Stream mode tests also
    it(`${testDescription} in Stream mode`, () => {
      if(error) {
        testStreamModeThrowsError(plugin, fullInput, error);
      } else {
        testStreamOutputMatches(plugin, fullInput, fullOutput);
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
