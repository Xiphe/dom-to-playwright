let i = 0;
export function markElement(
  element: HTMLElement,
  selectorKey: Symbol,
): () => void {
  const attr = `data-dom-to-playwright-${i}`;
  const selector = `[${attr}]`;
  (element as any)[selectorKey as any] = selector;
  element.setAttribute(attr, '');
  i += 1;
  return () => {
    element.removeAttribute(attr);
  };
}

export function markElements(elements: HTMLElement[], selectorKey: Symbol) {
  const cleanups: Array<() => void> = [];

  elements.forEach((element) => {
    cleanups.push(markElement(element, selectorKey));
  });

  return () => cleanups.forEach((cl) => cl());
}
