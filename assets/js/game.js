var MappFile = require('./edge');
var TunnelFile = require('./tunnel');
var Vue = require('./lib/vue.js');

var gameStatus = "modeSelect";
var length = 4;
var Edge = EdgeFile(length);
var Tunnel = TunnelFile(20);
new Vue({
    el: '#gamearea',
    data: {
        length: length,
        corners: Edge.corners,
        hedges: Edge.hedges,
        vedges: Edge.vedges,
        gameStatus: gameStatus,
        message: 'Hello Vue!',
    },
    methods: {
        edgeClick: function (edges, x, y) {
            if(gameStatus == "chooseEdges") {
                if (Edge.selected(edges, x, y)) {
                    Edge.unSelect(edges, x, y);
                    Tunnel.removeEdge(edges[x][y]);
                } else if(Tunnel.edgeLeft() > 0) {
                    Edge.select(edges, x, y);
                    Tunnel.addEdge(edges[x][y]);
                }
            }
        },

        gotoDetect: function(){
            if(Tunnel.isValid(length)) {
                Edge.clearBoard();
                gameStatus = "modeSelect";
            } else {
                alert("Your tunnel is invalid. It must start on the top edge, end on the bottom edge, and be a single simple path.");
            }
        },

        showEdgeInfo: function () {
            return gameStatus == "chooseEdges";
        },

        isValid: function () {
            return Tunnel.isValid(length);
        },

        edgeLeft: function () {
            return Tunnel.edgeLeft();
        },

        startGame: function () {
            gameStatus = "chooseEdges";
        }
    }
});