import * as yup from 'yup';

export const cryptoNewsValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  published_at: yup.date().required(),
  source: yup.string().required(),
  author: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
