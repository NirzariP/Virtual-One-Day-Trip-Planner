import { Image } from '@chakra-ui/react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import home1 from '../assets/home1.png'
import home2 from '../assets/home2.png'

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Image src={home1} />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={home2} />
      </Carousel.Item>
      <Carousel.Item>
        <Image src={home1} />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;