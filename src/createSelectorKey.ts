let i = 0;
export function createSelectorKey() {
  return Symbol(`DOM_TO_PLAYWRIGHT_SELECTOR_${i++}`);
}
