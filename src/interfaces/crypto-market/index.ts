import { CryptoPortfolioInterface } from 'interfaces/crypto-portfolio';
import { CryptoWatchlistInterface } from 'interfaces/crypto-watchlist';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CryptoMarketInterface {
  id?: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  volume: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  crypto_portfolio?: CryptoPortfolioInterface[];
  crypto_watchlist?: CryptoWatchlistInterface[];
  user?: UserInterface;
  _count?: {
    crypto_portfolio?: number;
    crypto_watchlist?: number;
  };
}

export interface CryptoMarketGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  symbol?: string;
  user_id?: string;
}
