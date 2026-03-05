import React from 'react'
import { Box, Button, Grid, SimpleGrid, Text } from '@chakra-ui/react'
import UserInterestForm2 from '../components/UserInterestForm2'

const UserInterest2 = () => {
  return (
    <Grid columns={3} display={'flex'} columnGap={'8%'} bgColor={'black'} bgSize={'cover'} height={'100vh'} width={'100vw'} overflowY="auto">
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} marginLeft={'7.5%'}>
            <Text color={'white'} fontSize={'4xl'} letterSpacing="0.2em">SELECT</Text>
            <Text color={'white'} fontSize={'4xl'} letterSpacing="0.2em">YOUR</Text>
            <Text color={'white'} fontSize={'4xl'} letterSpacing="0.2em">FAVOURITES</Text>
        </Box>
        <Box display={'flex'} colSpan={2} flexDirection={'row'} justifyContent={'center'} alignItems={'flex-start'} alignSelf={'flex-start'}>
            <UserInterestForm2 />
        </Box>
    </Grid>
  )
}

export default UserInterest2