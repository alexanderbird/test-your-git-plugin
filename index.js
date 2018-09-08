const _testBufferOutputMatches = (plugin, input, output) => {
  pending('todo');
}

const _testStreamOutputMatches = (plugin, input, output) => {
  pending('todo');
}

const _testBufferModeThrowsError = (plugin, input, error) => {
  pending('todo');
}

const _testStreamModeThrowsError = (plugin, input, error) => {
  pending('todo');
}

const _it = (testDescription, { plugin, input, output, error, pending: isPending }) => {
  if(isPending) {
    it(testDescription, () => {
      typeof isPending === 'string' ? pending(isPending) : pending();
    });
  } else {
    it(`${testDescription} in Buffer mode`, () => {
      if(error) {
        _testBufferModeThrowsError(plugin, input, error);
      } else {
        _testBufferOutputMatches(plugin, input, output);
      }
    });

    it(`${testDescription} in Stream mode`, () => {
      if(error) {
        _testStreamModeThrowsError(plugin, input, error);
      } else {
        _testStreamOutputMatches(plugin, input, output);
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
