import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  // data is loading
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href={'/login'}>
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href={'/register'}>
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Text mr={2}>{data?.me.username}</Text>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          variant='link'
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg='#3fc1c9' p={4} ml={'auto'}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
