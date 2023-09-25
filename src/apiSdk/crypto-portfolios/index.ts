import axios from 'axios';
import queryString from 'query-string';
import { CryptoPortfolioInterface, CryptoPortfolioGetQueryInterface } from 'interfaces/crypto-portfolio';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCryptoPortfolios = async (
  query?: CryptoPortfolioGetQueryInterface,
): Promise<PaginatedInterface<CryptoPortfolioInterface>> => {
  const response = await axios.get('/api/crypto-portfolios', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCryptoPortfolio = async (cryptoPortfolio: CryptoPortfolioInterface) => {
  const response = await axios.post('/api/crypto-portfolios', cryptoPortfolio);
  return response.data;
};

export const updateCryptoPortfolioById = async (id: string, cryptoPortfolio: CryptoPortfolioInterface) => {
  const response = await axios.put(`/api/crypto-portfolios/${id}`, cryptoPortfolio);
  return response.data;
};

export const getCryptoPortfolioById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crypto-portfolios/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCryptoPortfolioById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-portfolios/${id}`);
  return response.data;
};
