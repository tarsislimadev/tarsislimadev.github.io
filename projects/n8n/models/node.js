export class Node {
  get type() { return 'node' }
  get typeVersion() { return '1.0' }
  get icon() { return this.type }
  name = ''
  parameters = {}
}
