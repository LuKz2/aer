import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';
import Section from './Section';
import VideoBackground from './VideoBackground';
import Fade from 'react-reveal/Fade';
import SobreCarousel from './SobreCarousel';
import ClientsPartnersSection from '../Screens/Home/ClientsPartnersSection';  // Novo componente importado
import UpdatesSection from '../Screens/Home/UpdatesSection';
import Footer from '../Screens/Home/Footer';

const Home = () => {
  return (
    <Container>
      <Header />
      <HeroSectionContainer>
        <HeroSection>
          <Fade bottom>
            <TextContainer>
              <SmallTitle>Video games</SmallTitle>
              <Title>Vitrine gay 2</Title>
              <Button>Explorar</Button>
            </TextContainer>
          </Fade>
        </HeroSection>
        <VideoBackgroundWrapper>
          <VideoBackground video='/images/videos/vitrine.mp4' />
          <DarkOverlay />
          <DownArrow src='/images/down-arrow.svg' alt="Down Arrow" />
        </VideoBackgroundWrapper>
      </HeroSectionContainer>

      {/* Seção de Produtos */}
      <SectionContainer>
        <Fade bottom>
          <SectionTitleDest>Produtos em Destaque</SectionTitleDest>
        </Fade>
        {sections.map((section, index) => (
          <WhiteBackground key={index}>
            <Row>
              {section.items.map((item, idx) => (
                <Fade bottom key={idx}>
                  <HalfSection
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    leftBtn={item.leftBtn}
                    rightBtn={item.rightBtn}
                  />
                </Fade>
              ))}
            </Row>
          </WhiteBackground>
        ))}
      </SectionContainer>

      <SectionContainer>
        <SobreCarousel />
      </SectionContainer>

      {/* Clientes e Parceiros */}
      <SectionContainer2>
        <ClientsPartnersSection /> {/* Novo componente aqui */}
      </SectionContainer2>

      {/* Atualizações */}
      <Fade bottom>
      <SectionContainer3>
        <UpdatesSection />
      </SectionContainer3>
      </Fade>

      {/* Rodapé com Contato */}
      <SectionContainer4>
        <Footer />
      </SectionContainer4>
    </Container>
  );
};

export default Home;


// Styled Components and Animations

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const animateDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  
`;

const HeroSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  text-align: left;
  padding-left: 50px;
  color: white;
  z-index: 2;
`;

const HeroSectionContainer = styled.div`
  position: relative;
  width: 100%;
`;

const TextContainer = styled.div`
  max-width: 600px;
  font-family: 'Brmalls';
`;

const SmallTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  
`;

const VideoBackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Coloca o vídeo atrás do texto */
  overflow: hidden;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 1;
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Escurece o fundo para destacar o texto */
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-family: 'Ginza Heavy', sans-serif;
  margin-bottom: 20px;
  
`;

const Button = styled.div`
  background-color: rgba(23, 26, 32, 0.8);
  height: 40px;
  width: 120px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  opacity: 0.85;
  text-transform: uppercase;
  font-size: 12px;
  cursor: pointer;
  font-family: 'Brmalls';
`;

const DownArrow = styled.img`
  height: 50px;
  position: absolute;
  bottom: 20px; /* Coloca a seta no fundo da tela */
  left: 50%;
  transform: translateX(-50%);
  animation: ${animateDown} infinite 1.5s;
  z-index: 2;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px; /* Para diminuir o gap entre os cards */
  margin-top: 150px;
  font-family: 'Brmalls';
`;

const SectionContainer2 = styled.div`
  margin-top: 120px;

`;
const SectionContainer3 = styled.div`
  margin-top: 120px;

`;

const SectionContainer4 = styled.div`
  margin-top: 5px;
`;

const WhiteBackground = styled.div`
  background-color: white;
  padding: 50px 0;
`;


const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centraliza os cartões horizontalmente */
  align-items: center; /* Centraliza os cartões verticalmente */
  gap: 20px; /* Ajuste o espaço entre os cartões */
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  
`;



const SectionTitleDest = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  font-family: 'Brmalls';
`;

const HalfSection = styled(Section)`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  
`;



const sections = [
  {
    items: [
      {
        title: 'Vitrine 1',
        description: 'Wheres pa fala',
        image: '/images/image/img1.jpg',
        leftBtn: 'Visualizar produto',
        rightBtn: 'Medidas',
        
      },
      {
        title: 'Vitrine 2 a vingança',
        description: 'Wheres pa fala',
        image: '/images/image/img2.jpg',
        leftBtn: 'Visualizar produto',
        rightBtn: 'Medidas',
      },
      {
        title: 'Vitrine 3 o retorno',
        description: 'Wheres pa fala',
        image: '/images/image/img3.jpg',
        leftBtn: 'Visualizar produto',
        rightBtn: 'Medidas',
      },
      {
        title: 'Vitrine 4 uma nova esperança',
        description: 'Wheres pa fala',
        image: '/images/image/vitrine_home.png',
        leftBtn: 'Visualizar produto',
        rightBtn: 'Medidas',
      },
    ],
  },
];

