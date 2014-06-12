'use strict';

function PieChart(o) {
    this._chartSelector = o.chartSelector || '#svg';
    this._piePieces = o.piePieces || [];
}

PieChart.prototype.addPiePiece = function(piePiece) {
    if (piePiece !== 'undefined' && piePiece !== null && piePiece instanceof PiePiece)
        this._piePieces.push(piePiece);

    return this;
};

PieChart.prototype.getPiePieces = function() {
    return this._piePieces;
};

PieChart.prototype.getChartSelector = function() {
    return this._chartSelector;
};