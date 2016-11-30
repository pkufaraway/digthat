var MapFile = require('./map');
var TunnelFile = require('./tunnel');
var Vue = require('./lib/vue.js');

var gameStatus = "modeSelect";
var Map = MapFile(4);
var Tunnel = TunnelFile(20);
var scoreOne = -1;
var scoreTwo = -1;

var vm = new Vue({
    el: '#gamearea',
    data: {
        size : 4,
        maxSize: 10,
        sizes : [4,5,6,7,8,9,10],
        nodes: Map.nodes,
        hedges: Map.hedges,
        vedges: Map.vedges,
        gameStatus: "modeSelect",
        guessRound: 1,
        gameRound: 1,
        mode : "PvP",
        difficulty : "Normal",
        message: 'Hello Vue!'
    },

    watch :{
        size: function (newSize) {
            Map = MapFile(newSize);
            this.nodes = Map.nodes;
            this.hedges = Map.hedges;
            this.vedges = Map.vedges;
            this.size = parseInt(newSize);
        }
    },

    methods: {
        clearBoard: function () {
            Tunnel.resetTunnel(Tunnel.getSize());
            Map.clearBoard();
        },

        edgeClick: function (edge) {
            if(this.gameStatus == "chooseEdges" || this.gameStatus == "finalGuess") {
                Map.selectEdge(edge);
                if (this.gameStatus == "chooseEdges") {
                    Tunnel.selectEdge(edge);
                } else if (this.gameStatus == "finalGuess") {
                    Tunnel.finalSelectEdge(edge);
                }
            } else if (this.gameStatus == "prepareGuess") {
                Map.prepare(edge);
                Tunnel.prepareEdge(edge);
            }
        },

        finishGuess: function () {
            if (this.gameRound == 1) {
                this.gameRound++;
                this.guessRound = 1;
                scoreOne = Tunnel.finalGuess();
                alert(scoreOne);
                Map.totalClearBoard();
                Tunnel.resetTunnel();
                this.gameStatus = "chooseEdges";
            } else {
                scoreTwo = Tunnel.finalGuess();
                alert("PlayerTwo as detector:" + scoreOne + "PlayerOne as detector:" + scoreTwo);
                vm.endGame();
            }
        },

        nodeClick: function (node) {
            if(this.gameStatus == "prepareGuess" && this.gameRound < 4) {
                Map.prepare(node);
                Tunnel.prepareNode(node);
            }
        },

        endGame: function () {
            console.log("123");
            this.gameRound = 1;
            this.guessRound = 1;
            this.gameStatus = "modeSelect";
            console.log("Finish");
            Map.totalClearBoard();
        },

        finishPrepare: function () {
            Map.clearBoard();
            this.guessRound ++;
            //console.log(guessRound);

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

            if (this.guessRound > 3) {
                this.gameStatus = "finalGuess";
                alert("choose your final guess!");
                return;
            }
        },

        gotoDetect: function(){
            if(Tunnel.isValid(this.size)) {
                Map.clearBoard();
                this.gameStatus = "prepareGuess";
                alert("It's guess round now");
            } else {
                alert("Your tunnel is invalid. It must start on the top edge, end on the bottom edge, and be a single simple path.");
            }
        },

        showScoreButton: function () {
            return scoreOne > 0 && scoreTwo > 0 && this.gameStatus == "modeSelect";
        },

        showEdgeInfo: function () {
            return this.gameStatus == "chooseEdges";
        },

        showGuessInfo: function () {
            return this.gameStatus == "prepareGuess";
        },

        showModeSelect: function () {
            return this.gameStatus == "modeSelect";
        },

        showFinishGuessInfo: function () {
            return this.gameStatus == "finalGuess";
        },

        isValid: function () {
            return Tunnel.isValid(this.size);
        },

        edgeLeft: function () {
            return Tunnel.edgeLeft();
        },

        startGame: function () {
            vm.gameStatus = "chooseEdges";
            console.log(vm.gameStatus);
            scoreTwo = -1;
            scoreOne = -1;
            vm.clearBoard();
            Tunnel = TunnelFile(this.size);
            console.log(Tunnel.getSize());
        }
    }
});