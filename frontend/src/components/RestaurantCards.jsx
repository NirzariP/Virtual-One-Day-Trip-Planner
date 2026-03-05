import React, { useEffect, useState } from 'react';
import { Box, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';

const RestaurantCard = ({ name, rating, type, budget, address }) => (
  <Card bg="gray.800" color="white" maxWidth="sm">
    <CardHeader>
      <Text fontSize="lg" fontWeight="bold" align={'center'}>
        {name}
      </Text>
    </CardHeader>
    <CardBody mt={-10}>
      <Box display={"flex"} justifyContent={"space-between"}>
      <Text fontSize="lg">Budget: ₹{budget}/-</Text>
      <Text fontSize="lg" display={'flex'}><AiFillStar color="gold" fontSize="lg"/>{rating}</Text>
      </Box>
      <Text fontSize="lg">
        Address: {address}
      </Text>
    </CardBody>
    <CardFooter mt={-10}>
      <Box p={"1px 3%"} borderRadius={10} border={"2px #b14df4 solid"}>{type}</Box>
    </CardFooter>
  </Card>
);

const RestaurantCards = ({ data }) => {
  if (!data) {
    // If data is null or undefined, return null or a loading indicator
    return null; // or <Spinner /> or any loading indicator component
  }

  return (
    <Box>
        <SimpleGrid columns={[2, null, 2]} columnGap={10} rowGap={10}>
      {Object.values(data["Name"])?.map((_, index) => (
        <RestaurantCard
          key={index}
          name={Object.values(data["Name"])[index]}
          rating={Object.values(data["Rating"])[index]}
          type={Object.values(data["Type"])[index]}
          address={Object.values(data["Address"])[index]}
          budget={Object.values(data["Budget"])[index]}
        />
      ))}
      </SimpleGrid>
    </Box>
  );
};



const RestaurantList = ({userid}) => {
  const [output, setOutput] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/recommend2?id=${userid}`);
        setOutput(response.data[1]);
        localStorage.setItem("userId", userid)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(output)
  return (
    <Box>
      <Heading as="h1" size="xl" marginBottom={4} color={'white'}>
        Recommended Restaurants
      </Heading>
      <RestaurantCards data={output} />
    </Box>
  );
};
export default RestaurantList;
