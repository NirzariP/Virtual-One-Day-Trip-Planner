import { Avatar, Box, Button, Flex, Heading, Text, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Tooltip, Checkbox, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { useContext } from 'react';
import { ImageContext } from '../context/selected';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Filters = () => {
    const [sliderValue, setSliderValue] = useState(400);
    const [noOfHours, setNoOfHours] = useState(5);
    const [rating, setRating] = useState(4);
    const [modeOfTransport, setModeOfTransport] = useState('driving');
    const [location, setLocation] = useState('goregaon');
    const [proceedData, setProceedData] = useState(null);
    const { selectedImageNames } = useContext(ImageContext);
    const [open, setOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [preferences, setPreferences] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (selectedImageNames.includes("Restaurants")) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [selectedImageNames]);

    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const username = localStorage.getItem('name');

    const handleProceed = async () => {

        console.log(selectedImageNames)
        let arr = []
        for(let i=0; i<selectedImageNames.length; i++) {
          if(selectedImageNames[i] === "Restaurants") {
            arr.push("df_res")
            localStorage.setItem("res", i)
          }
          else if(selectedImageNames[i] === "Clubs") {
            arr.push("df_clubs")
          }
          else if(selectedImageNames[i] === "Adventure Sports") {
            arr.push("df_adventure")
          }
          else if(selectedImageNames[i] === "Nature") {
            arr.push("df_nature")
          }
          else if(selectedImageNames[i] === "Malls") {
            arr.push("df_malls")
          }
          preferences[i+1] = arr[i]
        }

        const data = {
            "preferences": preferences,
            "mode_of_transport": modeOfTransport,
            "time": parseInt(noOfHours),
            "location": location,
            "users_budget": sliderValue ,
            "cuisine_type": selectedOptions.length > 0 ? selectedOptions : ["Buffet", "Chinese"],
            "rating": rating
        };
        console.log(data);

        try {
          const response = await axios.post("http://127.0.0.1:8000/plans", data)
          console.log(response)
          if(response.status === 200) {
            const res = response.data
            navigate("/plans", { state: { res } });
          }
        } catch (err) {
          console.log(err)
        }
        
    };

    return (
        <Box>
            <Flex bg='#1F1F1F' height={'150px'} borderRadius={10} justifyContent={'space-around'} align={'center'} p='8%' mb='5%'>
                <Box>
                    <Heading color={'white'} size={'md'}>Welcome</Heading>
                    <Text fontSize={20} color={'white'} size={'sm'}>{username}</Text>
                </Box>
                <Box>
                    <Avatar color={'white'} h='70px' w='70px' />
                </Box>
            </Flex>
            <Box bg='#1F1F1F' borderRadius={10} height="calc(100vh - 180px)" overflowY="auto">
                <Box m='2% 0' p='8%'>
                    <Box display="inline-block">
                        {selectedImageNames.map((name, index) => (
                            <Box
                                key={index}
                                color={'white'}
                                borderRadius={5}
                                p='1% 8%'
                                border={'1px solid white'}
                                display="inline-block"
                                fontSize="16px"
                                lineHeight="1.5"
                                margin="5px"
                            >
                                {name}
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Text fontSize={'18px'} color='white' bgColor={'grey'} p='1% 0 1% 8%' fontWeight={500}>FILTERS</Text>
                <Box p='2% 8%'>
                    <Stack spacing={2}>
                        <Text fontSize={15} color={'white'} mb='1%'>NO OF HOURS</Text>
                        <NumberInput defaultValue={noOfHours} min={1} max={24} onChange={(value) => setNoOfHours(value)}>
                            <NumberInputField bgColor={'transparent'} borderRadius={5} border={'1px solid white'} color={'white'} />
                            <NumberInputStepper color={'white'}>
                                <NumberIncrementStepper color={'white'} />
                                <NumberDecrementStepper color={'white'} />
                            </NumberInputStepper>
                        </NumberInput>
                        {open && (
                            <>
                                <Text fontSize={15} color={'white'} mb='8%'>BUDGET</Text>
                                <Slider
                                    id='slider'
                                    defaultValue={sliderValue}
                                    min={600}
                                    max={1200}
                                    colorScheme='white'
                                    onChange={(v) => setSliderValue(v)}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <Tooltip
                                        hasArrow
                                        bg='white'
                                        color='black'
                                        placement='top'
                                        label={`₹${sliderValue}`}
                                        isOpen={true}
                                    >
                                        <SliderThumb />
                                    </Tooltip>
                                </Slider>
                                <Box bg="#333" p={4} borderRadius="5px">
                                    <Menu>
                                        <MenuButton as={Button} color="white" bg="#444" borderRadius="5px">
                                            Cuisine Type
                                        </MenuButton>
                                        <MenuList>
                                            {['Chinese', 'Buffet', 'Restaurant', 'Seafood', 'Fast Food', 'North Indian', 'Family-friendly', 'Sandwich'].map((option, index) => (
                                                <MenuItem key={index}>
                                                    <Checkbox isChecked={selectedOptions.includes(option)} onChange={() => handleCheckboxChange(option)}>
                                                        {option}
                                                    </Checkbox>
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                    <Box mt={4} color="white">Selected Options: {selectedOptions.join(', ')}</Box>
                                </Box>
                            </>
                        )}
                        <Text fontSize={15} color={'white'} m='5% 0'>RATING</Text>
                        <Slider
                            aria-label='slider-ex-2'
                            colorScheme='white'
                            defaultValue={rating}
                            min={3}
                            max={5}
                            step={0.1}
                            onChange={(v) => setRating(v)}
                            >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <Tooltip
                                hasArrow
                                bg='white'
                                color='black'
                                placement='top'
                                label={`${rating}`}
                                isOpen={true}
                            >
                                <SliderThumb />
                            </Tooltip>
                            <SliderThumb />
                        </Slider>
                        <Text fontSize={15} color={'white'} mb='1%'>MODE OF TRANSPORT</Text>
                        <Select 
                            // placeholder='Any'
                            // variant='filled'
                            // bg='#1F1F1F'
                            // color='white'
                            // borderColor='white'
                            // _placeholder={{ color: 'white', opacity: '0.7' }}
                            _focus={{ bg: '#1F1F1F', color: 'white', borderColor: 'white' }}
                            value={modeOfTransport}
                            className='dark-select'
                            onChange={(e) => setModeOfTransport(e.target.value)}
                        >
                            <option value='driving' style={{backgroundColor: '#1F1F1F', color: 'white'}}>Driving</option>
                            <option value='walking' style={{backgroundColor: '#1F1F1F', color: 'white'}}>Walking</option>
                            <option value='train' style={{backgroundColor: '#1F1F1F', color: 'white'}}>Train</option>
                        </Select>
                        <Text fontSize={15} color={'white'} mb='1%'>LOCATION</Text>
                        <Select 
    // placeholder='Select station'
                            variant='filled'
                            bg='#1F1F1F'
                            color='white'
                            borderColor='white'
                            _placeholder={{ color: 'white', opacity: '0.7' }}
                            _focus={{ bg: '#1F1F1F', color: 'white', borderColor: 'white' }}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value='goregaon' style={{backgroundColor: '#1F1F1F', color: 'white'}}>Goregaon</option>
                            <option value='andheri' style={{backgroundColor: '#1F1F1F', color: 'white'}}>Andheri</option>
                            <option value='vileparle' style={{backgroundColor: '#1F1F1F', color: 'white'}}>Vile Parle</option>
                            <option value='bandra' style={{backgroundColor: '#1F1F1F', color: 'white'}}>Bandra</option>
                        </Select>

                        <Button
                            bgColor={'white'}
                            color={'black'}
                            fontWeight={500}
                            mt='3%'
                            w='150px'
                            alignSelf='center'
                            onClick={handleProceed}
                        >
                            PROCEED
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

export default Filters;
