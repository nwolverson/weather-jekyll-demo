/*jslint node: true */
/*globals d3,phantom,chart */
"use strict";

var system = require('system');
var fs = require('fs');

if (system.args.length < 3) {
    console.log("Usage: phantomjs generate.js YYYYMMDD filename");
    phantom.exit();
}
var date = system.args[1];
var fileName = system.args[2];

console.log("Generating: " + fileName);

var page = require('webpage').create();
page.viewportSize = { width: 30, height: 20 };

page.open("weather.html", function (status) {
    page.evaluate(function (date) {
        chart(date, function () {
            window.callPhantom();
        });
    }, date);
});


page.onCallback = function () {
    var x = page.evaluate(function () {
        document.body.style.margin = "0px";
        return d3.select("body").html();
    });
    fs.write(fileName, x, 'w');
    page.render(fileName + ".jpg", {format: 'jpeg', quality: '100'});
    page.render(fileName + ".png");
    console.log("Success: " + fileName);
    phantom.exit();
};