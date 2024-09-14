import React from 'react'
import imageabout from "../images/photo_2024-05-02_15-28-18.jpg";
import './About.css'
const About = () => {
  return (
    <div class="about" id="about">
      <div class="container">
        <h1 class="special-heading">About Us </h1>

        <div class="about-content">
          <div class="image">
          <img className="about-image" src={imageabout } alt="home" />
          </div>
          <div class="text">
            <p>The URANUS website aims to secure your needs remotely from your home. It is divided into sections for clothing, electronics, and everything related to the beauty of woman and modern technologies. </p>
            <hr />
            <p>It includes discounts, available offers, and the latest trends, affiliated with the URANUS Trade Group.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
