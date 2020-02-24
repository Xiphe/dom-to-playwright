export function elementToString(element: HTMLElement) {
  return `${element.outerHTML.split('>')[0]} />`;
}
