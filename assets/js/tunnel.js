var tunnel = [];
var nodePrepare = [];
var edgePrepare = [];
var size;

var connectedNode = function (node, edge) {
  if(edge.type == "hedge"){
      return edge.x ==  node.x && (edge.y == node.y || edge.y + 1 == node.y);
  } else {
      return edge.y == node.y && (edge.x == node.x || edge.x + 1 == node.x);
  }
};

var connectedEdge = function (edgeOne, edgeTwo) {
    if(edgeOne.type == edgeTwo.type){
        if(edgeOne.type == "hedge") {
            return edgeOne.x == edgeTwo.x && Math.abs(edgeOne.y - edgeTwo.y) == 1;
        } else {
            return edgeOne.y == edgeTwo.y && Math.abs(edgeOne.x - edgeTwo.x) == 1;
        }
    } else {
        if(edgeOne.type == "vedge"){
            return connectedEdge(edgeTwo, edgeOne);
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
                return connectedEdge(iterateEdge, edge);
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
        //Adding tunneling APIs
        selectEdge: function (edge) {
            if(tunnel.indexOf(edge) < 0) {
                if (tunnel.length < size) {
                    tunnel.push(edge);
                    return true;
                } else {
                    return false;
                }
            } else {
                tunnel = tunnel.filter(
                    function (myEdge) {
                        return myEdge != edge;
                    }
                );
            }
        },

        edgeLeft: function () {
            return size - tunnel.length;
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
        },

        //Guess Part APIs
        prepareEdge: function (edge) {
            if(edgePrepare.indexOf(edge) <= 0) {
                if (tunnel.indexOf(edge) != -1) {
                    edgePrepare.push(edge);
                }
            } else {
                edgePrepare = edgePrepare.filter(function (myEdge) {
                    return myEdge != edge;
                })
            }
        },

        prepareNode: function (node) {
            if(nodePrepare.indexOf(node) <= 0) {
                var edgesConnected = tunnel.filter(function (edge) {
                    return connectedNode(node, edge);
                });
                if (edgesConnected.length > 0) {
                    nodePrepare.push(node);
                }
            } else {
                nodePrepare = nodePrepare.filter(function (myNode) {
                    return myNode != node;
                })
            }
        },

        guessResult: function () {
            var goodEdges = edgePrepare.filter(
                function (prepareEdge) {
                    return tunnel.indexOf(prepareEdge) >= 0;
                }
            );
            var badEdges = edgePrepare.filter(
                function (edge) {
                    return goodEdges.indexOf(edge) < 0;
                }
            );
            var goodNodes = nodePrepare.filter(
                function (node) {
                    var searchResult = tunnel.filter(
                        function (edge) {
                            return connectedNode(node, edge);
                        }
                    );
                    return searchResult > 0;
                }
            );
            var badNodes = nodePrepare.filter(
                function (node) {
                    return goodNodes.indexOf(node) < 0;
                }
            );
            return {
                goodEdges: goodEdges,
                badEdges: badEdges,
                goodNodes: goodNodes,
                badNodes: badNodes
            };
        },

        resetTunnel: function (length) {
            nodePrepare = [];
            edgePrepare = [];
            size = length;
            tunnel = [];
        }
        

    }
};