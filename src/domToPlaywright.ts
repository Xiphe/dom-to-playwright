import { Page } from 'playwright';
import { update } from './update';
import { select } from './select';
import { createSelectorKey } from './createSelectorKey';

export default async function domToPlayWright(
  page: Page,
  node?: Document | HTMLElement,
) {
  let selectorKey = createSelectorKey();

  if (node) {
    await update(page, node, selectorKey);
  }

  return {
    select(element: HTMLElement): string {
      return select(element, selectorKey);
    },
    async update(node: Document | HTMLElement) {
      selectorKey = createSelectorKey();
      await update(page, node, selectorKey);
    },
  };
}
