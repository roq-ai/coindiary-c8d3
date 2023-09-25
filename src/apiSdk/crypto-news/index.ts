import axios from 'axios';
import queryString from 'query-string';
import { CryptoNewsInterface, CryptoNewsGetQueryInterface } from 'interfaces/crypto-news';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCryptoNews = async (
  query?: CryptoNewsGetQueryInterface,
): Promise<PaginatedInterface<CryptoNewsInterface>> => {
  const response = await axios.get('/api/crypto-news', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCryptoNews = async (cryptoNews: CryptoNewsInterface) => {
  const response = await axios.post('/api/crypto-news', cryptoNews);
  return response.data;
};

export const updateCryptoNewsById = async (id: string, cryptoNews: CryptoNewsInterface) => {
  const response = await axios.put(`/api/crypto-news/${id}`, cryptoNews);
  return response.data;
};

export const getCryptoNewsById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crypto-news/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCryptoNewsById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-news/${id}`);
  return response.data;
};
