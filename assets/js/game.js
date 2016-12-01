var MapFile = require('./map');
var TunnelFile = require('./tunnel');
var Vue = require('./lib/vue.js');

var Map = MapFile(4);
var Tunnel = TunnelFile(20);

var game = new Vue({
    el: '#gameArea',
    data: {
        size : 4,
        maxSize: 10,
        sizes : [4,5,6,7,8,9,10],
        nodes: Map.nodes,
        hedges: Map.hedges,
        vedges: Map.vedges,
        gameStatus: "mode selection",
        guessRound: 1,
        gameRound: 1,
        mode : "PvP",
        difficulty : "Normal",
        scoreOne: 0,
        scoreTwo: 0
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
            if(this.gameStatus == "tunnel building" || this.gameStatus == "tunnel guess") {
                Map.selectEdge(edge);
                if (this.gameStatus == "tunnel building") {
                    Tunnel.selectEdge(edge);
                } else if (this.gameStatus == "tunnel guess") {
                    Tunnel.finalSelectEdge(edge);
                }
            } else if (this.gameStatus == "node/edge detection") {
                Map.prepare(edge);
                Tunnel.prepareEdge(edge);
            }
        },

        finishGuess: function () {
            if (this.gameRound == 1) {
                this.gameRound++;
                this.guessRound = 1;
                this.scoreOne = Tunnel.finalGuess();
                if (this.scoreOne == -1){
                    this.scoreOne = 10000;
                }
                alert("PlayerTwo as detector:" + this. scoreOne + "Player two, please build your tunnel now.");
                Map.totalClearBoard();
                Tunnel.resetTunnel();
                this.gameStatus = "tunnel building";
            } else {
                this.scoreTwo = Tunnel.finalGuess();
                if (this.scoreTwo == -1){
                    this.scoreTwo = 10000;
                }
                alert("PlayerTwo as detector:" + this.scoreOne + "PlayerOne as detector:" + this.scoreTwo);
                this.endGame();
            }
        },

        nodeClick: function (node) {
            if(this.gameStatus == "node/edge detection" && this.gameRound < 4) {
                Map.prepare(node);
                Tunnel.prepareNode(node);
            }
        },

        endGame: function () {
            console.log("123");
            this.gameRound = 1;
            this.guessRound = 1;
            this.gameStatus = "mode selection";
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
                this.gameStatus = "tunnel guess";
                alert("choose your final guess!");
                return;
            }
        },

        gotoDetect: function(){
            if(Tunnel.isValid(this.size)) {
                Map.clearBoard();
                this.gameStatus = "node/edge detection";
                alert("It's guess round now");
            } else {
                alert("Your tunnel is invalid. It must start on the top edge, end on the bottom edge, and be a single simple path.");
            }
        },

        showScoreButton: function () {
            return this.scoreOne > 0 && this.scoreTwo > 0 && this.gameStatus == "mode selection";
        },

        showEdgeInfo: function () {
            return this.gameStatus == "tunnel building";
        },

        showGuessInfo: function () {
            return this.gameStatus == "node/edge detection";
        },

        showModeSelect: function () {
            return this.gameStatus == "mode selection";
        },

        showFinishGuessInfo: function () {
            return this.gameStatus == "tunnel guess";
        },

        isValid: function () {
            return Tunnel.isValid(this.size);
        },

        edgeLeft: function () {
            return Tunnel.edgeLeft();
        },

        startGame: function () {
            this.gameStatus = "tunnel building";
            console.log(this.gameStatus);
            this.scoreTwo = 0;
            this.scoreOne = 0;
            this.clearBoard();
            Tunnel = TunnelFile(this.size);
            console.log(Tunnel.getSize());
        }
    }
});