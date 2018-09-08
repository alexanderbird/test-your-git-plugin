const testYourGulpPlugin = (name, body) => {
  describe(name, () => {
    const _it = (testDescription, { plugin, input, output }) => {
      it(`${testDescription} in Buffer mode`, pending);
      it(`${testDescription} in Stream mode`, pending);
    }

    const _itIgnoresNullFiles = plugin => {
      it('ignores null files', pending);
    }

    body(_it, _itIgnoresNullFiles);
  });
}

module.exports = testYourGulpPlugin;
