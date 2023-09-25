const mapping: Record<string, string> = {
  'crypto-markets': 'crypto_market',
  'crypto-news': 'crypto_news',
  'crypto-portfolios': 'crypto_portfolio',
  'crypto-watchlists': 'crypto_watchlist',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
