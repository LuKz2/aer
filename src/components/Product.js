import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styled, { keyframes, css } from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import NextSection from './NextSection';
import { ThreeModelViewer } from './ThreeModelViewer';
import Details from '../Screens/Product/Design';
import Rotate from '../Screens/Product/Rotate';
import Video from '../Screens/Product/Video';

const ProductPage = () => {
  const { productName, subProductName } = useParams();
  const words = productName.split(" ");
  const smallText = subProductName || "Porto Paris";

  const [currentSection, setCurrentSection] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [showDesignText, setShowDesignText] = useState(false);
  const { scrollYProgress } = useViewportScroll();

  // Defina a URL do modelo .glb com base no productName e subProductName
  const modelUrl = `/models/${subProductName || productName}.glb`;

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let closestSection = '';
      let closestSectionOffset = Number.MAX_VALUE;

      sections.forEach(section => {
        const offset = Math.abs(section.getBoundingClientRect().top);
        if (offset < closestSectionOffset) {
          closestSectionOffset = offset;
          closestSection = section.id;
        }
      });

      setCurrentSection(closestSection);

      const designSection = document.getElementById('Design');
      if (designSection) {
        const designSectionBottom = designSection.getBoundingClientRect().bottom;
        if (designSectionBottom <= window.innerHeight && !showDesignText) {
          setShowDesignText(true);
        } else if (designSectionBottom > window.innerHeight && showDesignText) {
          setShowDesignText(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showDesignText]);

  const scaleReversed = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const backgroundColor = useTransform(scrollYProgress, [0, 1], ['#191919', '#ffffff']);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <PageMenu onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <MenuItem onClick={() => scrollToSection('home')}>
          <MenuDot className={`menu-dot ${currentSection === 'home' ? 'active' : ''}`}>
            <ProgressCircle
              as={motion.div}
              style={{
                strokeDasharray: '100%',
              }}
              active={currentSection === 'home'}
            />
          </MenuDot>
          <MenuText
            as={motion.span}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={currentSection === 'home' ? 'active' : ''}
          >
            {productName}
          </MenuText>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('about')}>
          <MenuDot
            as={motion.div}
            className={`menu-dot ${currentSection === 'about' ? 'active' : ''}`}
          />
          <MenuText
            as={motion.span}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={currentSection === 'about' ? 'active' : ''}
          >
            Sobre
          </MenuText>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('Design')}>
          <MenuDot
            as={motion.div}
            className={`menu-dot ${currentSection === 'Design' ? 'active' : ''}`}
          />
          <MenuText
            as={motion.span}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={currentSection === 'Design' ? 'active' : ''}
          >
            Design
          </MenuText>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('Rotate')}>
          <MenuDot
            as={motion.div}
            className={`menu-dot ${currentSection === 'Rotate' ? 'active' : ''}`}
          />
          <MenuText
            as={motion.span}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={currentSection === 'Rotate' ? 'active' : ''}
          >
            3D
          </MenuText>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('Video')}>
          <MenuDot
            as={motion.div}
            className={`menu-dot ${currentSection === 'Video' ? 'active' : ''}`}
          />
          <MenuText
            as={motion.span}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={currentSection === 'Video' ? 'active' : ''}
          >
            Video
          </MenuText>
        </MenuItem>
      </PageMenu>

      <Section id="home">
        <motion.div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          background: backgroundColor,
          fontFamily: 'Ginza Heavy, sans-serif',
          textAlign: 'center',
          position: 'relative',
          margin: 0,
          padding: 0
        }}>
          <motion.h1 style={{
            alignSelf: 'flex-start',
            marginTop: '250px',
            marginLeft: '150px',
            fontSize: '100px',
            fontWeight: 700,
            letterSpacing: '-1px',
            lineHeight: 1.2,
            color: '#393c41'
          }}>
            {words.map((word, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.40,
                  delay: i / 10,
                }}
                key={i}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: words.length / 10 + 0.5 }}
            style={{
              fontSize: '40px',
              fontWeight: 100,
              marginRight: '1000px',
              color: '#FFF'
            }}
          >
            {smallText}
          </motion.p>

          <div>
            <Canvas style={{ position: "absolute", margin: 0, left: 350, right: 0, top: -50, bottom: 0 }}>
              <ambientLight intensity={2} />
              <Environment preset="night" />
              <OrbitControls
                maxPolarAngle={Math.PI / 2}
                minDistance={1}
                maxDistance={2.3}
                enablePan={false}
                enableZoom={false}
                position={[0, 0, 2]}
              />
              <ThreeModelViewer modelUrl={modelUrl} />
            </Canvas>
          </div>

          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer'
          }} onClick={() => scrollToSection('about')}>
            <DownArrow src='/images/down-arrow.svg' alt="Down Arrow" />
          </div>
        </motion.div>
      </Section>

      <Section id="about">
        <NextSection />
      </Section>
      <Section id="Design">
        <Details />
        {showDesignText && (
          <DesignText as={motion.div}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Design
          </DesignText>
        )}
      </Section>
      <Section id="Rotate">
        <Rotate />
      </Section>
      <Section id="Video">
        <Video />
      </Section>
    </>
  );
};

const PageMenu = styled.div`
  position: fixed;
  top: 50%;
  left: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transform: translateY(-50%);
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const MenuDot = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  background-color: #999;
  border-radius: 50%;
  font-family: 'Ginza Heavy', sans-serif;
  &.active {
    background-color: #fff;
  }
`;

const MenuText = styled(motion.span)`
  margin-left: 10px;
  color: ${props => props.className.includes('active') ? '#fff' : '#999'};
  font-family: 'Ginza Heavy, sans-serif';
  &.active {
    color: #fff;
  }
`;

const Section = styled.section`
  min-height: 50vh;
  margin: 0;
  padding: 0;
`;

const DownArrow = styled.img`
  height: 40px;
  animation: animateDown infinite 1.5s;
  overflow-x: hidden;
`;

const ProgressCircle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid transparent;
  box-sizing: border-box;
  pointer-events: none;
  transform: rotate(-90deg);

  ${(props) =>
    props.active &&
    css`
      border-top-color: #fff;
      border-right-color: #fff;
      border-bottom-color: #fff;
      border-left-color: transparent;
    `}
`;

const DesignText = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 50px;
  color: white;
  font-family: 'Ginza Heavy', sans-serif;
`;

export default ProductPage;
