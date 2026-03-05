import React from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Box, Divider, Flex, VStack } from '@chakra-ui/react'

const Favorites = () => {
    const text = "FAVOURITES"
    const letters = text.split('');
  return (
    <Flex>
        <Box
            position="fixed"
            top={0}
            left={0}
            bottom={0}
            width="80px"
            bg="#1F1F1F"
        >
            <Sidebar />
        </Box>
        <Box bgColor={'black'} h={'90vh'} ml={'80px'}>
            <VStack>
                <Flex bgColor={'#1F1F1F'}>
                <Flex direction="column">
      {letters.map((letter, index) => (
        <Box key={index} color="white" fontSize="xl">
          {letter}
        </Box>
      ))}
    </Flex>
                </Flex>
            </VStack>
            <Divider orientation='vertical' />
        </Box>
    </Flex>
  )
}

export default Favorites