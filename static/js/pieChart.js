'use strict';

function PieChart(o) {
    this._elementSelector = o.elementSelector || '#svg';
    this._piePieces = o.piePieces || [];
    this._chart = o.chart || null;
}

PieChart.prototype.addPiePiece = function(piePiece) {
    if (piePiece !== undefined && piePiece !== null && piePiece instanceof PiePiece)
        this._piePieces.push(piePiece);

    return this;
};

PieChart.prototype.getPiePieces = function() {
    return this._piePieces;
};

PieChart.prototype.getChartSelector = function() {
    return this._elementSelector;
};

PieChart.prototype.getChart = function() {
    return this._chart;
};

PieChart.prototype.initChart = function() {
    this._chart = Snap(this._elementSelector);
    return this;
};