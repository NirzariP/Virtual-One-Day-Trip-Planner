import { Box, Button, HStack, Image, Tooltip, VStack } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { ImageContext } from '../context/selected';
import nature from '../assets/nature.png';
import restaurants from '../assets/Restaurants.png';
import malls from '../assets/malls.png';
import temples from '../assets/temples.png';
import clubs from '../assets/clubs.png';
import theatre from '../assets/theatre.png';
import resort from '../assets/resort.png';
import sports from '../assets/sports.png';
import tourist from '../assets/tourist.png';
import buffet from "../assets/buffet.jpg"
import chinese from "../assets/chinese.jpg"
import restaurant from "../assets/restaurant.jpg"
import seafood from "../assets/seafood.jpg"
import fastfood from "../assets/fastfood.jpg"
import familyfriendly from "../assets/family-friendly.jpg"
import northindian from "../assets/northiindian.jpg"
import sandwich from "../assets/sandwich.jpg"

import { FaCheck } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserInterestForm2 = () => {
    const { selectedImageNames } = useContext(ImageContext);
    const navigate = useNavigate();

    // State to track selected types for each category
    const [selectedTypes, setSelectedTypes] = useState({
        Restaurants: [],
        Nature: [],
        Clubs: [],
        Malls: [],
        Temples: [],
    });

    // const userInterest = {};
    const interests = selectedTypes.Restaurants;
    console.log(interests)
// Loop through the interests array
// interests.forEach((interest, index) => {
//     // Assign each interest to a numerical key, starting from 1
//     userInterest[1] = [interest];
// });

// console.log("User Interest:", userInterest);

    const handleClick = async () => {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const password = localStorage.getItem("password");

        try{
            const response = await axios.post("http://127.0.0.1:8000/signup",
            {
                "name": name,
                "email": email,
                "password": password,
                "userInterest": {1: interests},
                "user_likes": {}
              }
        )
        // console.log(userInterest)
        if(response.status === 200) {
            navigate('/signin')
        }
        } catch(err) {
            console.log(err)
        }

    }
    // console.log(selectedImageNames);

    // Filter out the selected images
    const selectedImages = imageData.filter(image => selectedImageNames.includes(image.name));

    // Function to handle selection of categories
    const handleCategorySelect = (category, selectedType) => {
        setSelectedTypes(prevState => ({
            ...prevState,
            [category]: [...prevState[category], selectedType],
        }));
    };

    // Render images based on selected category
    const renderCategoryImages = (category, categoryList) => (
        categoryList.map((image, index) => (
            <div key={index} style={{ position: 'relative' }}>
                <Tooltip label={image.name} placement="top">
                <Image
                    src={image.src}
                    borderRadius={10}
                    onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleCategorySelect(category, image.name)}
                    // height={'30vh'}
                    // width={'11vw'}
                />
                </Tooltip>
                {selectedTypes[category].includes(image.name) && (
                    <Box
                        position="absolute"
                        top="-10px"
                        right="-10px"
                        bgColor="white"
                        color="black"
                        borderRadius="50%"
                        width="25px"
                        height="25px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontWeight="bold"
                    >
                        <FaCheck />
                    </Box>
                )}
            </div>
        ))
    );

    return (
        <Box>
            <VStack spacing={8}>
                {selectedImages.map((image, index) => (
                    <Box key={index} display={'flex'} flexDirection={'row'}>
                        <Image
                            src={image.src}
                            borderRadius={10}
                            onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                            style={{ cursor: 'pointer' }}
                            marginRight={'10%'}
                        />
                        {/* Render additional images based on selected category */}
                        {image.name === 'Restaurants' && (
                            <HStack spacing={5}>
                                {renderCategoryImages(image.name, restaurantsList)}
                            </HStack>
                        )}
                        {image.name === 'Nature' && (
                            <HStack spacing={5}>
                                {renderCategoryImages(image.name, natureList)}
                            </HStack>
                        )}
                        {image.name === 'Clubs' && (
                            <HStack spacing={5}>
                                {renderCategoryImages(image.name, clubsList)}
                            </HStack>
                        )}
                        {image.name === 'Malls' && (
                            <HStack spacing={5}>
                                {renderCategoryImages(image.name, mallsList)}
                            </HStack>
                        )}
                    </Box>
                ))}
            </VStack>
            <Box display={'flex'} justifyContent="flex-end" alignItems="flex-end" marginBottom={'6%'} marginRight={'26%'}>
            <Button 
                bgColor={'black'} 
                color={'white'} 
                border={'2px'} 
                borderColor={'white'} 
                display={'flex'}
                _hover={{ bgColor: 'white', color: 'black' }} 
                position={"absolute"}
                bottom={10}
                right={20}
                onClick={handleClick}
            >
                PROCEED
            </Button>
        </Box>
        </Box>
    );
};

