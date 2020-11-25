import { HasNoNonconnectedNodes } from './HasNoNonconnectedNodes'
import { HasOnlyOneRoot } from './HasOnlyOneRoot'
import { HasAtLeastOneExit } from './HasAtLeastOneExit'

/**
 * @private
 *
 * @class Pre.Invariant.All
 */
export class All {
  /**
   * @private
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {Void}
   */
  * _generateSequenceValidations (nodes, edges) {
    yield () => new HasNoNonconnectedNodes().validate(nodes, edges)
    yield () => new HasOnlyOneRoot().validate(nodes, edges)
    yield () => new HasAtLeastOneExit().validate(nodes, edges)
  }

  /**
   * @private
   *
   * @param {Array.<Graph.Node>} nodes - Array of node instances
   * @param {Array.<Graph.Edge>} edges - Array of edge instances
   * @returns {Void}
   */
  validate (nodes, edges) {
    for (const generator of this._generateSequenceValidations(nodes, edges)) {
      generator()
    }
  }
}
