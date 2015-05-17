/**
 * Created by artemvlasov on 16/05/15.
 */
require.config({
    baseUrl: 'app',
    paths: {
        "modernizr" : "bower_components/html5-boilerplate/js/vendor/modernizr-2.6.2.min",
        "jquery" :"bower_components/jquery/dist/jquery",
        "angular" :"bower_components/angular/angular",
        "angularRoute": "bower_components/angular-route/angular-route",
        "domReady": "bower_components/requirejs-domready/domReady",
        "angularResource":"bower_components/angular-resource/angular-resource",
        "underscore":"bower_components/underscore/underscore",
        "angularUnderscoreModule":"bower_components/angular-underscore-module/angular-underscore-module",
        "angularBootstrap": "bower_components/angular-bootstrap/ui-bootstrap",
        "angularBootstrapTpls": "bower_components/angular-bootstrap/ui-bootstrap-tpls"
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angularRoute': {
            deps: ['angular'],
            exports: 'angularRoute'
        },
        'angularResource': {
            deps: ['angular']
        },
        'angularBootstrapTpls': {
            deps: ['angular'],
            exports: 'angularBootstrapTpls'
        }
    },
    deps: ['./bootstrap']
});