import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, Text, Box, Flex, Checkbox, HStack, Divider } from '@chakra-ui/react'
import { FaRegHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const CustomizeCard = () => {

  return (
    <Card bgColor={'#1F1F1F'} w={'500px'}>
  <CardHeader>
    <Flex justify={'space-between'}>
      <Heading size='lg' color={'white'}>Restaurants</Heading>
    </Flex>
  </CardHeader>

  <CardBody mt='-5%'>
    <Stack spacing='1'>
    {[...Array(5)].map((_, index) => (
        <>
      <Flex justify={'space-between'}>
            <Box color={'white'}>
              <Heading size={'md'}>Veg Treat Royale</Heading>
              <Stack spacing={1}>
              <Text mb={'0.2px'}>Veg Treat Royale</Text>
              <Text>Veg Treat Royale</Text>
              </Stack>
            </Box>
            <Stack spacing={5}>
          <HStack spacing={2} alignItems={'flex-start'}>
            <FaStar color='yellow'/>
            <Text color={'white'}>4.2/5</Text>
          </HStack>
      <FaRegHeart color='red' size={'24px'}/>
          </Stack>
      </Flex>
      <Divider m='-2% 0 1%'/>
      </>
      ))}
    </Stack>
  </CardBody>
</Card>
  )
}

export default CustomizeCard