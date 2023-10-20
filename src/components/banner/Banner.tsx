import { useState } from 'react';
import Menu from '../menu/Menu';
import './banner.scss';

const Banner = () => {

  return (
    <div className='banner'>
      <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" autoPlay loop muted ></video>
      <Menu/>
    </div>
  )
};

export default Banner;