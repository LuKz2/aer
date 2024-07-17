import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';

const Design = () => {
  const { scrollYProgress } = useViewportScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacityImage = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <SectionContainer>
      <ContentContainer>
        <ImageContainer>
          <StyledImage
            src="/images/menu_images/vitrine2.png"
            alt="Imagem de vitrine"
            style={{ opacity: opacityImage }}
          />
          <TextContainer>
            <StyledTitle style={{ opacity: opacityText, y: yText }}>
              Design
            </StyledTitle>
          </TextContainer>
        </ImageContainer>
        <LearnMoreButton onClick={() => alert('Saiba mais clicado!')}>
          <FiPlus size={20} style={{ marginRight: '10px' }} />
          Saiba mais
        </LearnMoreButton>
      </ContentContainer>
    </SectionContainer>
  );
};

export default Design;

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(90deg, rgba(25, 25, 25, 1) 0%, rgba(25, 25, 25, 1) 35%, rgba(58, 62, 62, 1) 100%);
  font-family: 'Ginza Heavy', sans-serif;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const TextContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: auto;
  transition: opacity 0.3s ease-in-out;
`;

const StyledTitle = styled(motion.h2)`
  font-size: 10vw;
  margin-bottom: 20px;
`;

const LearnMoreButton = styled.button`
  position: absolute;
  bottom: 100px;
  right: 20px;
  background-color: #ffffff;
  color: #000000;
  border: 0.1px solid #cccccc;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-family: 'Brmalls';
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;
