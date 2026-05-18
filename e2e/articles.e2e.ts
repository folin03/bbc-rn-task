describe('Articles App', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should render articles list', async () => {
    await expect(element(by.id('articles-list'))).toBeVisible();
  });

  it('should allow selecting domains', async () => {
    await element(by.id('domain-chip-apple.com')).tap();

    await element(by.id('domain-chip-bbc.com')).tap();

    await expect(element(by.id('articles-list'))).toBeVisible();
  });

  it('should allow sorting by popularity', async () => {
    await element(by.id('sort-by-button-popular')).tap();

    await expect(element(by.id('articles-list'))).toBeVisible();
  });

  it('should load more articles on scroll', async () => {
    await waitFor(element(by.id('articles-list')))
      .toBeVisible()
      .withTimeout(10000);

    await element(by.id('articles-list')).scroll(500, 'down');

    await expect(element(by.id('articles-list'))).toBeVisible();
  });

  it('should support pull to refresh', async () => {
    await element(by.id('articles-list')).swipe('down', 'fast');

    await expect(element(by.id('articles-list'))).toBeVisible();
  });
});
