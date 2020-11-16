import * as Graph from './Graph/Factory'
import * as Algorithms from './Graph/Algorithms'

export default class {
  static create (nodes, edges) {
    return new Graph.Factory().create(nodes, edges)
  }

  constructor (root, nodes, edges) {
    this.root = root
    this.nodes = nodes
    this.edges = edges
  }

  find (nodeUuid) {
    return new Algorithms.FindPoint().call(this, nodeUuid)
  }

  get toJson () {
    return JSON.stringify({ nodes: this.nodes, edges: this.edges })
  }
}
