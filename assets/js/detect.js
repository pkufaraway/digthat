var tunnel = [];
var size;

var connected = function (edgeOne, edgeTwo) {
    if(edgeOne.type == edgeTwo.type){
        if(edgeOne.type == "hedge") {
            return edgeOne.x == edgeTwo.x && Math.abs(edgeOne.y - edgeTwo.y) == 1;
        } else {
            return edgeOne.y == edgeTwo.y && Math.abs(edgeOne.x - edgeTwo.x) == 1;
        }
    } else {
        if(edgeOne.type == "vedge"){
            return connected(edgeTwo, edgeOne);
        } else {
            return (edgeOne.x == edgeTwo.x || edgeOne.x - edgeTwo.x == 1)
                && (edgeOne.y == edgeTwo.y || edgeOne.y - edgeTwo.y == -1)
        }
    }
};

var tryGo = function (startEdge){
    var edgesLeft = tunnel.slice();
    var iterateEdge = startEdge;
    var result = [startEdge];
    while(edgesLeft.length > 0){
        var options = edgesLeft.filter(
            function (edge) {
                return connected(iterateEdge, edge);
            }
        );
        //console.log(iterateEdge.x, iterateEdge.y, iterateEdge.type);
        if(options.length != 1){
            return result;
        } else {
            result.push(options[0]);
            edgesLeft = edgesLeft.filter(
                function(edge){
                    return edge != iterateEdge;
                }
            );
            iterateEdge = options[0];
        }
    }
    return result;
};

module.exports = function (length) {
    size = length;
    return{
        addEdge: function (edge) {
            if(tunnel.length < size) {
                tunnel.push(edge);
                console.log(tunnel.length);
                return true;
            } else {
                console.log(tunnel.length);
                return false;
            }

        },

        removeEdge: function (edgeToRemove) {
            tunnel = tunnel.filter(
                function (edge) {
                    return edge != edgeToRemove;
                }
            );
            console.log(tunnel.length);
        },

        edgeLeft: function () {
            return size - tunnel.length;
        },

        clearTunnel: function () {
            size = 0;
            tunnel = [];
        },

        setLength: function (length) {
            size = length;
        },

        isValid: function (length) {
            var i;
            for(i = 0; i < tunnel.length; i++){
                var result = tryGo(tunnel[i]);
                if(result[0].x < result[result.length - 1]){
                    result.reverse();
                }
                if(result.length == tunnel.length){
                    if(result[0].x == 0) {
                        var lastEdge = result[result.length - 1];
                        if(lastEdge.type == "hedge"){
                            return lastEdge.x == length;
                        } else {
                            var last2ndEdge = result[result.length - 2];
                            return lastEdge.x == length - 1 && last2ndEdge.x != length;
                        }
                    }
                }
            }
            return false;
        }
    }
};