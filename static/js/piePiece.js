'use strict';

function PiePiece(o) {
    this._title = o.title || 'unknown';
    this._value = o.value || 0;
    this._color = o.color || '#000';
    this._startAngle = o.startAngle || 0;
    this._endAngle = o.endAngle || 360;
    this._pathString = o.pathString || '';
    this._hoverIn = o.hoverIn || function() {};
    this._hoverOut = o.hoverOut || function() {};
}

PiePiece.prototype.getPathString = function() {
    return this._pathString;
};

PiePiece.prototype.getColor = function() {
    return this._color;
};