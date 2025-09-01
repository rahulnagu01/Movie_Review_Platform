// src/components/Layout/Footer.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #fff;
  padding: 3rem 0 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterSection = styled.div`
  h3 {
    color: #FFD700;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  p {
    color: #999;
    line-height: 1.6;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #999;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: #FFD700;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s;
  
  &:hover {
    background-color: #FFD700;
    color: #333;
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  span {
    color: #FFD700;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            <Logo>
              <span>✨</span> CineTrack
            </Logo>
            <p>Discover, track, and review films</p>
            <SocialLinks>
              <SocialIcon href="#" aria-label="Twitter">
                <FiTwitter />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Facebook">
                <FiFacebook />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <FiInstagram />
              </SocialIcon>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Navigation</h3>
            <FooterLinks>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/movies">Movies</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Legal</h3>
            <FooterLinks>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </FooterLinks>
          </FooterSection>
          
          <FooterSection>
            <h3>Follow Us</h3>
            <p>Stay updated with the latest movies and reviews</p>
          </FooterSection>
        </FooterTop>
        
        <FooterBottom>
          <p>&copy; 2024 CineTrack. All rights reserved.</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;