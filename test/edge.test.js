import Graph from '../lib/MetaStruct'
import { v4 as uuidv4 } from 'uuid'

describe('Graph.Edge', () => {
  const leftNode = Graph.Node.create(uuidv4(), ['test'])
  const rightNode = Graph.Node.create(uuidv4(), ['test'])
  const testClass = new Error()

  describe('creation failures', () => {
    describe('all nodes should be provided', () => {
      test('Right edge node is missing: you should provide both left and right nodes.', () => {
        expect(() => Graph.Edge.create(leftNode)).toThrow(Error)
        expect(() => Graph.Edge.create(leftNode, null)).toThrow(Error)
      })

      test('Left edge node is missing: you should provide both left and right nodes.', () => {
        expect(() => Graph.Edge.create(null, rightNode)).toThrow(Error)
        expect(() => Graph.Edge.create('', rightNode)).toThrow(Error)
      })

      test('You should provide both left and right nodes.', () => {
        expect(() => Graph.Edge.create(null, null)).toThrow(Error)
      })
    })

    describe('Node is not a type of graph node', () => {
      test('Right edge Node should be a type of Graph.Node.', () => {
        expect(() => Graph.Edge.create(testClass, testClass)).toThrow(Error)
      })

      test('Right edge Node should be a type of Graph.Node.', () => {
        expect(() => Graph.Edge.create(leftNode, testClass)).toThrow(Error)
      })

      test('Left edge Node should be a type of Graph.Node.', () => {
        expect(() => Graph.Edge.create(testClass, rightNode)).toThrow(Error)
      })
    })

    describe('fails on invalid labels', () => {
      test('Edge labels collection should be a type of Array of strings.', () => {
        expect(() => Graph.Edge.create(leftNode, rightNode, {})).toThrow(Error)
      })

      test('Edge labels collection should be a type of Array of strings.', () => {
        expect(() => Graph.Edge.create(leftNode, rightNode, [{}])).toThrow(Error)
      })
    })

    describe('fails on invalid properties', () => {
      test('invalid properties', () => {
        expect(() => Graph.Edge.create(leftNode, rightNode, ['test'], [])).toThrow(Error)
        expect(() => Graph.Edge.create(leftNode, rightNode, ['test'], '')).toThrow(Error)
      })

      test('default values', () => {
        expect(() => Graph.Edge.create(leftNode, rightNode, ['test'])).not.toThrow(Error)
      })
    })

    describe('fails while weight is not an integer', () => {
      test('invalid weight', () => {
        expect(() => Graph.Edge.create(leftNode, rightNode, ['test'], {}, [])).toThrow(Error)
        expect(() => Graph.Edge.create(leftNode, rightNode, ['test'], {}, '500')).toThrow(Error)

        expect(() => Graph.Edge.create(leftNode, rightNode, ['test'], {}, 0)).not.toThrow(Error)
        expect(() => Graph.Edge.create(leftNode, rightNode, ['test'], {}, -1)).not.toThrow(Error)
        expect(() => Graph.Edge.create(leftNode, rightNode, ['test'], {}, 1)).not.toThrow(Error)
      })
    })

    describe('common instance creation and state access', () => {
      const edge = Graph.Edge.create(leftNode, rightNode, ['test'])

      test('commonly created edge (default state)', () => {
        expect(edge.weight).toBe(0)
        expect(edge.labels).toEqual(['test'])
        expect(edge.properties).toEqual({})

        expect(edge.leftNode).toEqual(leftNode)
        expect(edge.rightNode).toEqual(rightNode)
      })

      test('commonly created edge (with custom attributes)', () => {
        const edgeA = Graph.Edge.create(
          leftNode,
          rightNode,
          ['testAA', 'testAB'],
          { a: 'testA', b: 'testB' },
          -1
        )
        const edgeB = Graph.Edge.create(
          leftNode,
          rightNode,
          ['testBA', 'testBB'],
          { c: 'testC', d: 'testD' },
          1
        )

        expect(edgeA.weight).toBe(-1)
        expect(edgeA.labels).toContain('testAA', 'testAB')
        expect(edgeA.properties).toMatchObject({ a: 'testA', b: 'testB' })

        expect(edgeA.leftNode).toEqual(leftNode)
        expect(edgeA.rightNode).toEqual(rightNode)

        expect(edgeB.weight).toBe(1)
        expect(edgeB.labels).toContain('testBA', 'testBB')
        expect(edgeB.properties).toMatchObject({ c: 'testC', d: 'testD' })

        expect(edgeB.leftNode).toEqual(leftNode)
        expect(edgeB.rightNode).toEqual(rightNode)
      })
    })
  })
})
