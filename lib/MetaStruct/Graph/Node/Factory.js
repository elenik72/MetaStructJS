import Node from '../Node'
import { v4 as uuidv4 } from 'uuid'

export class Factory {
  static NO_LABELS = Object.freeze([])
  static NO_PROPERTIES = Object.freeze({})
  static AUTO_GENERATED_UUID = null

  #prepareUuid(uuid) {
    return uuid == null ? String(uuidv4()) : String(uuid)
  }

  #prepareLabels(labels) {
    return labels.map(label => String(label))
  }

  #validateAttributes(uuid, labels, properties) {
    if (!Array.isArray(labels)) {
      throw new Error('Node labels collection should be a type of Array of strings.')
    }

    if (labels.every(label => typeof label !== 'string')) {
      throw new Error('Each nodes label should be a type of string.')
    }

    if (Array.isArray(properties) && typeof properties === 'object' || typeof properties !== 'object') {
      throw new Error('Node properties collection should be a type of Hash.')
    }
  }

  create (
    uuid = this.AUTO_GENERATED_UUID,
    labels = this.NO_LABELS,
    properties = this.NO_PROPERTIES
  ) {
      this.#validateAttributes(uuid, labels, properties)

      const pUuid = this.#prepareUuid(uuid)
      const pLabels = this.#prepareLabels(labels)
  
      return this.createNode(pUuid, pLabels, properties)
  }

  createNode (uuid, labels, properties) {
    return new Node(uuid, labels, properties)
  }
}
