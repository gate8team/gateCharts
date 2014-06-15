'use strict';

function MarkupProcessor(o) {
    this._elementSelector = o.elementSelector || null;
}

MarkupProcessor.prototype.process = function() {
    if (this._elementSelector !== null && this._elementSelector !== undefined) {
        var charts = document.querySelectorAll(this._elementSelector),
            processedChart = [];

        if (charts && charts.length > 0) {
            for (var i = 0; i < charts.length; i++) {
                charts[i].className += ' element -hidden';
                var chartInit = {
                        cx: charts[i].getAttribute('cx') || 80,
                        cy: charts[i].getAttribute('cy') || 80,
                        t: charts[i].getAttribute('t') || 30,
                        r: charts[i].getAttribute('r') || 60,
                        o: charts[i].getAttribute('o') || 60,
                        af: charts[i].getAttribute('af') || -90,
                        at: charts[i].getAttribute('at') || -90,
                        id: charts[i].getAttribute('sid') || 'svg'
                    },
                    pieceInit = [];

                if (charts[i].children.length > 0){
                    for (var j = 0; j < charts[i].children.length; j++){
                        pieceInit.push({
                            title: charts[i].children[j].getAttribute('title'),
                            color: charts[i].children[j].getAttribute('color'),
                            value: charts[i].children[j].getAttribute('value')
                        });
                    }
                }

                processedChart.push({
                    chart: chartInit,
                    pieces: pieceInit
                });
            }
        }
        return processedChart;
    }
};

MarkupProcessor.prototype.createSVG = function(id) {
    var id = 'chart' + id || (this.generateGUID()),
        svg = document.createElement('svg');
    svg.setAttribute('svg', id);
    document.body.appendChild(svg);

    return id;
};

MarkupProcessor.prototype.generateGUID = function(number) {
    var result, i, j;
    result = '';
    for(j=0; j<32; j++) {
        if( j == 8 || j == 12|| j == 16|| j == 20)
            result = result + '';
        i = Math.floor(Math.random()*16).toString(16).toUpperCase();
        result = result + i;
    }
    return result;
}