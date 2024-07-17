import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';
import Section from './Section';
import VideoBackground from './VideoBackground';

const Home = () => {
  return (
    <Container>
      <Header />
      <SectionContainer>
        <CustomSection>
          <CustomTitle>
            Transforme sua vitrine em um espetáculo gelado de tecnologia e inovação.
          </CustomTitle>
          <Section
            leftBtn='Visualizar Produto'
          />
        </CustomSection>
        <VideoBackgroundWrapper>
          <VideoBackground video='/images/videos/vitrine.mp4' />
          <GradientOverlay />
        </VideoBackgroundWrapper>
      </SectionContainer>
      {sections.map((section, index) => (
        <WhiteBackground key={index}>
          <Row>
            {section.items.map((item, idx) => (
              <HalfSection
                key={idx}
                title={item.title}
                description={item.description}
                image={item.image}
                leftBtn={item.leftBtn}
                rightBtn={item.rightBtn}
              />
            ))}
          </Row>
        </WhiteBackground>
      ))}
    </Container>
  );
};

export default Home;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CustomSection = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Alinha verticalmente no centro da tela */
`;

const CustomTitle = styled.h1`
  font-size: 37px;
  color: white;
  font-family: 'Ginza Heavy', sans-serif;
  position: absolute; /* Defina a posição como absoluta */
  top: 780px; /* Ajuste a quantidade que deseja descer o texto */
   animation: ${fadeIn} 2s ease-in; /* Animação de fade-in */
`;

const SectionContainer = styled.div`
  position: relative;
`;

const VideoBackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
`;

const HalfSection = styled(Section)`
  width: 50%;
  height: 50vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: ${props => `url('/images/${props.image}')`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const WhiteBackground = styled.div`
  background-color: white;
  padding-top: 50px; /* Ajuste a quantidade de espaço acima das seções brancas conforme necessário */
`;

// Define os dados das seções em um array para simplificar a renderização
const sections = [
  {
    items: [
      { title: 'Item A', description: 'Descricao', image: 'vitrine_home.png', leftBtn: 'Veja preço', rightBtn: '?' },
      { title: 'Item B', description: 'Descricao', image: 'model-3.jpg', leftBtn: '?', rightBtn: 'Botao 2' },
    ],
  },
  {
    items: [
      { title: 'Item C', description: 'Descricao', image: 'model-x.jpg', leftBtn: 'Botao 1', rightBtn: 'Botao 2' },
      { title: 'Item D', description: 'Descricao', image: 'solar-panel.jpg', leftBtn: 'Botao 1', rightBtn: 'Botao 2' },
    ],
  },
  {
    items: [
      { title: 'Item E', description: 'Descricao', image: 'solar-roof.jpg', leftBtn: 'Botao 1', rightBtn: 'Botao 2' },
      { title: 'Item F', description: 'Descricao', image: 'accessories.jpg', leftBtn: 'Botao 1', rightBtn: '' },
    ],
  },
];
