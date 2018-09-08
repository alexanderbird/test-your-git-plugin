const gutil = require('gulp-util');

const _injectFakeBuffer = (plugin, input) => {
  const fakeBuffer = new Buffer(input.contents);
  const fakeFile = new gutil.File(Object.assign({}, input, {
    contents: fakeBuffer
  }));

  plugin.write(fakeFile);
  plugin.end();
}

const testBufferOutputMatches = (plugin, input, output, done) => {
  plugin.on('data', function(newFile) {
    if(output && typeof output.contents === 'string') {
      expect(newFile.contents.toString('utf-8').trim()).toEqual(output.contents.trim());
    }

    if(output && typeof output.path === 'string') {
      expect(newFile.path).toEqual(output.path);
    }
  });

  plugin.on('end', function() {
    done();
  });

  _injectFakeBuffer(plugin, input);
}

const testBufferModeThrowsError = (plugin, input, expectedError, done) => {
  const timeout = 4;
  const timeoutId = setTimeout(() => {
    fail(`Expected an error matching \n  ${expectedError}\n but none was emitted within ${timeout} seconds`);
    done();
  }, timeout * 1000);

  plugin.on('error', function(error) {
    if(typeof expectedError === 'string') {
      expect(error.message).toEqual(expectedError)
    } else {
      expect(error.message).toMatch(expectedError)
    }
    clearTimeout(timeoutId);
    done();
  });

  _injectFakeBuffer(plugin, input);
}

const testBufferModeIgnoresNullFiles = plugin => {
  pending('not yet supported in test-your-gulp-plugin');
}

module.exports = {
  testBufferModeThrowsError,
  testBufferOutputMatches,
  testBufferModeIgnoresNullFiles
}
