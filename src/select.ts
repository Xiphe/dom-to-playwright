import { elementToString } from './elementToString';

export function select(element: HTMLElement, selectorKey: Symbol): string {
  if (!element || !element.outerHTML) {
    throw new Error(`${element} is not a valid element`);
  }
  const selector: string = (element as any)[selectorKey as any];

  if (!selector) {
    throw new Error(
      `Unknown Element ${elementToString(
        element,
      )}, you probably need to update the page.`,
    );
  }

  return selector;
}
