import Node from '../Node'
import { v4 as uuidv4 } from 'uuid'

/**
 * @private
 *
 * @class Node Factory
 */
export class Factory {
  /**
   * @static
   * @type {Array}
   */
  static NO_LABELS = Object.freeze([])

  /**
   * @static
   * @type {Object}
   */
  static NO_PROPERTIES = Object.freeze({})

  /**
   * @static
   * @type {?Number|?String}
   */
  static AUTO_GENERATED_UUID = null

  /**
   * Converting uuid to string
   * @private
   *
   * @param {String|Number} uuid - label format string or number
   * @returns {String} uuid in string type
   */
  _prepareUuid (uuid) {
    return uuid === null ? String(uuidv4()) : String(uuid)
  }

  _prepareLabels (labels) {
    return labels.map(label => String(label))
  }

  _validateAttributes (uuid, labels, properties) {
    if (!Array.isArray(labels)) {
      throw new Error('Node labels collection should be a type of Array of strings.')
    }

    if (labels.every(label => typeof label !== 'string')) {
      throw new Error('Each nodes label should be a type of string.')
    }

    if ((Array.isArray(properties) && typeof properties === 'object') || typeof properties !== 'object') {
      throw new Error('Node properties collection should be a type of Hash.')
    }
  }

  create (
    uuid = this.AUTO_GENERATED_UUID,
    labels = this.NO_LABELS,
    properties = this.NO_PROPERTIES
  ) {
    this._validateAttributes(uuid, labels, properties)

    const pUuid = this._prepareUuid(uuid)
    const pLabels = this._prepareLabels(labels)

    return this.createNode(pUuid, pLabels, properties)
  }

  createNode (uuid, labels, properties) {
    return new Node(uuid, labels, properties)
  }
}
