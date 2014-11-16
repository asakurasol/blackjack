/// <reference path="views/AppView.ts" />
var app = new App();
new AppView({model: app}).$el.appendTo('body');
//debugger;