import { HasNoCycles } from './HasNoCycles'

export class All {
  * generateSequenceValidations (graph) {
    yield () => new HasNoCycles().validate(graph)
  }

  validate (graph) {
    for (const generator of this.generateSequenceValidations(graph)) {
      generator()
    }
  }
}
