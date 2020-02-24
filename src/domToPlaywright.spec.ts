import { chromium, Browser, Page } from 'playwright';
import domToPlaywright from './domToPlaywright';

describe('domToPlaywright', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  it('renders a given dom object to playwright page', async () => {
    const headline = document.createElement('h1');
    headline.innerHTML = 'Hello World';

    await domToPlaywright(page, headline);

    expect(await page.$eval('h1', (node: any) => node.innerText)).toBe(
      'Hello World',
    );
  });

  it('does not pollute source dom', async () => {
    const headline = document.createElement('h1');
    headline.innerHTML = 'Hello World';

    await domToPlaywright(page, headline);

    expect(headline.outerHTML).toMatchInlineSnapshot(`"<h1>Hello World</h1>"`);
  });

  it('supports querying of sub-elements', async () => {
    const wrap = document.createElement('div');
    const d1 = document.createElement('div');
    d1.innerHTML = '1';
    wrap.appendChild(d1);
    const d2 = document.createElement('div');
    d2.innerHTML = '2';
    wrap.appendChild(d2);

    const { select } = await domToPlaywright(page, wrap);

    expect(await page.$eval(select(d2), (node: any) => node.innerText)).toBe(
      '2',
    );
  });

  it('supports updating the page', async () => {
    const d1 = document.createElement('span');
    const d2 = document.createElement('div');

    const { select, update } = await domToPlaywright(page, d1);
    await update(d2);

    expect(select(d2)).toEqual(expect.any(String));

    expect(() => select(d1)).toThrowErrorMatchingInlineSnapshot(
      `"Unknown Element <span />, you probably need to update the page."`,
    );
  });

  it('supports rendering a whole document', async () => {
    const { select } = await domToPlaywright(page, document);

    expect(
      await page.$eval(
        select(document.body),
        (node: any) => node.constructor.name,
      ),
    ).toBe('HTMLBodyElement');
  });

  it('fails when a unknown element is selected', async () => {
    const d1 = document.createElement('span');
    const d2 = document.createElement('div');

    const { select } = await domToPlaywright(page, d1);

    expect(() => select(d2)).toThrowErrorMatchingInlineSnapshot(
      `"Unknown Element <div />, you probably need to update the page."`,
    );
  });

  it('fails when a non-element is passed to select', async () => {
    const { select } = await domToPlaywright(
      page,
      document.createElement('span'),
    );

    expect(() => select({} as any)).toThrowErrorMatchingInlineSnapshot(
      `"[object Object] is not a valid element"`,
    );
  });
});
