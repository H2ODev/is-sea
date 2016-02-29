var fs = require('fs');

module.exports = function(config) {

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    if (!fs.existsSync('sauce.json')) {
      console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
      process.exit(1);
    } else {
      process.env.SAUCE_USERNAME = require('./sauce').username;
      process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = {
              'iOS': [{
                browserName: 'iphone',
                platform: 'OS X 10.10',
                version: '8.2',
                deviceName: 'iPhone Simulator'
              }, {
                browserName: 'iphone',
                platform: 'OS X 10.10',
                version: '8.2',
                deviceName: 'iPad Simulator'
              }],
              'android': [{
                browserName: 'android',
                platform: 'Linux',
                version: '5.1',
                deviceName: 'Android Emulator'
              }],
              'mac': [{
                browserName: 'safari',
                platform: 'OS X 10.10',
                version: '8.0'
              }, {
                browserName: 'firefox',
                platform: 'OS X 10.10',
                version: '36.0'
              }, {
                browserName: 'chrome',
                platform: 'OS X 10.10',
                versiono: '41.0'
              }],
              'windows7': [{
                browserName: 'internet explorer',
                platform: 'Windows 7',
                version: '11.0'
              }, {
                browserName: 'internet explorer',
                platform: 'Windows 7',
                version: '10.0'
              }, {
                browserName: 'internet explorer',
                platform: 'Windows 7',
                version: '9.0'
              }, {
                browserName: 'opera',
                platform: 'Windows 7',
                version: '12.12'
              }],
              'windowsXP': [{
                browserName: 'internet explorer',
                platform: 'Windows XP',
                version: '8.0'
              }, {
                browserName: 'internet explorer',
                platform: 'Windows XP',
                version: '7.0'
              }, {
                browserName: 'internet explorer',
                platform: 'Windows XP',
                version: '6.0'
              }],
              'linux': [{
                browserName: 'opera',
                platform: 'Linux',
                version: '12.15'
              }, {
                browserName: 'firefox',
                platform: 'Linux',
                version: '37.0'
              }, {
                browserName: 'chrome',
                platform: 'Linux',
                version: '41.0'
              }]
            };

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','jquery-chai'],


    // list of files / patterns to load in the browser
    files: [
      'lib/*.js',
      'test/*.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'saucelabs'],


    // web server port
    port: 9876,

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    sauceLabs: {
      testName: 'isSEA Browser Compatibility',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      startConnect: false
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};