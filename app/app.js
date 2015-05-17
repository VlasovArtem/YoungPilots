/**
 * Created by artemvlasov on 16/05/15.
 */
define([
    'angular',
    'angularRoute',
    './conferences-page/conferences-index',
    './main-page/main-index',
    './useful-things-page/useful-things-index'
], function (ng) {
    'use strict';

    return ng.module('youngPilots', [
        'ngRoute',
        'ui.bootstrap',
        'youngPilots.main',
        'youngPilots.conferences',
        'youngPilots.usefulThings'
    ]);
});