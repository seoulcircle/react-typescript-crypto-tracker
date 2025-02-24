const BASE_URL = `https://api.coingecko.com/api/v3`;
const NICO_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

export function fetchCoins() {
  return fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`
  ).then((response) => response.json());
}

export function fetchInfoData(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchPriceData(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}/tickers`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  return fetch(`${NICO_URL}/?coinId=${coinId}`).then((response) =>
    response.json()
  );
}
