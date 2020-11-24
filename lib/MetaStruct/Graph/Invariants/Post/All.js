import { HasNoCycles } from './HasNoCycles'

/**
 * @private
 *
 * @class All
 */
export class All {
  /**
   * Wraps a node with an abstraction
   * @private
   *
   * @param {Graph} graph - Graph instance
   * @returns {Void}
   */
  * _generateSequenceValidations (graph) {
    yield () => new HasNoCycles().validate(graph)
  }

  /**
   * Wraps a node with an abstraction
   * @public
   *
   * @param {Graph} graph - Graph instance
   * @returns {Void}
   */
  validate (graph) {
    for (const generator of this._generateSequenceValidations(graph)) {
      generator()
    }
  }
}
