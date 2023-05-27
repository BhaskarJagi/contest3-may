const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
const coinListElement = document.getElementById('coin-list');
const sortMarketCapElement = document.getElementById('sort-marketcap');
const sortChangeElement = document.getElementById('sort-change');

function sortCoins(coins, sortBy, sortOrder) {
  return coins.sort((a, b) => {
    if (sortBy === 'marketcap') {
      const aValue = a.market_cap;
      const bValue = b.market_cap;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (sortBy === 'change') {
      const aValue = a.price_change_percentage_24h;
      const bValue = b.price_change_percentage_24h;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });
}

function displayCoins(coins) {
  coinListElement.innerHTML = '';

  coins.forEach(coin => {
    const coinCard = document.createElement('div');
    coinCard.className = 'coin-card';

    const coinName = document.createElement('h3');
    coinName.className = 'coin-name';
    coinName.textContent = coin.name;

    const coinPrice = document.createElement('p');
    coinPrice.className = 'coin-price';
    coinPrice.textContent = `Price: $${coin.current_price}`;

    const coinChange = document.createElement('p');
    coinChange.className = 'coin-change';
    coinChange.textContent = `24h Change: ${coin.price_change_percentage}%`;

    coinCard.appendChild(coinName);
    coinCard.appendChild(coinPrice);
    coinCard.appendChild(coinChange);

    coinListElement.appendChild(coinCard);
  });
}

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    let coins = data;

    sortMarketCapElement.addEventListener('change', () => {
      const sortBy = 'marketcap';
      const sortOrder = sortMarketCapElement.value;
      coins = sortCoins(coins, sortBy, sortOrder);
      displayCoins(coins);
    });

    sortChangeElement.addEventListener('change', () => {
      const sortBy = 'change';
      const sortOrder = sortChangeElement.value;
      coins = sortCoins(coins, sortBy, sortOrder);
      displayCoins(coins);
    });

    displayCoins(coins);
  })
  .catch(error => console.log(error));
