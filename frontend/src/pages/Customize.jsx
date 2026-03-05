import React from 'react'
import Layout from '../components/Layout'
import CustomizeCard from '../components/CustomizeCard'
import { SimpleGrid } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

const Customize = () => {
  return (
    <Layout>
        <Navbar />
        <SimpleGrid mt='3%' columns={2} columnGap={3} rowGap={5}>
        {[...Array(3)].map((_, index) => (
          <CustomizeCard key={index} />
        ))}
      </SimpleGrid>
    </Layout>
  )
}

export default Customize