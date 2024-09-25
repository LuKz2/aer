import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styled, { keyframes, css } from 'styled-components'; // Adicionando 'css' aqui
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import NextSection from './NextSection';
import Details from '../Screens/Product/Design';
import Rotate from '../Screens/Product/Rotate';
import Video from '../Screens/Product/Video';
import Galeria from '../Screens/Product/Galeria';
import Footer from '../Screens/Home/Footer';

// Importando Balcões
import { ThreeModelViewer } from '../assets/GLB/Balcao/BalcaoHz';
import { BalcaoVt } from '../assets/GLB/Balcao/BalcaoVt';

// Importando Estantes
import { Cremalheiras } from '../assets/GLB/Estantes/Cremalheiras';
import { Deposito } from '../assets/GLB/Estantes/Deposito';
import { Estocagem } from '../assets/GLB/Estantes/Estocagem';
import { Higienizacao } from '../assets/GLB/Estantes/Higienizacao';

// Importando Expositores
import { ExpositorPV } from '../assets/GLB/Expositores/ExpositorPV';

// Importando Mobiliário
import { Acessorio1 } from '../assets/GLB/Mobiliario/Acessorios/Acessorio1';
import { Acessorio2 } from '../assets/GLB/Mobiliario/Acessorios/Acessorio2';
import { Acessorio3 } from '../assets/GLB/Mobiliario/Acessorios/Acessorio3';
import { Prateleira1 } from '../assets/GLB/Mobiliario/Prateleiras/Prateleira1';
import { Prateleira2 } from '../assets/GLB/Mobiliario/Prateleiras/Prateleira2';
import { Prateleira3 } from '../assets/GLB/Mobiliario/Prateleiras/Prateleira3';
import { Buffet } from '../assets/GLB/Mobiliario/Buffet';
import { Lavadora } from '../assets/GLB/Mobiliario/Lavadora';
import { Lavatorio } from '../assets/GLB/Mobiliario/Lavatorio';
import { Mesa } from '../assets/GLB/Mobiliario/Mesa';
import { MesaCmPia } from '../assets/GLB/Mobiliario/MesaCmPia';

// Importando Vitrines
import { VitrinePG } from '../assets/GLB/Vitrines/VitrinePG';
import { VitrinePP } from '../assets/GLB/Vitrines/VitrinePP';


