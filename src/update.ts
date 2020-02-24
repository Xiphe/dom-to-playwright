import { Page } from 'playwright';
import { isDocument } from './isDocument';
import { markElements } from './markElements';

export async function update(
  page: Page,
  node: Document | HTMLElement,
  selectorKey: Symbol,
) {
  const element: HTMLElement = isDocument(node) ? node.documentElement : node;
  const cleanup = markElements(
    [element, ...Array.prototype.slice.call(element.querySelectorAll('*'))],
    selectorKey,
  );

  await page.setContent(element.outerHTML);
  cleanup();
}
