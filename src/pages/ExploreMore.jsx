import React from 'react';
import Intro from '../component/Intro'
import ExploreSlide from '../component/ExploreSlide'
import HIW from '../component/HIW'
import Details from '../component/Details'
import Footer from '../component/Footer';

const ExploreMore = () => {
  return (
    <div>
        <Intro />
        <ExploreSlide />
        <HIW />
        <Details />
        <Footer />
    </div>
  );
}

export default ExploreMore;
