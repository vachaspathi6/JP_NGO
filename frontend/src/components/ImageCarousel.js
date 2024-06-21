import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const ImageCarousel = ({ images }) => {
  return (
    <Carousel
      animation="slide"
      duration={500}
      indicators={true}
      navButtonsAlwaysVisible={true}
    >
      {images.map((image, index) => (
        <Paper key={index} elevation={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img
        src={image}
        alt={`Slide ${index}`}
        style={{
          width: '100%',
          height: '400px', // Adjust maxHeight as per your design requirements
          objectFit: 'cover',
          borderRadius: '5px', // Optional: Add borderRadius if needed
        }}
      />
    </Paper>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
