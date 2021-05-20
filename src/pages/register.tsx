import React from 'react';
import { Form, Formik } from 'formik';
import {
  Box,
  Button
} from '@chakra-ui/react';
import { InputField } from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [,register] = useRegisterMutation(); // URQL hook
  // the register function is called to send the form data
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '', email: '', phone: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if(response.data?.register.errors) {
            setErrors(
              toErrorMap(response.data.register.errors)
            )
          } else if(response.data?.register.user) {
            // worked
            router.push('/'); // go to homepage
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='Enter username'
              label='Username'
            />

            <InputField
              name='email'
              placeholder='Enter E-mail'
              label='E-mail'
              type='email'
            />

            <InputField
              name='phone'
              placeholder='Enter Phone'
              label='Phone'
              type='phone'
            />

            <InputField
              name='password'
              placeholder='Enter Password'
              label='Password'
              type='password'
            />

            <Box mt={4}>
              <Button type='submit' isLoading={isSubmitting} colorScheme='teal'>
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
