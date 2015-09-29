
module.exports = function (config) {
  'use strict';
  console.log("setting config");
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai', 'sinon',],

    files: [
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-route/angular-route.js',
      'client/*.js',
      'client/tests/*Test.js',
      // 'server/**/*.js',
      // 'server/tests/*Test.js'
    ],

    reporters: ['progress'],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS']

  });
};
