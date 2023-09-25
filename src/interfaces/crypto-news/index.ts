import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CryptoNewsInterface {
  id?: string;
  title: string;
  content: string;
  published_at: any;
  source: string;
  author: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CryptoNewsGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
  source?: string;
  author?: string;
  user_id?: string;
}
