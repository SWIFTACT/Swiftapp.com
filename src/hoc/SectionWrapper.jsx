import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { styles } from '../style';
import { staggerContainer } from '../utils/motion';

const SectionWrapper = (Component, idName) => {
  function HOC() {
    const location = useLocation();
    const [key, setKey] = useState(0);

    useEffect(() => {
      if (location.state && location.state.triggerAnimation) {
        setKey((prevKey) => prevKey + 1);
      }
    }, [location.state]);

    return (
      <motion.section
        key={key}
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-full mx-auto relative z-0`}
      >
        <span className='hash-span' id={idName}>&nbsp;</span>
        <Component />
      </motion.section>
    );
  }
  return HOC;
};

export default SectionWrapper;
