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
                path: this._animatePath
            }, 200, mina.easein);
        };

        this._hoverOut = function() {
            this._piece.animate({
                path: this._pathString
            }, 200, mina.easein);
        };

        this._piece = chart.path(this._pathString).attr({
            fill: this._color
        }).hover(
            this._hoverIn,
            this._hoverOut,
            this,
            this
        );
    }

    return this;
}