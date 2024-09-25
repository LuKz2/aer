import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Element } from 'react-scroll';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { ThreeModelViewer } from '../assets/GLB/Balcao/BalcaoHz'; // Componente de visualização de modelo 3D

const productDetails = {
  'CÂMARA FRIA': {
    title: 'a Câmara Fria',
    glbPath: '/models/camara-fria.glb',
    descriptionText: 'Resumo das funcionalidades da Câmara Fria...',
    aboutText: 'Detalhes sobre a história e tecnologia envolvida na Câmara Fria...',
    Description: 'Titulo para descrição'
  },
  'AR CONDICIONADO': {
    title: 'o Ar Condicionado',
    glbPath: '/models/ar-condicionado.glb',
    descriptionText: 'Resumo das funcionalidades do Ar Condicionado...',
    aboutText: 'Detalhes sobre a história e tecnologia envolvida no Ar Condicionado...',
  },
  // Outros produtos...
};

// Componente para animar o modelo 3D
const AnimatedModel = ({ glbPath, position, rotation }) => {
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Animação de rotação suave
    if (modelRef.current) {
      modelRef.current.rotation.y = elapsedTime * 0.2;

      // Animação de "flutuação" (oscilar suavemente)
      modelRef.current.position.y = position[1] + Math.sin(elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <Suspense fallback={null}>
      <ThreeModelViewer
        ref={modelRef}
        glbPath={glbPath}
        position={position}
        rotation={rotation}
      />
    </Suspense>
  );
};

const NextSection = ({ productName = 'CÂMARA FRIA' }) => {
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const product = productDetails[productName];

  useEffect(() => {
    const aboutSection = document.querySelector('#about-section');
    const descriptionSection = document.querySelector('#description-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === 'about-section') {
            setIsAboutVisible(true);
          } else if (entry.isIntersecting && entry.target.id === 'description-section') {
            setIsDescriptionVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (aboutSection) observer.observe(aboutSection);
    if (descriptionSection) observer.observe(descriptionSection);

    return () => {
      if (aboutSection) observer.unobserve(aboutSection);
      if (descriptionSection) observer.unobserve(descriptionSection);
    };
  }, []);

  return (
    <>
      {/* Seção "Sobre" */}
      <Element name="about-section" id="about-section">
        <Section>
          <Canvas
            shadows
            camera={{ position: [0, 2, 5], fov: 50 }}
          >
            {/* Adiciona múltiplas luzes */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 5, 5]} intensity={1} />
            <directionalLight position={[5, 5, -5]} intensity={1} />
            <directionalLight position={[-5, 5, -5]} intensity={1} />

            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} castShadow />

            {/* Renderiza o modelo 3D com animação */}
            <AnimatedModel
              glbPath={product.glbPath}
              position={[0, 5, -5]}
              rotation={[0, 5.5, 0]}
            />

            <ContactShadows position={[0, -0.7, 0]} opacity={0.6} scale={10} blur={1.5} far={4.5} />
          </Canvas>
          <Content>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isAboutVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <SubTitle>The Last of us</SubTitle>
              <Title>{`Sobre ${product.title}`}</Title>
              <Underline />
              <Text>{product.aboutText}</Text>
            </motion.div>
          </Content>
        </Section>
      </Element>




      {/* Seção "Descrição" */}
      <Element name="description-section" id="description-section">
        <Section2>
          <Content>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isAboutVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <SubTitle>Descrição</SubTitle>
              <Title>{`${product.Description}`}</Title>
              <Underline />
              <Text>{product.descriptionText}</Text>
            </motion.div>
          </Content>

          <Canvas
          
            shadows
            camera={{ position: [0, 2, 5], fov: 50 }}
          >
            {/* Adiciona múltiplas luzes */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, 5, 5]} intensity={1} />
            <directionalLight position={[5, 5, -5]} intensity={1} />
            <directionalLight position={[-5, 5, -5]} intensity={1} />

            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} castShadow />

            {/* Renderiza o modelo 3D com animação */}
            <AnimatedModel
              glbPath={product.glbPath}
              position={[0, 3, -3]}  // Posição específica para "Descrição"
              rotation={[0, 4.2, 0]}
            />

            <ContactShadows position={[0, -0.7, 0]} opacity={0.6} scale={10} blur={1.5} far={4.5} />
          </Canvas>
        </Section2>
      </Element>
    </>
  );
};

export default NextSection;

// Styled Components
const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background: linear-gradient(136deg, rgba(36,37,37,1) 0%, rgba(84,88,88,1) 35%, rgba(0,0,0,1) 100%);
  position: relative;
  padding: 0 100px;
`;

const Section2 = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-136deg, rgba(36,37,37,1) 0%, rgba(84,88,88,1) 35%, rgba(0,0,0,1) 100%);
  position: relative;
  padding: 0 100px;
`;

const Content = styled.div`
  width: 50%;
  padding-left: 10px;
`;

const SubTitle = styled.h3`
  font-family: 'Brmalls';
  font-size: 14px;
  font-weight: 300;
  text-transform: uppercase;
  color: #666666;
  letter-spacing: 4px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-family: 'Brmalls';
  font-size: 40px;
  font-weight: bold;
  color: #e0e0e0;
  text-align: center;
`;

const Underline = styled.div`
  width: 100px;
  height: 3px;
  background-color: #354A81;
  margin: 10px auto;
`;

const Text = styled.p`
  font-family: 'Brmalls';
  font-size: 18px;
  line-height: 1.5;
  color: #CBCACA;
  text-align: center;
  max-width: 600px;
  margin-top: 20px;
`;
