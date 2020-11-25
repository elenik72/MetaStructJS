import Graph from '../lib/MetaStruct'
import { v4 as uuidv4 } from 'uuid'

describe('Graph.Node', () => {
  describe('creation failures', () => {
    describe('fails on invalid labels', () => {
      test('Node labels collection should be a type of Array of strings.', () => {
        expect(() => Graph.Node.create(0, 'test')).toThrow(Error)
        expect(() => Graph.Node.create(0, 1)).toThrow(Error)
        expect(() => Graph.Node.create(0, {})).toThrow(Error)
      })
      test('Each nodes label should be a type of string.', () => {
        expect(() => Graph.Node.create(0, [1])).toThrow(Error)
        expect(() => Graph.Node.create(0, [{ test: 'test' }])).toThrow(Error)
        expect(() => Graph.Node.create(0, [[]])).toThrow(Error)
      })
    })

    describe('fails on invalid properties', () => {
      test('Node properties collection should be a type of Hash.', () => {
        expect(() => Graph.Node.create(0, ['test'], [])).toThrow(Error)
        expect(() => Graph.Node.create(0, ['test'], '')).toThrow(Error)
        expect(() => Graph.Node.create(0, ['test'], 1)).toThrow(Error)
      })
    })

    describe('uuid auto/manual population (during creation)', () => {
      test('generates uuid if uuid is not provided', () => {
        const node = Graph.Node.create(null, ['test'], {})

        expect(node.uuid).not.toEqual(null)
      })
      test('you can provide manual uuids', () => {
        const uuid = uuidv4()
        const node = Graph.Node.create(uuid, ['test'], {})

        expect(node.uuid).toEqual(uuid)
      })
    })

    describe('common instance creation and state access', () => {
      test('commonly created node (default state)', () => {
        const node = Graph.Node.create(null, [''], {})

        expect(node.uuid).not.toEqual(null)
        expect(node.labels).toEqual([''])
        expect(node.properties).toEqual({})
      })

      test('commonly created node (with custom attributes)', () => {
        const node = Graph.Node.create(
          'my_own_uuid',
          ['reaction', 'translation'],
          { activity: 'send_message', text: 'test_text' }
        )

        expect(node.uuid).toEqual('my_own_uuid')
        expect(node.labels).toContain('reaction', 'translation')
        expect(node.properties).toMatchObject({ activity: 'send_message', text: 'test_text' })
      })
    })
  })
})
