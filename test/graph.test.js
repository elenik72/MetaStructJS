import Graph from '../lib/MetaStruct'

describe('Graph', () => {
  const node1 = Graph.Node.create(1, ['test'])
  const node2 = Graph.Node.create(2, ['test'])
  const node3 = Graph.Node.create(3, ['test'])
  const node4 = Graph.Node.create(4, ['test'])
  const node5 = Graph.Node.create(5, ['test'])

  const edge1 = Graph.Edge.create(node1, node2, ['test'])
  const edge2 = Graph.Edge.create(node2, node3, ['test'])
  const edge3 = Graph.Edge.create(node4, node2, ['test'])

  describe('creation', () => {
    describe('attribute incompatability', () => {
      const edges = [edge1, edge2, edge3]
      const nodes = [node1, node2, node3, node4]

      describe('fails on invalid node and edge lists', () => {
        describe('invalid lists', () => {
          test('Node list should be an array of Graph.Node entities.', () => {
            expect(() => Graph.create([], edges)).toThrow(Error)
            expect(() => Graph.create({}, edges)).toThrow(Error)
            expect(() => Graph.create([{}], edges)).toThrow(Error)
          })

          test('Edge list should be an array of Graph.Edge entities.', () => {
            expect(() => Graph.create(nodes, [])).toThrow(Error)
            expect(() => Graph.create(nodes, {})).toThrow(Error)
          })

          test('You should provide edges or nodes for correct graph entity.', () => {
            expect(() => Graph.create()).toThrow(Error)
            expect(() => Graph.create(nodes, [{}])).toThrow(Error)
          })
        })
      })

      describe('fails on node dupilicates and edge duplicates', () => {
        const edgeWithDublicate = Graph.Edge.create(node1, node1, ['test'])

        test('You have nodes with duplicated uuids. You should provide nodes without duplicates.', () => {
          expect(() => Graph.create(
            [node1, node1],
            [edgeWithDublicate])
          ).toThrow(Error)
        })

        test('You have duplicated edges (by identical nodes in left and right sides). You should provide edges without duplicates.', () => {
          expect(() => Graph.create(
            [node1, node2],
            [edgeWithDublicate])
          ).toThrow(Error)
        })
      })

      describe('invariant', () => {
        test('all nodes should have edges', () => {
          const nonConnectedNodes = [node3]

          const errorMessage = 'Some nodes has no edges (all nodes should have edges).'
          const errorData = `Non-connected node UUIDs: ${nonConnectedNodes.map(node => node.uuid).join(', ')}.`

          expect(() => Graph.create(
            [node1, node2, node3],
            [edge1])
          ).toThrow(new Error(errorMessage.concat(errorData)))
        })

        test('has only one root', () => {
          const rootNodes = [node1, node4]

          const errorMessage = 'Your graph has more than one root (you can have only one root in graph entity).'
          const errorData = `Root node UUIDs: ${rootNodes.map(node => node.uuid).join(', ')}.`

          expect(() => Graph.create(
            [node1, node2, node3, node4],
            [edge1, edge2, edge3])
          ).toThrow(new Error(errorMessage.concat(errorData)))
        })

        test('has no roots at all', () => {
          const edgeOne = Graph.Edge.create(node1, node2, ['test'])
          const edgeTwo = Graph.Edge.create(node2, node3, ['test'])
          const edgeThree = Graph.Edge.create(node3, node1, ['test'])

          expect(() => Graph.create(
            [node1, node2, node3, node4],
            [edgeOne, edgeTwo, edgeThree])
          ).toThrow(Error)
        })

        test('has at least one exit', () => {
          const edgeOne = Graph.Edge.create(node1, node2, ['test'])
          const edgeTwo = Graph.Edge.create(node2, node3, ['test'])
          const edgeThree = Graph.Edge.create(node2, node4, ['test'])

          expect(() => Graph.create(
            [node1, node2, node3, node4],
            [edgeOne, edgeTwo, edgeThree])
          ).not.toThrow(Error)

          expect(() => Graph.create(
            [node1, node2, node3],
            [edgeOne, edgeTwo])
          ).not.toThrow(Error)
        })

        test('has no cycles', () => {
          const edgeOne = Graph.Edge.create(node1, node2, ['test'])
          const edgeTwo = Graph.Edge.create(node2, node3, ['test'])
          const edgeThree = Graph.Edge.create(node2, node4, ['test'])
          const edgeFour = Graph.Edge.create(node4, node5, ['test'])
          const edgeFive = Graph.Edge.create(node3, node5, ['test'])
          const edgeSix = Graph.Edge.create(node5, node2, ['test'])

          expect(() => Graph.create(
            [node1, node2, node3, node4, node5],
            [edgeOne, edgeTwo, edgeThree, edgeFour, edgeFive, edgeSix])
          ).toThrow(Error)

          expect(() => Graph.create(
            [node1, node2, node3, node4, node5],
            [edgeOne, edgeTwo, edgeThree, edgeFour, edgeFive])
          ).not.toThrow(Error)
        })
      })
    })
  })
})
