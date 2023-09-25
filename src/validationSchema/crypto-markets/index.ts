import * as yup from 'yup';

export const cryptoMarketValidationSchema = yup.object().shape({
  name: yup.string().required(),
  symbol: yup.string().required(),
  current_price: yup.number().integer().required(),
  market_cap: yup.number().integer().required(),
  volume: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});
