import React from 'react';
import { Form, Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Wrapper } from '../components/wrapper';
import { InputField } from '../components/InputField';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '', email: '', phone: '' }}
        onSubmit={(values) => {
          console.log(values);
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

export default Register;
