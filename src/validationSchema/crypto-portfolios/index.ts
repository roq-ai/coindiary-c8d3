import * as yup from 'yup';

export const cryptoPortfolioValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  purchase_price: yup.number().integer().required(),
  purchase_date: yup.date().required(),
  crypto_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
