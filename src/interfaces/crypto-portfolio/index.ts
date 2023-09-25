import { CryptoMarketInterface } from 'interfaces/crypto-market';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CryptoPortfolioInterface {
  id?: string;
  crypto_id: string;
  amount: number;
  purchase_price: number;
  purchase_date: any;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  crypto_market?: CryptoMarketInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CryptoPortfolioGetQueryInterface extends GetQueryInterface {
  id?: string;
  crypto_id?: string;
  user_id?: string;
}
