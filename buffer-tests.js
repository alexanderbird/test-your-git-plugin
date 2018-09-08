const gutil = require('gulp-util');

const testBufferOutputMatches = (plugin, input, output, done) => {
  const fakeBuffer = new Buffer(input);
  const fakeFile = new gutil.File({
      contents: fakeBuffer
  });

  plugin.on('data', function(newFile) {
    if(typeof output === 'string') {
      expect(newFile.contents.toString('utf-8').trim()).toEqual(output.trim());
    }
  });

  plugin.on('end', function() {
    done();
  });

  plugin.write(fakeFile);
  plugin.end();
}

const testBufferModeThrowsError = (plugin, input, error) => {
  pending('todo');
}

module.exports = {
  testBufferModeThrowsError,
  testBufferOutputMatches
}
