var MapFile = require('./map');
var TunnelFile = require('./tunnel');
var Vue = require('./lib/vue.js');

var gameStatus = "modeSelect";
var Map = MapFile(4);
var Tunnel = TunnelFile(20);
var gameRound = 1;
var guessRound = 1;

var vm = new Vue({
    el: '#gamearea',
    data: {
        size : 4,
        length : 4,
        nodes: Map.nodes,
        hedges: Map.hedges,
        vedges: Map.vedges,
        maxSize: 10,
        gameStatus: gameStatus,
        message: 'Hello Vue!'
    },

    watch :{
        size: function (newSize) {
            Map = MapFile(newSize);
            vm.nodes = Map.nodes;
            vm.hedges = Map.hedges;
            vm.vedges = Map.vedges;
            vm.length = parseInt(newSize);
        }
    },

    methods: {
        clearBoard: function () {
            Tunnel.resetTunnel(Tunnel.getSize());
            Map.clearBoard();
        },

        edgeClick: function (edge) {
            if(gameStatus == "chooseEdges" || gameStatus == "finalGuess") {
                Map.selectEdge(edge);
                if (gameStatus == "chooseEdges") {
                    Tunnel.selectEdge(edge);
                } else if (gameStatus == "finalGuess") {
                    Tunnel.finalSelectEdge(edge);
                }
            } else if (gameStatus == "prepareGuess") {
                Map.prepare(edge);
                Tunnel.prepareEdge(edge);
            }
        },

        finishGuess: function () {
            if (gameRound == 1) {
                gameRound++;
                guessRound = 1;
                score = Tunnel.finalGuess();
                alert(score);
                Map.totalClearBoard();
                Tunnel.resetTunnel();
                gameStatus = "chooseEdges";
            } else {
                score = Tunnel.finalGuess();
                alert(score);
                vm.endGame();
            }
        },

        nodeClick: function (node) {
            if(gameStatus == "prepareGuess" && gameRound < 4) {
                Map.prepare(node);
                Tunnel.prepareNode(node);
            }
        },

        endGame: function () {
            console.log("123");
            gameRound = 1;
            guessRound = 1;
            gameStatus = "modeSelect";
            console.log("Finish");
            Map.totalClearBoard();
        },

        finishPrepare: function () {
            Map.clearBoard();
            guessRound ++;
            //console.log(guessRound);
            if (guessRound > 3) {
                gameStatus = "finalGuess";
                alert("choose your final guess!");
                return;
            }

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

        gotoDetect: function(length){
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

        showSizer: function () {
            return gameStatus == "modeSelect";
        },

        showFinishGuessInfo: function () {
            return gameStatus == "finalGuess";
        },

        isValid: function (length) {
            return Tunnel.isValid(length);
        },

        edgeLeft: function () {
            return Tunnel.edgeLeft();
        },

        startGame: function () {
            gameStatus = "chooseEdges";
            vm.clearBoard();
            Tunnel = TunnelFile(vm.length);
            console.log(Tunnel.getSize());
        }
    }
});