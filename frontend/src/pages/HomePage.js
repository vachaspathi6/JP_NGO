import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import LogoCollection from '../components/LogoCollection';
import Highlights from '../components/Highlights'; // Import your Highlights component
import '../css/homepage.css';
function HomePage() {
  return (
    <>

    <Hero />
      <Header />
      <LogoCollection />
      <div className="homepage-content">
        <Highlights />
      </div>
      <Footer />
    </>
  )
}

export default HomePage;