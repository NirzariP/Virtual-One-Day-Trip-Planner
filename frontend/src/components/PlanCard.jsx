import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, Text, Box, Flex, Checkbox, HStack, Divider } from '@chakra-ui/react'
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlanCard = ({ planNo, data }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    const resIndex = parseInt(localStorage.getItem("res"));
    const i = resIndex + 1;
    const typeRes = (data[`row_df${i}`]).Name;
    const userId = localStorage.getItem("userId");
    console.log(userId)
    console.log(typeRes)
    try {
      const response = await axios.put(`http://127.0.0.1:8000/update_user/${userId}?liked_plan=${typeRes}`)
      console.log(response)
    } catch(err) {
      console.log(err)
    }
  };
  console.log(data)
  // const xyz = plan.row_df1;
  return (
    <Card bgColor={'#1F1F1F'} w={'500px'}>
  <CardHeader>
    <Flex justify={'space-between'}>
      {/* <Checkbox colorScheme='white'/> */}
      <Heading size='md' color={'white'} onClick={() =>navigate('/editplan')}>{planNo} </Heading>
      {isFavorite ? (
            <FaHeart color='red' size={'24px'} onClick={toggleFavorite} />
          ) : (
            <FaRegHeart color='red' size={'24px'} onClick={toggleFavorite} />
      )}
    </Flex>
  </CardHeader>
  <CardBody>
    <Stack spacing='4'>
    {Object.keys(data).map((key, index) => (
      <Flex justify={'space-between'}>
          <HStack spacing={5}>
            <Text color={'white'}>{index + 1}</Text>
            <Divider orientation='vertical' />
            <Box color={'white'}>
              <Heading size={'md'}>{data[key].Name}</Heading>
              <Stack spacing={1}>
              <Text mb={'0.2px'}>{data[key].Address}</Text>
              {/* <Text>{data[key].Station}</Text> */}
              </Stack>
            </Box>
          </HStack>
          <HStack spacing={2} alignItems={'flex-start'}>
            <FaStar color='yellow'/>
            <Text color={'white'}>{data[key].Rating}/5</Text>
          </HStack>
      </Flex>
      ))}
    </Stack>
  </CardBody>
</Card>
  )
}

export default PlanCard