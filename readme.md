# dom-to-playwright

[![Release](https://github.com/Xiphe/dom-to-playwright/actions/workflows/release.yml/badge.svg)](https://github.com/Xiphe/dom-to-playwright/actions/workflows/release.yml)
[![codecov](https://codecov.io/gh/Xiphe/dom-to-playwright/branch/main/graph/badge.svg?token=9U2N1I98OW)](https://codecov.io/gh/Xiphe/dom-to-playwright)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)


Copy a snapshot of a document or element into a playwright page instance.
Select the counterpart of a sub-element within the playwright page.

I've build this in order to test real css effects of components from within a
normal [jest](https://jestjs.io/) + [testing-library](https://testing-library.com/) setup.

## Installation

```bash
npm install playwright dom-to-playwright
```

## Usage

```js
import { JSDOM } from 'jsdom';
import { chromium } from 'playwright';
import domToPlaywright from 'dom-to-playwright';

const browser = await chromium.launch();

const { document } = new JSDOM(`<!DOCTYPE html>`).window;
const context = await browser.newContext();
const page = await context.newPage();

const headline = document.createElement('h1');
headline.innerHTML = 'Hello World';
document.body.appendChild(headline);

const { select, update } = await domToPlaywright(page, document);
// logs: Hello World
console.log(await page.$eval(select(headline), (node) => node.innerText));

headline.innerHTML = 'Hello new World';
await update(document);

// logs: Hello new World
console.log(await page.$eval(select(headline), (node) => node.innerText));

await browser.close();
```

## License

> The MIT License
>
> Copyright (C) 2022 Hannes Diercks
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
> of the Software, and to permit persons to whom the Software is furnished to do
> so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
> FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
> IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
