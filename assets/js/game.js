var MapFile = require('./map');
var TunnelFile = require('./tunnel');
var Vue = require('./lib/vue.js');

var gameStatus = "modeSelect";
var length = 4;
var Map = MapFile(length);
var Tunnel = TunnelFile(20);
new Vue.component('grid',{
    template: '#grid_template',
    props: ['length'],
    data: {
        length: length,
        nodes: Map.nodes,
        hedges: Map.hedges,
        vedges: Map.vedges,
        gameStatus: gameStatus,
        message: 'Hello Vue!'
    },
    methods: {
        edgeClick: function (edge) {
            if(gameStatus == "chooseEdges") {
                Map.selectEdge(edge);
                Tunnel.selectEdge(edge);
            } else if (gameStatus == "prepareGuess") {
                Map.prepare(edge);
                Tunnel.prepareEdge(edge);
            }
        },

        nodeClick: function (node) {
            if(gameStatus == "prepareGuess") {
                Map.prepare(node);
                Tunnel.prepareNode(node);
            }
        },

        clearBoard: function () {
            Tunnel.resetTunnel(20);
            Map.clearBoard();
        },

        finishPrepare: function () {
            var result = Tunnel.guessResult();
            var goodNodes = result.goodNodes;
            var goodEdges = result.goodEdges;
            var badNodes = result.badNodes;
            var badEdges = result.badEdges;
            for(var i = 0; i < goodEdges.length; i++){
                Map.reveal(goodEdges[i],"good");
            }
            for(var i = 0; i < goodNodes.length; i++){
                Map.reveal(goodNodes[i],"good");
            }
            for(var i = 0; i < badEdges.length; i++){
                Map.reveal(badEdges[i],"bad");
            }
            for(var i = 0; i < badNodes.length; i++){
                Map.reveal(badNodes[i],"bad");
            }
        },

        gotoDetect: function(){
            if(Tunnel.isValid(length)) {
                Map.clearBoard();
                gameStatus = "prepareGuess";
                alert("It's guess round now");
            } else {
                alert("Your tunnel is invalid. It must start on the top edge, end on the bottom edge, and be a single simple path.");
            }
        },

        showEdgeInfo: function () {
            return gameStatus == "chooseEdges";
        },

        showGuessInfo: function () {
            return gameStatus == "prepareGuess";
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