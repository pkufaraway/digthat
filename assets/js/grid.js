var MapFile = require('./map');
var TunnelFile = require('./tunnel');
var Vue = require('./lib/vue.js');

new Vue.component('grid',{
    template: '#grid_template',
    props: ['length','Map','Tunnel','gameStatus'],
    data: function (){
        return {
            length: length,
            nodes: Map.nodes,
            hedges: Map.hedges,
            vedges: Map.vedges,
            gameStatus: gameStatus,
        }
    },
    methods: {
        edgeClick: function (edge, Map, Tunnel, gameStatus) {
            if(gameStatus == "chooseEdges") {
                Map.selectEdge(edge);
                Tunnel.selectEdge(edge);
            } else if (gameStatus == "prepareGuess") {
                Map.prepare(edge);
                Tunnel.prepareEdge(edge);
            }
        },

        nodeClick: function (node, Map, Tunnel, gameStatus) {
            if(gameStatus == "prepareGuess") {
                Map.prepare(node);
                Tunnel.prepareNode(node);
            }
        },

        clearBoard: function (Map, Tunnel) {
            Tunnel.resetTunnel(20);
            Map.clearBoard();
        },

        finishPrepare: function (Map, Tunnel) {
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

        gotoDetect: function(Map, Tunnel, gameStatus){
            if(Tunnel.isValid(length)) {
                Map.clearBoard();
                gameStatus = "prepareGuess";
                alert("It's guess round now");
            } else {
                alert("Your tunnel is invalid. It must start on the top edge, end on the bottom edge, and be a single simple path.");
            }
        },

        showEdgeInfo: function (gameStatus) {
            return gameStatus == "chooseEdges";
        },

        showGuessInfo: function (gameStatus) {
            return gameStatus == "prepareGuess";
        },

        isValid: function (Tunnel) {
            return Tunnel.isValid(length);
        },

        edgeLeft: function (Tunnel) {
            return Tunnel.edgeLeft();
        },

        startGame: function () {
            gameStatus = "chooseEdges";
        }
    }
});/**
 * Created by yaoyuanliu on 11/29/16.
 */
