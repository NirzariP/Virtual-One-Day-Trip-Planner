// components/Navbar.js
import React from 'react';
import { Box, Flex, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box
        bg="black"
        h="60px"
        position="fixed"
        top="0"
        left="80px"
        right="300px"
        zIndex="10"
        p='1% 3%'
        align='center'
      >
      <Flex justify="space-between" align="center">
        <Box>
          {/* Search bar */}
          <Input
            type="text"
            bg="#424242"
            color="white"
            border="1px solid white"
            placeholder="Search"
            _placeholder={{ color: 'white' }}
          />
        </Box>
        <Box>
          {/* Login button */}
          <Button bg="#424242" color="white" _hover={{ bg: '#333' }} onClick={() => navigate('/')}>
            Logout
          </Button>
        </Box>
      </Flex>
      </Box> 
  );
};

export default Navbar;
