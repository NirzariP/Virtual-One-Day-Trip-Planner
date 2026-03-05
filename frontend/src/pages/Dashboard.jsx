import React from 'react';
import { Flex, Box, VStack, Heading, Text } from '@chakra-ui/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ControlledCarousel from '../components/ControlledCarousel';
import Layout from '../components/Layout'
import InterestCards from '../components/InterestCards';
import RestaurantList from '../components/RestaurantCards';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const location = useLocation();
  const userid = location.state;
  // console.log(userid)
  return (
    <Layout>
          <Navbar />
          <br></br>
          <ControlledCarousel />
          <InterestCards /> 
          <RestaurantList userid={userid}/>
    </Layout>
  );
};

export default Dashboard;
