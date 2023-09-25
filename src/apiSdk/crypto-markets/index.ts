import axios from 'axios';
import queryString from 'query-string';
import { CryptoMarketInterface, CryptoMarketGetQueryInterface } from 'interfaces/crypto-market';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCryptoMarkets = async (
  query?: CryptoMarketGetQueryInterface,
): Promise<PaginatedInterface<CryptoMarketInterface>> => {
  const response = await axios.get('/api/crypto-markets', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCryptoMarket = async (cryptoMarket: CryptoMarketInterface) => {
  const response = await axios.post('/api/crypto-markets', cryptoMarket);
  return response.data;
};

export const updateCryptoMarketById = async (id: string, cryptoMarket: CryptoMarketInterface) => {
  const response = await axios.put(`/api/crypto-markets/${id}`, cryptoMarket);
  return response.data;
};

export const getCryptoMarketById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crypto-markets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCryptoMarketById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-markets/${id}`);
  return response.data;
};
