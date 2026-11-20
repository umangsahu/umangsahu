const demo = document.querySelector('.api-demo');
const statusText = demo.querySelector('.demo-status');
const output = demo.querySelector('.request');
let latestAction = 0;
let categoryId = 1;

function showResult(method, endpoint, data, message) {
  output.querySelector('.route strong').textContent = method;
  output.querySelector('.route code').textContent = endpoint;
  output.querySelector('pre code').textContent = JSON.stringify(data, null, 2);
  output.hidden = false;
  statusText.textContent = message;
}

demo.querySelector('[data-product]').addEventListener('click', async () => {
  const action = ++latestAction;
  output.hidden = true;
  statusText.textContent = 'Fetching sample product…';
  try {
    const response = await fetch('./sample-product.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Sample unavailable');
    const product = await response.json();
    if (action === latestAction) {
      showResult('GET', '/product/1', product, 'Fetched sample product #1.');
    }
  } catch {
    if (action === latestAction) statusText.textContent = 'Couldn’t load the sample. Select Fetch product to retry.';
  }
});

demo.querySelector('[data-category]').addEventListener('click', () => {
  ++latestAction;
  const category = { id: ++categoryId, categoryName: 'Electronics' };
  showResult('POST', '/category', category, 'Created sample category #' + category.id + ' in this preview.');
});

demo.querySelector('.demo-actions').hidden = false;