const productContent = {
  'BALCÃO PORTO HORIZONTAL': {
    words: ['BALCÃO'],
    smallText: 'PORTO HORIZONTAL',
    image: '/images/camara-fria.jpg',
    video: '/videos/camara-fria.mp4',
  },
  'DEPOSITO': {
    words: ['DEPOSITO'],
    smallText: 'Texto descritivo sobre o Depósito',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4',
  },
  'BALCÃO PORTO VERTICAL': {
    words: ['BALCÃO', 'PORTO', 'HORIZONTAL'],
    smallText: 'Texto descritivo sobre o BALCÃO PORTO VERTICAL',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'ESPECIAIS': {
    words: ['ESPECIAIS'],
    smallText: 'Texto descritivo sobre o ESPECIAIS',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'HIGIENIZAÇÃO': {
    words: ['HIGIENIZAÇÃO'],
    smallText: 'Texto descritivo sobre o HIGIENIZAÇÃO',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'ESTOCAGEM': {
    words: ['ESTOCAGEM'],
    smallText: 'Texto descritivo sobre o ESTOCAGEM',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'CREMALHEIRAS': {
    words: ['CREMALHEIRAS'],
    smallText: 'Texto descritivo sobre o CREMALHEIRAS',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'VITRINE PORTO GALICIA': {
    words: ['VITRINE PORTO GALICIA'],
    smallText: 'Texto descritivo sobre o VITRINE PORTO GALICIA',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'VITRINE PORTO PARIS': {
    words: ['VITRINE PORTO PARIS'],
    smallText: 'Texto descritivo sobre o VITRINE PORTO PARIS',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'EXPOSITOR PORTO VISEU': {
    words: ['EXPOSITOR PORTO VISEU'],
    smallText: 'Texto descritivo sobre o EXPOSITOR PORTO VISEU',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4',
    model: '/models/expositor-pv.glb'
  },
  'MESA': {
    words: ['MESA'],
    smallText: 'Texto descritivo sobre o MESA',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'BUFFET': {
    words: ['BUFFET'],
    smallText: 'Texto descritivo sobre o BUFFET',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'MESA COM PIA': {
    words: ['MESA COM PIA'],
    smallText: 'Texto descritivo sobre o MESA COM PIA',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'LAVADORA': {
    words: ['LAVADORA'],
    smallText: 'Texto descritivo sobre o LAVADORA',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },
  'LAVATORIO': {
    words: ['LAVATORIO'],
    smallText: 'Texto descritivo sobre o LAVATORIO',
    image: '/images/ar-condicionado.jpg',
    video: '/videos/ar-condicionado.mp4'
  },

  'ACESSÓRIOS': {
    'ACESSÓRIO 1': {
      words: ['ACESSÓRIO', '1'],
      smallText: 'Detalhes sobre o Acessório 1',
      image: '/images/acessorio1.jpg'
    },
    'ACESSÓRIO 2': {
      words: ['ACESSÓRIO', '2'],
      smallText: 'Detalhes sobre o Acessório 2',
      image: '/images/acessorio2.jpg'
    },
    'ACESSÓRIO 3': {
      words: ['ACESSÓRIO', '3'],
      smallText: 'Detalhes sobre o Acessório 3',
      image: '/images/acessorio3.jpg'
    }

  },

  'PRATELEIRAS': {
    'PRATELEIRA 1': {
      words: ['PRATELEIRA', '1'],
      smallText: 'Detalhes sobre o Acessório 1',
      image: '/images/acessorio1.jpg'
    },
    'PRATELEIRA 2': {
      words: ['PRATELEIRA', '2'],
      smallText: 'Detalhes sobre o Acessório 2',
      image: '/images/acessorio2.jpg'
    },
    'PRATELEIRA 3': {
      words: ['PRATELEIRA', '3'],
      smallText: 'Detalhes sobre o Acessório 3',
      image: '/images/acessorio3.jpg'
    }
  }



};

const ProductPage = () => {
  const { productName, subProductName } = useParams();
  const [currentSection, setCurrentSection] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [useModelViewer2, setUseModelViewer2] = useState(false);
  const { scrollYProgress } = useViewportScroll();

  // Ajuste para garantir que todos os produtos, incluindo subprodutos de "ACESSÓRIOS" e "PRATELEIRAS", sejam encontrados
  let productDetails;

  if (productName === "ACESSÓRIOS" && subProductName) {
    // Verifica se é um subproduto de ACESSÓRIOS
    productDetails = productContent['ACESSÓRIOS'][subProductName];
  } else if (productName === "PRATELEIRAS" && subProductName) {
    // Verifica se é um subproduto de PRATELEIRAS
    productDetails = productContent['PRATELEIRAS'][subProductName];
  } else if (productName) {
    // Caso seja outro produto principal
    productDetails = productContent[productName];
  }

   // Se nenhum conteúdo foi encontrado, exibe uma página de produto não encontrado
   if (!productDetails) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', textAlign: 'center' }}>
        <h1>Produto não encontrado</h1>
      </div>
    );
  }

  const words = productDetails.words || [];
  const smallText = productDetails.smallText || "";

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleModelViewer = () => {
    setUseModelViewer2(!useModelViewer2);
  };

  return (
    <>
      <PageMenu onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <MenuItem onClick={() => scrollToSection('home')}>
          <MenuDot className={`menu-dot ${currentSection === 'home' ? 'active' : ''}`}>
            <ProgressCircle
              as={motion.div}
              style={{ strokeDasharray: '100%' }}
              active={currentSection === 'home'}
            />
          </MenuDot>
          <MenuText as={motion.span} initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.5 }}>
            {subProductName ? subProductName : productName}
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
        <MenuItem onClick={() => scrollToSection('Galeria')}>
          <MenuDot
            as={motion.div}
            className={`menu-dot ${currentSection === 'Galeria' ? 'active' : ''}`}
          />
          <MenuText
            as={motion.span}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className={currentSection === 'Galeria' ? 'active' : ''}
          >
            Galeria
          </MenuText>
        </MenuItem>
      </PageMenu>

      <Section id="home">
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#191919',
            fontFamily: 'Ginza Heavy, sans-serif',
            textAlign: 'center',
            position: 'relative',
            margin: 0,
            padding: 0
          }}
        >
          <motion.h1
            initial={{ x: '-100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              alignSelf: 'flex-start',
              marginTop: '250px',
              marginLeft: '150px',
              fontSize: '100px',
              fontWeight: 700,
              letterSpacing: '-1px',
              lineHeight: 1.2,
              color: '#393c41'
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: i / 10,
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: words.length / 10 + 0.5 }}
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
              {/* Carregar o modelo GLB correspondente */}
              {productName === 'BALCÃO PORTO HORIZONTAL' ? (
                <ThreeModelViewer />
              ) : productName === 'BALCÃO PORTO VERTICAL' ? (
                <BalcaoVt />
              ) : productName === 'DEPOSITO' ? (
                <Deposito />
              ) : productName === 'EXPOSITOR PORTO VISEU' ? (
                <ExpositorPV />
              ) : productName === 'CREMALHEIRAS' ? (
                <Cremalheiras />
              ) : productName === 'ESTOCAGEM' ? (
                <Estocagem />
              ) : productName === 'HIGIENIZAÇÃO' ? (
                <Higienizacao />
              ) : productName === 'ACESSÓRIO 1' ? (
                <Acessorio1 />
              ) : productName === 'ACESSÓRIO 2' ? (
                <Acessorio2 />
              ) : productName === 'ACESSÓRIO 3' ? (
                <Acessorio3 />
              ) : productName === 'PRATELEIRA 1' ? (
                <Prateleira1 />
              ) : productName === 'PRATELEIRA 2' ? (
                <Prateleira2 />
              ) : productName === 'PRATELEIRA 3' ? (
                <Prateleira3 />
              ) : productName === 'VITRINE PORTO GALICIA' ? (
                <VitrinePG />
              ) : productName === 'VITRINE PORTO PARIS' ? (
                <VitrinePP />
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                  <h2>Modelo não disponível</h2>
                </div>
              )}
            </Canvas>
          </div>

          {currentSection === 'home' && (
            <button
              style={{
                position: 'fixed',
                top: '80px',
                right: '80px',
                cursor: 'pointer',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                border: 'none',
                background: '#393c41',
                color: '#FFF',
                zIndex: 1000
              }}
              onClick={handleToggleModelViewer}
            >
              Trocar Modelo
            </button>
          )}

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

      <SectionAbout id="about">
        <NextSection />
      </SectionAbout>
      <Section id="Design">
        <Details />
      </Section>
      <ViewerSection id="Rotate">
        <Rotate />
      </ViewerSection>
      <Section id="Video">
        <Video />
      </Section>
      <Section id="Galeria">
        <Galeria />
      </Section>
      <FooterSection >
        <Footer />
      </FooterSection>
    </>
  );

};

const PageMenu = styled.div`
  position: fixed;
  top: 85%;
  left: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transform: translateY(-50%);
  padding: 20px;
  background: none;
  overflow: visible;

  /* Pseudoelemento para o blur */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.8) 10%, rgba(0, 0, 0, 0) 100%);
    filter: blur(40px);  /* Aplica o blur à luz escura */
    z-index: -1;  /* Coloca o efeito de blur atrás do texto */
    opacity: 0;  /* Inicialmente invisível */
    transition: opacity 0.5s ease;  /* Transição suave de opacidade */
  }

  /* Quando passar o mouse, a luz escura aparece */
  &:hover::before {
    opacity: 1;  /* Luz escura aparece no hover */
  }
`;


const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  
`;

const MenuDot = styled.div`
  position: relative;
  width: 5px;
  height: 5px;
  background-color: #354A81;
  border-radius: 50%;
  font-family: 'Ginza Heavy', sans-serif;
  &.active {
    background-color: #fff;
  }
`;

const MenuText = styled(motion.span)`
  margin-left: 10px;
  color: #CBCACA;  /* Texto branco para contraste */
  font-family: 'Ginza Heavy', sans-serif;
  &.active {
    color: #f8f8f8;  /* Cor de texto levemente diferente quando ativo */
  }
`;


const Section = styled.section`
  min-height: 50vh;
  margin: 0;
  padding: 0;
`;

const SectionAbout = styled.section`
  min-height: 100vh;
  margin: 0;
  padding: 0;
`;

const ViewerSection = styled.section`
  min-height: 50vh;
  margin: 0;
  padding: 0;
`;

const FooterSection = styled.section`
  min-height: 20vh;
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
