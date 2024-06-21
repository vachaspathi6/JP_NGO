import React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ImageCarousel from './ImageCarousel'; // Adjust the import path as per your directory structure

const images = [ 
  "https://i.pinimg.com/564x/fc/f3/51/fcf3512245cf7416fb0923a3d8e3e2eb.jpg",
  "https://i.pinimg.com/564x/b5/56/44/b5564453dc1d5578f9354d31bdb02c3b.jpg",
  "https://i.pinimg.com/564x/7d/83/77/7d837745d50561df91c6ac8e8023b947.jpg",
  "https://i.pinimg.com/564x/f6/ea/7e/f6ea7e23a965e67d0be6b2cabb2b0bcd.jpg",
  // "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg",
  // "https://imgflip.com/s/meme/Cute-Cat.jpg",
  // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdeYcbjrAkbm2HfOGx72CVIctCI_XE6h_niQ&s",
];

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
        pb: { xs: 8, sm: 12 }, // Adjust padding bottom as needed
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 }, // Adjust padding top as needed
          pb: { xs: 8, sm: 12 }, // Adjust padding bottom as needed
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            Welcome&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode = 'primary.main',
              }}
            >
              Everynyan?
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Blah blah blah blah blah
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="idk if we need this, but letsee"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
              }}
            />
            <Button variant="contained" color="primary">
              Start now
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
      <ImageCarousel images={images} />
    </Box>
  );
}
