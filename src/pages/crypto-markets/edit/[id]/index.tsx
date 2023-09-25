import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getCryptoMarketById, updateCryptoMarketById } from 'apiSdk/crypto-markets';
import { cryptoMarketValidationSchema } from 'validationSchema/crypto-markets';
import { CryptoMarketInterface } from 'interfaces/crypto-market';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function CryptoMarketEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<CryptoMarketInterface>(
    () => (id ? `/crypto-markets/${id}` : null),
    () => getCryptoMarketById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CryptoMarketInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCryptoMarketById(id, values);
      mutate(updated);
      resetForm();
      router.push('/crypto-markets');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<CryptoMarketInterface>({
    initialValues: data,
    validationSchema: cryptoMarketValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Crypto Markets',
              link: '/crypto-markets',
            },
            {
              label: 'Update Crypto Market',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Crypto Market
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.symbol}
            label={'Symbol'}
            props={{
              name: 'symbol',
              placeholder: 'Symbol',
              value: formik.values?.symbol,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Current Price"
            formControlProps={{
              id: 'current_price',
              isInvalid: !!formik.errors?.current_price,
            }}
            name="current_price"
            error={formik.errors?.current_price}
            value={formik.values?.current_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('current_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Market Cap"
            formControlProps={{
              id: 'market_cap',
              isInvalid: !!formik.errors?.market_cap,
            }}
            name="market_cap"
            error={formik.errors?.market_cap}
            value={formik.values?.market_cap}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('market_cap', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Volume"
            formControlProps={{
              id: 'volume',
              isInvalid: !!formik.errors?.volume,
            }}
            name="volume"
            error={formik.errors?.volume}
            value={formik.values?.volume}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('volume', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/crypto-markets')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'crypto_market',
    operation: AccessOperationEnum.UPDATE,
  }),
)(CryptoMarketEditPage);
