'use strict';

function GateChart(o) {
    this._elementSelector = o.elementSelector || null;
    this._inits = o.inits || null;
    this._charts = o.charts || [];
}

GateChart.prototype.process = function() {
    if (this._elementSelector !== null && this._elementSelector !== undefined){
        this._inits = (new MarkupProcessor({elementSelector: this._elementSelector})).process();
    }
    return this;
};

GateChart.prototype.initialize = function() {
    if (this._inits !== null && this._inits !== undefined) {
        if (this._inits.length > 0) {
            for (var i = 0; i < this._inits.length; i++) {
                var ini = this._inits[i],
                    percentage = [],
                    colors = [];

                if (ini.pieces.length > 0) {
                    for (var j = 0; j < ini.pieces.length; j++) {
                        percentage.push(parseInt(ini.pieces[j].value));
                        colors.push(ini.pieces[j].color);
                    }
                }

                this.initChart({
                    id: ini.chart.id,
                    percentage: percentage,
                    colors: colors,
                    chart: ini.chart,
                    minAngle: -90,
                    maxAngle: 90
                });
            }
        }
    }
};

GateChart.prototype.initChart = function(o) {
    var percentage = o.percentage || null,
        colors = o.colors || null,
        id = o.id || null,
        chart = o.chart,
        minAngle = parseInt(chart.af) !== NaN ? parseInt(chart.af) : -90, maxAngle = parseInt(chart.at) !== NaN ? parseInt(chart.at) : 90,
        diffAngle = maxAngle - minAngle,
        pathStringBuilder = new PathStringBuilder();

    if (percentage !== null && colors !== null && id !== null) {
        var sum = percentage.reduce(function(pv, cv) { return pv + cv; }, 0);

        if (sum !== 0){

            var pieChart = new PieChart({elementSelector: '#' + id}),
                j = 0;

            pieChart.initChart();

            percentage.forEach(function(el){
                var angle = diffAngle * el / sum;
                var title = 'Piece #' + j;

                var piePiece = new PiePiece(
                    {
                        title: title,
                        value: el,
                        color: colors[j++],
                        startAngle: minAngle,
                        endAngle: (minAngle + angle),
                        pathString: pathStringBuilder.changeAngles(minAngle, minAngle + angle).getPathString({cx: 80, cy: 80, t: 30, r: 60}).join(''),
                        animatePath: pathStringBuilder.getPathString({outerOffset:8, cx: 80, cy: 80, t: 30, r: 60}).join('')
                    }
                );

                pieChart.addPiePiece(piePiece.initPiece(pieChart.getChart()));
                minAngle += angle;
            });

            this._charts.push(pieChart);
        }
    }

    return this;
}