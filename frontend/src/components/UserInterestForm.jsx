import { Box, HStack, Image } from '@chakra-ui/react';
import React, { useContext } from 'react';
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
import { FaCheck } from "react-icons/fa6";

const UserInterestForm = () => {
    const { selectedImageNames, addSelectedImageName, removeSelectedImageName } = useContext(ImageContext);

    console.log(selectedImageNames)

    const handleImageClick = (imageName) => {
      if (selectedImageNames.includes(imageName)) {
        removeSelectedImageName(imageName);
      } else {
        addSelectedImageName(imageName);
      }
    };

    // Divide imageData into two arrays: topImages and bottomImages
    const topImages = imageData.slice(0, 3);
    const middleImages = imageData.slice(3, 6);
    const bottomImages = imageData.slice(6);

    return (
        <div>
            <Box>
                <HStack spacing={15}>
                    {topImages.map((image, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                            <Image
                                src={image.src}
                                borderRadius={10}
                                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                                onClick={() => handleImageClick(image.name)}
                                style={{ cursor: 'pointer' }}
                            />
                            {selectedImageNames.includes(image.name) && (
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
                    ))}
                </HStack>
            <HStack spacing={15} mt='2%'>
                {middleImages.map((image, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <Image
                            src={image.src}
                            borderRadius={10}
                            onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                            onClick={() => handleImageClick(image.name)}
                            style={{ cursor: 'pointer' }}
                        />
                        {selectedImageNames.includes(image.name) && (
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
                ))}
            </HStack>
            <HStack spacing={15} mt='2%' justifyContent="center">
                {bottomImages.map((image, index) => (
                    <div key={index} style={{ position: 'relative' }}>
                        <Image
                            src={image.src}
                            borderRadius={10}
                            onMouseEnter={(e) => e.target.style.opacity = '0.5'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                            onClick={() => handleImageClick(image.name)}
                            style={{ cursor: 'pointer' }}
                        />
                        {selectedImageNames.includes(image.name) && (
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
                ))}
            </HStack>
            </Box>
        </div>
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

export default UserInterestForm;