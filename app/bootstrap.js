/**
 * Created by artemvlasov on 16/05/15.
 */
define([
    'require',
    'angular',
    'app',
    'routes',
    'underscore',
    'angularBootstrapTpls'
], function (require, ng) {
    'use strict';
    require(['domReady!', 'angularRoute', 'angularBootstrapTpls'], function (document) {
        ng.bootstrap(document, ['youngPilots']);
    });
});