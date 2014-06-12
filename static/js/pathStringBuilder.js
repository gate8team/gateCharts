'use strict';

function PathStringBuilder(startAngle, endAngle) {
    this._startAngle = startAngle || 0;
    this._endAngle = endAngle || 360;
}

PathStringBuilder.prototype.changeAngles = function(startAngle, endAngle) {
    this._startAngle = startAngle || 0;
    this._endAngle = endAngle || 360;

    return this;
};

PathStringBuilder.prototype.convertAngle = function(angle){
    return angle * 3.14 / 180;
};

PathStringBuilder.prototype.getPathString = function() {
    var opts = {
        cx: 200,
        cy: 200,
        startRadians: this.convertAngle(this._startAngle),
        closeRadians: this.convertAngle(this._endAngle)
    },
        t = 50,
        p = [],
        angleDiff = 0,
        largeArc = 0,
        pathString = [];

    opts.r1 = 100 - t;
    opts.r2 = opts.r1 + t;

    if (opts.r1<0) opts.r1 = 0;
    if (opts.r2<0) opts.r2 = 0;

    p = [
        [opts.cx + opts.r2*Math.sin(opts.startRadians),
            opts.cy - opts.r2*Math.cos(opts.startRadians)],
        [opts.cx + opts.r2*Math.sin(opts.closeRadians),
            opts.cy - opts.r2*Math.cos(opts.closeRadians)],
        [opts.cx + opts.r1*Math.sin(opts.closeRadians),
            opts.cy - opts.r1*Math.cos(opts.closeRadians)],
        [opts.cx + opts.r1*Math.sin(opts.startRadians),
            opts.cy - opts.r1*Math.cos(opts.startRadians)],
    ];

    angleDiff = opts.closeRadians - opts.startRadians;
    largeArc = (angleDiff % (Math.PI*2)) > Math.PI ? 1 : 0;

    pathString.push("M"+p[0].join());
    pathString.push("A"+[opts.r2,opts.r2,0,largeArc,1,p[1]].join());
    pathString.push("L"+p[2].join());
    pathString.push("A"+[opts.r1,opts.r1,0,largeArc,0,p[3]].join());
    pathString.push("z");

    return pathString;
}