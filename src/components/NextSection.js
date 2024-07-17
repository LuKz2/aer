import React, { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { Element } from 'react-scroll';

const NextSection = () => {
  const { scrollY } = useViewportScroll();
  const [sectionOffsetTop, setSectionOffsetTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    const section = document.querySelector('[name="details-section"]');
    if (section) {
      setSectionOffsetTop(section.offsetTop);
      setSectionHeight(section.clientHeight);
    }
  }, []);

  const textOpacity = useTransform(
    scrollY,
    [sectionOffsetTop - window.innerHeight / 2, sectionOffsetTop + sectionHeight / 2],
    [0, 1]
  );

  return (
    <Element name="details-section">
      <SectionContainer>
        <TextContainer>
          <Content
            as={motion.div}
            style={{ opacity: textOpacity }}
          >
            <Title>Sobre</Title>
            <Text>
              Projetado para atender ao exigente mercado de Açougues, a linha de expositores Chicago 3 é a expressão máxima de flexibilidade funcional e expositiva ideal.
            </Text>
          </Content>
        </TextContainer>
        <ImageContainer>
          <motion.div style={{ opacity: textOpacity }}>
            <Image src="/images/menu_images/render.jpg" alt="Image" />
          </motion.div>
        </ImageContainer>
      </SectionContainer>
    </Element>
  );
};

export default NextSection;

const SectionContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: white;
  font-family: 'Arial', sans-serif;
  text-align: left;
  color: #000;
  height: 100vh; /* Ocupa toda a altura da viewport */
`;

const Content = styled.div`
  max-width: 600px; /* Limita a largura do conteúdo */
  padding: 0 50px;
  z-index: 1; /* Garantir que o texto fique sobre a imagem */
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h2`
  font-family: 'Brmalls';
  font-size: 36px;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-family: 'Brmalls';
  font-size: 18px;
  line-height: 1.5;
`;
