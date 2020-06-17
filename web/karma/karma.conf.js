// Karma configuration
module.exports = function(config) {
    var configuration = {

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',

      // plugins starting with karma- are autoloaded
      plugins: [
        'karma-firefox-launcher',
        'karma-jasmine',
        'karma-coverage',
        'karma-spec-reporter'
      ],

      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],

      // list of files / patterns to load in the browser
      files: [
        '../js/*.js'
      ],

      // list of files to exclude
      exclude: [
      ],

      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
        '../js/*.js': ['coverage']
      },

      // optionally, configure the reporter
      coverageReporter: {
        type : 'lcov',
        dir : 'coverage/'
      },
        
      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['spec', 'coverage'],

      // web server port
      port: 9876,

      // enable / disable colors in the output (reporters and logs)
      colors: true,

      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,

      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,

      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['Firefox'],

      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: false,

      // Concurrency level
      // how many browser should be started simultaneous
      concurrency: Infinity
    };

    config.set(configuration);
}