import axios from 'axios';
import queryString from 'query-string';
import { CryptoWatchlistInterface, CryptoWatchlistGetQueryInterface } from 'interfaces/crypto-watchlist';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCryptoWatchlists = async (
  query?: CryptoWatchlistGetQueryInterface,
): Promise<PaginatedInterface<CryptoWatchlistInterface>> => {
  const response = await axios.get('/api/crypto-watchlists', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCryptoWatchlist = async (cryptoWatchlist: CryptoWatchlistInterface) => {
  const response = await axios.post('/api/crypto-watchlists', cryptoWatchlist);
  return response.data;
};

export const updateCryptoWatchlistById = async (id: string, cryptoWatchlist: CryptoWatchlistInterface) => {
  const response = await axios.put(`/api/crypto-watchlists/${id}`, cryptoWatchlist);
  return response.data;
};

export const getCryptoWatchlistById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crypto-watchlists/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCryptoWatchlistById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-watchlists/${id}`);
  return response.data;
};
