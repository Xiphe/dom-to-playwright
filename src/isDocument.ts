export function isDocument(node: Document | HTMLElement): node is Document {
  return !!(node as Document).documentElement;
}
