var Graph = require('directed-graph');
 
// Either initialize and fill an empty graph
var G = new Graph();
G.addVertex('A');
G.addVertex('B');
G.addVertex('C');
G.addEdge('A', 'B');
G.addEdge('A', 'C');
G.addEdge('B', 'C');

 
// Or predefine a new graph
// var graphB = new Graph({
//   'A': ['B', 'C'],
//   'B': ['A', 'C'],
//   'C': ['A', 'B'],
// });
 
// Both G and graphB function the same
G.setWeight('A', 'B', 15);
G.setWeight('A', 'C', 25);
G.setWeight('B', 'C', 10);
G.addVertex('D');

// console.log(G.pathExists('B', 'D'));

console.log(G.graph);