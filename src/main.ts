/**
 * Created by dug on 11/14/14.
 */
/// <reference path="views/AppView.ts" />
var app = new App();
new AppView({model: app}).$el.appendTo('body');
