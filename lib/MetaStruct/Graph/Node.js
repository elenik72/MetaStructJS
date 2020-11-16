import * as Node from './Node/Factory'

export default class {
  static create (
    uuid = Node.Factory.AUTO_GENERATED_UUID,
    labels = Node.Factory.NO_LABELS,
    properties = Node.Factory.NO_PROPERTIES
  ) {
    return new Node.Factory().create(uuid, labels, properties)
  }

  constructor (uuid, labels, properties) {
    this.uuid = uuid
    this.labels = labels
    this.properties = properties
  }
}
