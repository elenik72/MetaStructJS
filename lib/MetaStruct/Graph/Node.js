import * as Node from './Node/Factory'

/**
 * Node creation class
 * @public
 * @class Node
 *
 * @example
 *
 * Graph.Node.create('id_1', ['label_1'], {}),
 */
export default class {
  /**
   * @public
   *
   * @param {String} uuid - Unique identificator
   * @param {Array.<String>} labels - Labels of node
   * @param {Object} properties - Properties of node
   *
   * @returns {Graph.Node} - Edge instance
   */
  static create (
    uuid = Node.Factory.AUTO_GENERATED_UUID,
    labels = Node.Factory.NO_LABELS,
    properties = Node.Factory.NO_PROPERTIES
  ) {
    return new Node.Factory().create(uuid, labels, properties)
  }

  /**
   * @hideconstructor
   *
   * @param {String} uuid - Unique identificator
   * @param {Array.<String>} labels - Labels of node
   * @param {Object} properties - Properties of node
   */
  constructor (uuid, labels, properties) {
    /**
   * @property {String} uuid - Unique identificator
   * @property {Array.<String>} labels - Labels of node
   * @property {Object} properties - Properties of node
   */
    this.uuid = uuid
    this.labels = labels
    this.properties = properties
  }
}
