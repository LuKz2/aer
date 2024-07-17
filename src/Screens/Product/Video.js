import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import ThreeModelViewer from '../../components/ThreeModelViewer';

const Video = () => {
  const { scrollYProgress } = useViewportScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacityText = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionContainer>
      <ContentContainer>
        <StyledVideo autoPlay muted loop>
          <source src="/images/videos/vitrine.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </StyledVideo>
        <TextContainer style={{ translateY: yText, opacity: opacityText }}>
          <StyledTitle>
            Video Produto
          </StyledTitle>
        </TextContainer>
      </ContentContainer>
    </SectionContainer>
  );
};

export default Video;

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
  position: relative;
  width: 100%;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const TextContainer = styled(motion.div)`
  position: absolute;
  left: 100px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: white;
`;

const StyledTitle = styled(motion.h2)`
  font-size: 30px;
  margin-bottom: 10px;
`;
