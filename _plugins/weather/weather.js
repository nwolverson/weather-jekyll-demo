/// <reference path="d3.v3.js" />

var width = 30, height = 20;

var apikey = 'API_KEY_HERE';
function chart(date, callback) {
    d3.jsonp('http://api.wunderground.com/api/' + apikey + '/history_' + date + '/q/UK/Edinburgh.json?callback={callback}', function (data) {
        var temps = data.history.observations.map(function (x) { return parseFloat(x.tempm, 10); });
        var x_scale = d3.scale.linear()
            .range([0, width])
            .domain([0, temps.length]);

        var y_scale = d3.scale.linear()
            .range([height, 0])
            .domain([d3.min(temps), d3.max(temps)]);

        var draw_line = d3.svg.line()
            .interpolate("basis")
            .x(function (d, i) { return x_scale(i); })
            .y(function (d) { return y_scale(d); });

        d3.select("svg")
            .attr("width", width)
            .attr("height", height)
          .append("path").datum(temps)
            .attr("d", draw_line);

        if (callback) {
            callback();
        }
    });
}