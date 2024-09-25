// src/components/Equipe.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faHandsHelping, faRecycle } from '@fortawesome/free-solid-svg-icons';
import Lottie from 'react-lottie'; // Certifique-se de que react-lottie está instalado
import scrollAnimation from '../../assets/lottie/scrollAnimation.json'; // Atualize o caminho conforme necessário

const Equipe = () => {
  const values = [
    {
      title: 'Compromisso com a Qualidade',
      description: 'Nossos sistemas de refrigeração são desenvolvidos com os mais altos padrões de qualidade, garantindo desempenho superior e durabilidade.',
      icon: faLightbulb // Ícone de inovação
    },
    {
      title: 'Inovação e Sustentabilidade',
      description: 'Buscamos continuamente soluções inovadoras que minimizem o impacto ambiental, utilizando tecnologias que promovem eficiência energética e sustentabilidade.',
      icon: faRecycle // Ícone de sustentabilidade
    },
    {
      title: 'Atendimento Personalizado',
      description: 'Cada cliente é único. Oferecemos consultoria e suporte personalizados para garantir que cada projeto atenda perfeitamente às necessidades específicas.',
      icon: faHandsHelping // Ícone de atendimento
    }
  ];

  const services = [
    {
      title: 'Qualidade do Início ao Fim',
      description: 'Mantemos o controle total do processo de fabricação, do começo ao fim, para assegurar que cada sistema de refrigeração entregue esteja alinhado aos mais altos padrões de qualidade.',
      image: 'images/image/img1.jpg',
      altText: 'Qualidade do Início ao Fim'
    },
    {
      title: 'Consultoria e Projetos Personalizados',
      description: 'Oferecemos soluções sob medida para atender as demandas específicas de cada cliente, garantindo que cada projeto de refrigeração seja otimizado para suas necessidades.',
      image: 'images/image/img1.jpg',
      altText: 'Consultoria e Projetos Personalizados'
    },
    {
      title: 'Manutenção Preventiva e Corretiva',
      description: 'Nossos serviços de manutenção garantem que seus sistemas de refrigeração estejam sempre funcionando com a máxima eficiência, evitando problemas futuros e custos desnecessários.',
      image: 'images/image/img1.jpg',
      altText: 'Manutenção Preventiva e Corretiva'
    }
  ];

  const partners = [
    {
      name: 'Marinha do Brasil',
      description: 'Parceira em grandes projetos de refrigeração industrial.',
      image: 'images/image/img1.jpg',
      altText: 'Marinha do Brasil'
    },
    {
      name: 'Burger King',
      description: 'Instalação de sistemas de refrigeração em cozinhas industriais.',
      image: 'images/image/img1.jpg',
      altText: 'Burger King'
    },
    {
      name: 'Hospital Albert Einstein',
      description: 'Responsáveis pela refrigeração em setores críticos da área de saúde.',
      image: 'images/image/img1.jpg',
      altText: 'Hospital Albert Einstein'
    },
    {
      name: 'Coca-Cola',
      description: 'Parceira na instalação de câmaras frias e sistemas de refrigeração em fábricas.',
      image: 'images/image/img1.jpg',
      altText: 'Coca-Cola'
    }
  ];

  const [currentSection, setCurrentSection] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? partners.length - 1 : prevIndex - 1
    );
  };

  const scrollToHistoria = () => {
    const section = document.getElementById('historia');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection('historia');
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: scrollAnimation, // Seu arquivo de animação Lottie
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Container>
      {/* Seção "História da Empresa" */}
      <Section2 id="historia">
        <div style={{
          position: 'relative',
          backgroundImage: `url('images/image/img1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center'
        }}>
          {/* Overlay escuro */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1
          }}></div>

          {/* Texto focado */}
          <div style={{
            zIndex: 2,
          }}>
            <h1 style={{
              fontSize: '4rem',
              marginBottom: '20px',
              fontWeight: 'bold',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)'
            }}>História</h1>
          </div>
        </div>
      </Section2>

      {/* Seção "Quem Somos" */}
      <Section id="quem-somos">
        <SectionTitle>
          <img src="/images/logo/menu.png" alt="Logo" style={{ width: '50px', height: '50px' }} />
          <h1>Quem Somos</h1>
        </SectionTitle>

        {/* Container da Missão com Flexbox */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '0',
        }}>
          {/* Texto da Missão */}
          <div style={{
            maxWidth: '40%',
            padding: '100px',
            textAlign: 'left',
          }}>
            <h1 style={{
              fontSize: '2.5em',
              fontFamily: 'Brmalls',
            }}>Sobre</h1>
            <p style={{
              fontSize: '1em',
              fontFamily: 'Brmalls',
            }}>
              Nossa missão é proporcionar serviços de alta qualidade e inovadores para nossos clientes,
              promovendo um ambiente sustentável e inclusivo.
            </p>
          </div>

          {/* Imagem à direita */}
          <div style={{
            maxWidth: '50%',
            marginLeft: 'auto',
          }}>
            <img
              src="/images/image/img3.jpg"
              alt="Imagem da Missão"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </Section>

      {/* Seção "Nossos Valores" */}
      <Section id="missao">
        <SectionTitle>
          <img src="/images/logo/menu.png" alt="Logo" style={{
            width: '40px',
            height: '40px',
          }} />
          <h1>Nossos Valores</h1>
        </SectionTitle>

        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '50px',
          marginTop: '30px',
          color: '#000',
          textAlign: 'center'
        }}>Porque escolher a AER?</h2>

        {/* Conteúdo da seção "Valores" */}
        <ValoresContainer>
          {values.map((value, index) => (
            <Valor key={index}>
              <FontAwesomeIcon icon={value.icon} />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </Valor>
          ))}
        </ValoresContainer>
      </Section>

      {/* Seção "Serviços" */}
      <Section id="servicos">
        <SectionTitle>
          <img src="/images/logo/menu.png" alt="Logo" style={{
            width: '40px',
            height: '40px',
          }} />
          <h1>Serviços</h1>
        </SectionTitle>

        <ServiceContainer>
          {services.map((service, index) => (
            <ServiceItem key={index} reverse={index % 2 !== 0}>
              <ServiceText>
                <ServiceSubtitle>THE NATURAL CHOICE</ServiceSubtitle>
                <h3>{service.title}</h3>
                <Underline />
                <p>{service.description}</p>
              </ServiceText>
              <ServiceImage>
                <img src={service.image} alt={service.altText} />
              </ServiceImage>
            </ServiceItem>
          ))}
        </ServiceContainer>
      </Section>

      {/* Seção "Clientes e Parcerias" */}
      <Section id="clientes">
        <SectionTitle>
          <img src="/images/logo/menu.png" alt="Logo" style={{
            width: '40px',
            height: '40px',
          }} />
          <h1>Clientes e Parcerias</h1>
        </SectionTitle>

        <ClientContainer>
          <TextContainer>
            <h2>{partners[currentIndex].name}</h2>
            <Underline />
            <p>{partners[currentIndex].description}</p>
          </TextContainer>

          <CarouselContainer>
            <CarouselImage>
              <img src={partners[currentIndex].image} alt={partners[currentIndex].altText} />
            </CarouselImage>

            <ArrowButton direction="left" onClick={prevSlide}>
              &#9664;
            </ArrowButton>
            <ArrowButton direction="right" onClick={nextSlide}>
              &#9654;
            </ArrowButton>
          </CarouselContainer>
        </ClientContainer>
      </Section>

      {/* Seção "Inovação e Tecnologia" (renomeada para evitar duplicação de id) */}
      <Section id="inovacao">
        <SectionTitle>
          <img src="/images/logo/menu.png" alt="Logo" style={{
            width: '40px',
            height: '40px',
          }} />
          <h1>Inovação e Tecnologia</h1>
        </SectionTitle>
        <p>Historia</p>
      </Section>

      {/* Animação Lottie como botão fixo */}
      <LottieContainer onClick={scrollToHistoria} aria-label="Scroll to História">
        <Lottie
          options={defaultOptions}
          height={100}
          width={100}
          isStopped={false}
          isPaused={false}
        />
      </LottieContainer>
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  font-family: 'Arial, sans-serif';
  color: #000;
  position: relative;
`;

// Estilos para o menu com animações
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
  width: 10px;
  height: 10px;
  background-color: #999;
  border-radius: 50%;
  position: relative;

  &.active {
    background-color: #fff;
  }
`;

const MenuText = styled(motion.span)`
  margin-left: 10px;
  color: #999;
  font-family: 'Arial, sans-serif';

  &.active {
    color: #fff;
  }
`;

const Section = styled.section`
  min-height: 50vh;
  margin: 0;
  padding: 40px 50px;
  text-align: center;
`;

const Section2 = styled.section`
  /* Seu estilo existente */
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 20px;
  }
`;

const ClientContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TextContainer = styled.div`
  max-width: 45%;
  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 15px;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-top: 15px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 50%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarouselImage = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 10px;
  cursor: pointer;
  ${({ direction }) =>
    direction === 'left' ? 'left: 10px;' : 'right: 10px;'}

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const Underline = styled.div`
  width: 100px;
  height: 3px;
  background-color: #0044cc;
  margin-top: 10px;
`;

const ValoresContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-align: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 50px;
`;

const Valor = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  svg {
    font-size: 50px;
    color: #0044cc;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
    text-align: center;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
    color: #555;
  }
`;

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 50px;
`;

const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  flex-wrap: wrap;
`;

const ServiceText = styled.div`
  max-width: 50%;
  text-align: left;

  h3 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    margin-top: 20px;
  }
`;

const ServiceSubtitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #666;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const ServiceImage = styled.div`
  max-width: 45%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const LottieContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1000; /* Garante que fique acima de outros elementos */

  /* Opcional: adicionar sombra ou outros estilos */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
`;

export default Equipe;
