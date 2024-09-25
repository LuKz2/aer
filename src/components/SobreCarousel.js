import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';

const SobreCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [progress, setProgress] = useState(0);
  const [inTransition, setInTransition] = useState(false);
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const slides = [
    {
      image: '/images/sobre/homem.jpeg',
      title: 'Sobre a Empresa 1',
      text: 'Valorant',
      description: 'Descrição da Empresa 1',
    },
    {
      image: '/images/sobre/medo.jpeg',
      title: 'Sobre a Empresa 2',
      text: 'Remnant 2',
      description: 'Descrição da Empresa 2',
    },
    {
      image: '/images/sobre/sorria.jpeg',
      title: 'Sobre a Empresa 3',
      text: 'CS 1.0',
      description: 'Descrição da Empresa 3',
    },
  ];

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 0));
      }, 50);

      if (progress === 100 && !inTransition) {
        setInTransition(true);  // Evitar mudanças rápidas durante a transição
        setFadeIn(false);       // Inicia fade-out
        setTimeout(() => {
          goToNextSlide();      // Troca de slide após fade-out
          setFadeIn(true);       // Reativa fade-in
          setInTransition(false); // Transição concluída
          setProgress(0);        // Reseta progresso
        }, 500);                // Tempo de fade-out
      }

      return () => clearInterval(interval);
    }
  }, [inView, progress, inTransition]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <PageContainer ref={inViewRef}>
      <CarouselContainer isVisible={inView}>
        <Arrow left onClick={goToPreviousSlide}>
          &lsaquo;
        </Arrow>
        <SlideContainer>
          {slides.map((slide, index) => (
            <Slide
              key={index}
              fadeIn={fadeIn && currentIndex === index}
              visible={currentIndex === index}
            >
              <TextContainer>
                <Title exit={!fadeIn}>{slide.title}</Title>
                <Subtitle exit={!fadeIn}>{slide.text}</Subtitle>
                <Description exit={!fadeIn}>{slide.description}</Description>
                <ReadMoreButton exit={!fadeIn}>LER MAIS &#10140;</ReadMoreButton>
              </TextContainer>
              <ImageContainer>
                <Image src={slide.image} alt={slide.title} fadeIn={fadeIn && currentIndex === index} />
              </ImageContainer>
            </Slide>
          ))}
        </SlideContainer>
        <Arrow right onClick={goToNextSlide}>
          &rsaquo;
        </Arrow>
      </CarouselContainer>
  
      {/* Loading dots, line, and "View All News" */}
      <DotsContainer>
        {slides.map((_, idx) => (
          <Dot key={idx} active={currentIndex === idx}>
            {currentIndex === idx && (
              <CircularProgress progress={progress} />
            )}
          </Dot>
        ))}
        <Line />
        <ViewAllNews>SOBRE</ViewAllNews>
      </DotsContainer>
    </PageContainer>
  );
  
  
};

export default SobreCarousel;

// Circular Progress using SVG
const CircularProgress = ({ progress }) => {
  const radius = 80; // Aumentando o raio
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={200} height={200} viewBox="0 0 200 200">
      <circle
        stroke="#354A81"  // Cor azul
        fill="transparent"
        strokeWidth={16}  // Aumentando a espessura da borda
        r={radius}
        cx={100} // Centrando o círculo no SVG
        cy={100} // Centrando o círculo no SVG
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.3s ease' }}
      />
    </svg>
  );
};


const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideOutDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100px);
  }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animations for Fade and Slide
const PageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CarouselContainer = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: visible;
  background-color: #f9f9f9;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;

  @media (max-width: 768px) {
    height: 500px;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    height: 400px;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-between;
  text-align: center;
  opacity: ${(props) => (props.fadeIn ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  animation: ${(props) => (props.fadeIn ? fadeIn : fadeOut)} 1s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const ImageContainer = styled.div`
  width: 45%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 700px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const TextContainer = styled.div`
  width: 45%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    text-align: center;
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  animation: ${(props) => (props.exit ? slideOutDown : slideInUp)} 0.8s ease-in-out;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 20px;
  animation: ${(props) => (props.exit ? slideOutDown : slideInUp)} 0.8s ease-in-out;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 80%;
  animation: ${(props) => (props.exit ? slideOutDown : slideInUp)} 0.8s ease-in-out;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ReadMoreButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 30px;
  border: 2px solid #000;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  animation: ${(props) => (props.exit ? slideOutDown : slideInUp)} 0.8s ease-in-out;

  &:hover {
    background-color: #000;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? 'left: -40px;' : 'right: -40px;')}
  transform: translateY(-50%);
  font-size: 3rem;
  font-weight: 100;
  color: black;
  cursor: pointer;
  z-index: 10;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const DotsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const Dot = styled.div`
  width: 18px;
  height: 18px;
  background-color: transparent;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid grey; // Borda cinza fixa ao redor do círculo
  position: relative;
`;


const Line = styled.hr`
  height: 1px;
  width: 40px;
  margin: 0 10px;
  background-color: #bbb;
  border: none;
`;

const ViewAllNews = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
