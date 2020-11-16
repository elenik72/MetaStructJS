import Graph from '../../lib/MetaStruct'

describe('Graph.FindPoint', () => {
  const node1 = Graph.Node.create(1, ['test'])
  const node2 = Graph.Node.create(2, ['test'])
  const node3 = Graph.Node.create(3, ['test'])
  const node4 = Graph.Node.create(4, ['test'])
  const node5 = Graph.Node.create(5, ['test'])

  const edge1 = Graph.Edge.create(node1, node2, ['test'])
  const edge2 = Graph.Edge.create(node2, node3, ['test'])
  const edge3 = Graph.Edge.create(node2, node4, ['test'])
  const edge4 = Graph.Edge.create(node4, node5, ['test'])
  const edge5 = Graph.Edge.create(node3, node5, ['test'])

  const graph = Graph.create(
    [node1, node2, node3, node4, node5],
    [edge1, edge2, edge3, edge4, edge5]
  )
  describe('algorithm find point', () => {
    test('returns appropriated point', () => {
      expect(graph.find(1).node).toEqual(node1)
      expect(graph.find(2).node).toEqual(node2)
      expect(graph.find('3').node).toEqual(node3)
      expect(graph.find('4').node).toEqual(node4)
      expect(graph.find('5').node).toEqual(node5)
    })
  })
})
