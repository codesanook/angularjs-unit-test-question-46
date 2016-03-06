module.exports = function (config) {
    config.set({

        basePath: '',
        frameworks: ['jasmine'],

        files: [
            'lib/jquery-2.2.0.min.js',
            'lib/angular-1.5.0/angular.min.js',
            'lib/angular-1.5.0/angular-mocks.js',
            'lib/angular-1.5.0/ui-bootstrap-tpls-1.2.2.js',
            'src/**/*.js',
            'src/**/*.html'
        ],

        exclude: [],

        preprocessors: {
            'src/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            cacheIdFromPath: function (filePath) {

                console.log("filePath " + filePath);
                var cacheId = filePath.replace("src/", "");

                console.log("cacheId " + cacheId);
                return cacheId;
            },
            moduleName: 'ngTemplates'
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false,

        concurrency: Infinity
    })
};
