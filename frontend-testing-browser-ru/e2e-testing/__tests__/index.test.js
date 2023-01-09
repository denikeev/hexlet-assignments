/* eslint-disable  no-undef */

const port = 5000;
const host = 'localhost';
const appUrl = `http://${host}:${port}`;

// BEGIN
const articlesUrl = `${appUrl}/articles`;

describe('app', () => {
  test('page opens', async () => {
    await page.goto(appUrl);
    await expect(page).toMatch('Welcome to a Simple blog!')
  });

  test('articles opens', async () => {
    await page.goto(appUrl);
    await Promise.all([
      page.click('a[data-testid="nav-articles-index-link"]'),
      page.waitForNavigation(),
    ]);
    await expect(page).toMatch('Create new article');
  });

  test('open and submit form', async () => {
    await page.goto(articlesUrl);
    await Promise.all([
      page.click('a[data-testid="article-create-link"]'),
      page.waitForNavigation(),
    ]);
    await expect(page).toMatch('Create article');
    await expect(page).toFillForm('form', {
      'article[name]': '2023',
      'article[content]': 'will be a good year',
    });
    await expect(page).toSelect('select[name="article[categoryId]"]', '2');

    await Promise.all([
      page.click('input[data-testid="article-create-button"]'),
      page.waitForNavigation(),
    ])
    await expect(page).toMatch('2023');
  });

  test('edit acticle', async () => {
    await page.goto(articlesUrl);
    await Promise.all([
      page.click('a[data-testid="article-edit-link-8"]'),
      page.waitForNavigation(),
    ]);
    await expect(page).toMatch('Edit article');
    await expect(page).toFillForm('form', {
      'article[name]': '2023 year',
      'article[content]': 'will be a very good year',
    });
    await expect(page).toSelect('select[name="article[categoryId]"]', '1');
    await Promise.all([
      page.click('input[data-testid="article-update-button"]'),
      page.waitForNavigation(),
    ])
    await expect(page).toMatch('2023 year');
  });
});
// END
