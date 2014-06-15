'use strict';

function PiePiece(o) {
    this._elementSelector = o.elementSelector || '.piePiece';
    this._title = o.title || 'unknown';
    this._value = o.value || 0;
    this._color = o.color || '#000';
    this._startAngle = o.startAngle || 0;
    this._endAngle = o.endAngle || 360;
    this._pathString = o.pathString || '';
    this._animatePath = o.animatePath || '';
    this._hoverIn = o.hoverIn || function() {};
    this._hoverOut = o.hoverOut || function() {};
    this._piece = o.piece || null;
}

PiePiece.prototype.getPathString = function() {
    return this._pathString;
};

PiePiece.prototype.getColor = function() {
    return this._color;
};

PiePiece.prototype.getPiece = function() {
    return this._piece;
};

PiePiece.prototype.initPiece = function(chart) {
    if (chart !== null && chart !== undefined) {
        this._hoverIn = function() {
            this._piece.animate({
                path: 'M200,100A200,200,0,0,1,243.3678737703098,109.89324373476495L221.6839368851549,154.94662186738248A50,50,0,0,0,200,150z'
            }, 500, mina.easeinout);
        };

        this._hoverOut = function() {
            console.log(this);
            this._piece.animate({
                path: this._pathString
            }, 500, mina.easeinout);
        };

        this._piece = chart.path(this._pathString).attr({
            fill: this._color,
            stroke: "#000000",
            strokeWidth: 1
        }).hover(
            this._hoverIn,
            this._hoverOut,
            this,
            this
        );
    }
    console.log(this._pathString);
    return this;
}