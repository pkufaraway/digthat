var hedges = [[]];
var vedges = [[]];
var nodes = [[]];


var initMap = function (length) {
    hedges = new Array(length+1);
    vedges = new Array(length);
    nodes = new Array(length + 1);
    for (var i = 0; i < length + 1; i++) {
        nodes[i] = new Array(length + 1);
        for (var j = 0; j < length + 1; j++) {
            nodes[i][j] = {
                corner: true,
                probe: true,
                probeAnim: true,
                x: i,
                y: j
            };
        }
    }

    for (var i = 0; i < length + 1; i++) {
        hedges[i] = new Array(length);
        for (var j = 0; j < length; j++) {
            hedges[i][j] = {
                hedge: true,
                edge: true,
                animate: false,
                final: false,
                detectedEdge: false,
                reveal: false,
                type: "hedge",
                x: i,
                y: j
            };
        }
    }

    for (var i = 0; i < length; i++) {
        vedges[i] = new Array(length);
        for (var j = 0; j < length + 1; j++) {
            vedges[i][j] = {
                vedge: true,
                edge: true,
                animate: false,
                final: false,
                detectedEdge: false,
                reveal: false,
                type: "vedge",
                x: i,
                y: j
            };
        }
    }
};

module.exports = function(length){
    initMap(length);
    return {
        hedges: hedges,
        vedges: vedges,
        nodes: nodes,

        selected: function (edges, x, y) {
          return edges[x][y].animate;
        },

        select: function (edges, x, y) {
            edges[x][y].animate = true;
        },

        unSelect: function (edges, x, y) {
            edges[x][y].animate = false;
        },

        clearBoard: function () {
            var i, j;
            for (i = 0; i < hedges.length; i++) {
                var line = hedges[i];
                for (j = 0; j < line.length; j++) {
                    line[j].animate = false;
                }
            }

            for (i = 0; i < vedges.length; i++) {
                line = vedges[i];
                for (j = 0; j < line.length; j++) {
                    line[j].animate = false;
                }
            }
        }
    }
};