const imageData = [
    { src: nature, name: 'Nature' },
    { src: restaurants, name: 'Restaurants' },
    { src: malls, name: 'Malls' },
    { src: temples, name: 'Temples' },
    { src: clubs, name: 'Clubs' },
    { src: theatre, name: 'Theatre' },
    { src: resort, name: 'Resorts' },
    { src: sports, name: 'Adventure Sports' },
    { src: tourist, name: 'Tourist places' },
];

const natureList = [
    { src: nature, name: 'Nature' },
    { src: restaurants, name: 'Restaurants' },
    { src: malls, name: 'Malls' },
    { src: temples, name: 'Temples' },
]

const restaurantsList = [
    { src: buffet, name: 'Buffet' },
    { src: chinese, name: 'Chinese' },
    { src: restaurant, name: 'Restaurant' },
    { src: seafood, name: 'Seafood' },
    { src: fastfood, name: 'Fast Food'},
    { src: northindian, name: 'North Indian' },
    { src: familyfriendly, name: 'Family-friendly' },
    { src: sandwich, name: 'Sandwich' },
]

const mallsList = [
    { src: theatre, name: 'Theatre' },
    { src: resort, name: 'Resorts' },
    { src: sports, name: 'Adventure Sports' },
    { src: tourist, name: 'Tourist places' },
]
const templesList = [
    { src: theatre, name: 'Theatre' },
    { src: resort, name: 'Resorts' },
    { src: sports, name: 'Adventure Sports' },
    { src: tourist, name: 'Tourist places' },
]
const clubsList = [
    { src: theatre, name: 'Theatre' },
    { src: resort, name: 'Resorts' },
    { src: sports, name: 'Adventure Sports' },
    { src: tourist, name: 'Tourist places' },
]
const theatersList = [
    { src: theatre, name: 'Theatre' },
    { src: resort, name: 'Resorts' },
    { src: sports, name: 'Adventure Sports' },
    { src: tourist, name: 'Tourist places' },
]
const resortList = [
    { src: theatre, name: 'Theatre' },
    { src: resort, name: 'Resorts' },
    { src: sports, name: 'Adventure Sports' },
    { src: tourist, name: 'Tourist places' },
]
const sportsList = [
    { src: theatre, name: 'Theatre' },
    { src: resort, name: 'Resorts' },
    { src: sports, name: 'Adventure Sports' },
    { src: tourist, name: 'Tourist places' },
]
const touristList = [
    { src: theatre, name: 'Theatre' },
    { src: resort, name: 'Resorts' },
    { src: sports, name: 'Adventure Sports' },
    { src: tourist, name: 'Tourist places' },
]

export default UserInterestForm2;

// // Function to render carousel items for a category
// const renderCategoryImages = (category, categoryList) => {
//     const carouselItems = [];
//     for (let i = 0; i < categoryList.length; i += 4) {
//         const images = categoryList.slice(i, i + 4).map((image, index) => (
//             <Box key={index} position="relative">
//                 <Image
//                     src={image.src}
//                     alt={image.name}
//                     borderRadius={10}
//                     onMouseEnter={(e) => e.target.style.opacity = '0.7'}
//                     onMouseLeave={(e) => e.target.style.opacity = '1'}
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => handleCategorySelect(category, image.name)}
//                 />
//                 {selectedTypes[category].includes(image.name) && (
//                     <Box
//                         position="absolute"
//                         top="-10px"
//                         right="-10px"
//                         bgColor="white"
//                         color="black"
//                         borderRadius="50%"
//                         width="25px"
//                         height="25px"
//                         display="flex"
//                         justifyContent="center"
//                         alignItems="center"
//                         fontWeight="bold"
//                     >
//                         <FaCheck />
//                     </Box>
//                 )}
//             </Box>
//         ));
//         carouselItems.push(
//             <CarouselItem key={i}>
//                 <HStack spacing={5}>
//                     {images}
//                 </HStack>
//             </CarouselItem>
//         );
//     }
//     return carouselItems;
// };