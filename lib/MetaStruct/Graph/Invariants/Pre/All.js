import { HasNoNonconnectedNodes } from './HasNoNonconnectedNodes'
import { HasOnlyOneRoot } from './HasOnlyOneRoot'
import { HasAtLeastOneExit } from './HasAtLeastOneExit'

export class All {
  * generateSequenceValidations (nodes, edges) {
    yield () => new HasNoNonconnectedNodes().validate(nodes, edges)
    yield () => new HasOnlyOneRoot().validate(nodes, edges)
    yield () => new HasAtLeastOneExit().validate(nodes, edges)
  }

  validate (nodes, edges) {
    for (const generator of this.generateSequenceValidations(nodes, edges)) {
      generator()
    }
  }
}
