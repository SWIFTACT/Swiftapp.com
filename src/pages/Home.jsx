import React from 'react'
import Navbar from '../component/Navbar'
import Intro from '../component/Intro'
import TopRes from '../component/TopRes'
import HIW from '../component/HIW'
import Details from '../component/Details'
import Footer from '../component/Footer'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Intro />
        <TopRes />
        <HIW />
        <Details />
        <Footer />
    </div>
  )
}

export default Home