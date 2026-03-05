import React, { useState } from 'react'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import PlanCard from '../components/PlanCard'
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, Text, Box, Flex, Checkbox, HStack, Divider } from '@chakra-ui/react'
import { MdOutlineEdit } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import CustomizeCard from '../components/CustomizeCard'

const EditPlan = () => {
    const [customOption, setCustomOption] = useState(false);

  return (
    <Layout>
        <Navbar />
        <Box height={'92vh'}>
            <HStack spacing={3}>
                <Box>
        <Card bgColor={'#1F1F1F'} w={'500px'}>
  <CardHeader>
    <Flex justify={'space-between'}>
      <Checkbox colorScheme='white'/>
      <Heading size='md' color={'white'}>Plan </Heading>
      <FaRegHeart color='red' size={'24px'}/>
    </Flex>
  </CardHeader>

  <CardBody>
    <Stack spacing='4'>
    {[...Array(3)].map((_, index) => (
      <Flex justify={'space-between'}>
          <HStack spacing={5}>
            <Text color={'white'}>{index + 1}</Text>
            <Divider orientation='vertical' />
            <Box color={'white'}>
              <Heading size={'md'}>Veg Treat Royale</Heading>
              <Stack spacing={1}>
              <Text mb={'0.2px'}>Veg Treat Royale</Text>
              <Text>Veg Treat Royale</Text>
              </Stack>
            </Box>
          </HStack>
          <HStack spacing={2} alignItems={'flex-start'}>
            <FaStar color='yellow'/>
            <Text color={'white'}>4.2/5</Text>
          </HStack>
          <MdOutlineEdit size={24} color='white' onClick={() => setCustomOption(true)}/>
      </Flex>
      ))}
    </Stack>
  </CardBody>
</Card>
        <HStack spacing={2} mt='2%'>
            <Box bgColor={'#1f1f1f'} p='2% 5% 0%' w={'245px'} borderRadius={5}>
                <Text color={'white'} align={'center'}>BUDGET: Rs.5000</Text>
            </Box>
            <Box bgColor={'#1f1f1f'} p='2% 5% 0%' w={'245px'} borderRadius={5}>
                <Text color={'white'} align={'center'}>TIME: 2 Hours</Text>
            </Box>
        </HStack>
        <Text color={'white'}>*On editing the plan the budget or time constraints are might change</Text>
        </Box>
        {customOption && <CustomizeCard/>}
        </HStack>
        </Box>
        
    </Layout>
  )
}

export default EditPlan