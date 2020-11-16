import Graph from '../Graph'
import Edge from './Edge'
import Node from './Node'
import TreeFactory from './Point/TreeFactory'
import * as Invariants from './Invariants'

export class Factory {
  #NO_NODES = Object.freeze([])
  #NO_EDGES = Object.freeze([])

  #validateGraphPreInvariants (nodes, edges) {
    return new Invariants.Pre.All().validate(nodes, edges)
  }

  #validateGraphPostInvariants (graph) {
    return new Invariants.Post.All().validate(graph)
  }

  #validateAttributes (nodes, edges) {
    if (!Array.isArray(nodes) || !(nodes.every(node => node instanceof Node))) {
      throw new Error('Node list should be an array of Graph.Node entities.')
    }

    if (!Array.isArray(edges) || !(edges.every(edge => edge instanceof Edge))) {
      throw new Error('Edge list should be an array of Graph.Edge entities.')
    }

    if (!nodes.length || !edges.length) {
      throw new Error('You should provide edges or nodes for correct graph entity.')
    }

    if ([...nodes.reduce((nodes, node) => nodes.add(node.uuid), new Set())].length < nodes.length) {
      throw new Error('You have nodes with duplicated uuids. You should provide nodes without duplicates.')
    }

    if ([...edges.reduce((edges, edge) => edges.add(JSON.stringify(edge)), new Set())].length < edges.length) {
      throw new Error('You have duplicated edges (by identical nodes in left and right sides). You should provide edges without duplicates.')
    }
  }

  create (nodes = this.#NO_NODES, edges = this.#NO_EDGES) {
    this.#validateAttributes(nodes, edges)
    this.#validateGraphPreInvariants(nodes, edges)

    const pointTree = this.buildPointTree(nodes, edges)
    const graph = this.createGraph(pointTree, nodes, edges)

    this.#validateGraphPostInvariants(graph)

    return graph
  }

  buildPointTree (nodes, edges) {
    return new TreeFactory().create(nodes, edges)
  }

  createGraph (rootPoint, nodes, edges) {
    return new Graph(rootPoint, nodes, edges)
  }
}
