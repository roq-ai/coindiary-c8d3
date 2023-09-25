import * as yup from 'yup';

export const cryptoWatchlistValidationSchema = yup.object().shape({
  crypto_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
