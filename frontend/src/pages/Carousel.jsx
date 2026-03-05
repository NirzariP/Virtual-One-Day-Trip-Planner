import Carousel from 'react-bootstrap/Carousel';
import restaurants from '../assets/Restaurants.png';
import malls from '../assets/malls.png';
import temples from '../assets/temples.png';
import { Box, Image } from '@chakra-ui/react';

function CarouselItem() {
  return (
    <Carousel slide={false}>
      <Carousel.Item>
        <Box style={{display: 'flex'}}> 
        <Image src={restaurants} width={'100%'}/>
        <Image src={restaurants} width={'100%'}/>
        <Image src={restaurants} width={'100%'}/>
        <Image src={restaurants} width={'100%'}/>
        </Box>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={malls} width={'100%'}/>
        <Image src={malls} width={'100%'}/>
        <Image src={malls} width={'100%'}/>
        <Image src={malls} width={'100%'}/>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={temples} width={'100%'}/>
        <Image src={temples} width={'100%'}/>
        <Image src={temples} width={'100%'}/>
        <Image src={temples} width={'100%'}/>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselItem;