import React from 'react'
// import video from '../images/4750076-hd_1920_1080_25fps.mp4';
import imagehome from "../images/photo_2024-05-01_17-10-28.jpg";
import './Home.css';

const Home = () => {
  return (
  
  <div className="video">
 {/* <video src={video} autoPlay loop muted typeof="mp4"></video> */}
 
 <img className="home-image" src={imagehome } alt="home" />
        <div class="text">
            <h2> POWERMATTE HIGH.INTENSITY URANUS</h2>
            <p>POTENCY MEETS PRECISION IN URANUS MALL</p>
            <p className="home-btn">ENGOY SHOPPING</p>
        </div>











        
    </div>
  )
}

export default Home
