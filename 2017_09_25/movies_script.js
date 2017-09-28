var compareAttr = function(getAttr) {
    return function(x, y) {
        return getAttr(x) > getAttr(y)? -1 : 1;
    };
};

var getGross = function(data) {
    return data["Worldwide_Gross_M"];
}

var getBudget = function(data) {
    return data["Budget_M"];
}

var getProfit = function(data) {
    return getGross(data) - getBudget(data);
}

var getFilm = function(data) {
    return data["Film"];
}

var render = function(data, attrGetter, chart, color, scale) {
    d3.select(chart).selectAll("div.h-bar")
        .data(data)
        .enter().append("div")
        .attr("class", "h-bar")
        .append("span");
    d3.select(chart).selectAll("div.h-bar")
        .data(data)
        .style("width", function (d) {
            return (attrGetter(d) * scale) + "px";
        })
        .style("background-color", color)
        .select("span")
            .text(function (d) {
                return getFilm(d);
            });
    d3.select(chart).selectAll("div.h-bar")
        .sort(compareAttr(attrGetter));
}

window.onload = function() {
    d3.json("movies.json", function(error, json){ 
        render(json, getGross, "#chart1", "steelblue", 0.4);
        render(json, getBudget, "#chart2", "red", 1);
        render(json, getProfit, "#chart3", "green", 0.4);
    });
};
