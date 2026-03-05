import React from 'react'
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react'
import UserInterestForm from '../components/UserInterestForm'
import { useNavigate } from 'react-router-dom'

const UserInterest = () => {

  const navigate = useNavigate();
  
  const handleClick = () =>{
    navigate('/userInterest2')
  }
  return (
    <SimpleGrid columns={3} spacingX={'10px'} bgColor={'black'} bgSize={'cover'} height={'100vh'} width={'100vw'}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <Text color={'white'} fontSize={'4xl'} letterSpacing="0.2em">SELECT</Text>
            <Text color={'white'} fontSize={'4xl'} letterSpacing="0.2em">YOUR</Text>
            <Text color={'white'} fontSize={'4xl'} letterSpacing="0.2em">FAVOURITES</Text>
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <UserInterestForm />
        </Box>
        <Box display={'flex'} justifyContent="flex-end" alignItems="flex-end" marginBottom={'6%'} marginRight={'26%'}>
          <Button 
            bgColor={'black'} 
            color={'white'} 
            border={'2px'} 
            borderColor={'white'} 
            display={'flex'}
            _hover={{ bgColor: 'white', color: 'black' }} 
            onClick={handleClick}
          >
              NEXT
          </Button>
        </Box>
    </SimpleGrid>
  )
}

export default UserInterest