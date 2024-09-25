import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';

const productDetails = {
  'CÂMARA FRIA': {
    image: '/images/image/img1.jpg',
    descriptionText: 'Câmara fria games',
    modalContent: [
      {
        title: 'Diferenciais de Design',
        text: 'O design de vitrines refrigeradas e câmaras frias maximiza a visibilidade dos produtos, garantindo que os alimentos pareçam frescos e atraentes. A iluminação LED e vidros curvados aumentam a visibilidade, tornando os produtos mais atrativos.',
        image: '/images/menu_images/render.jpg'
      },
      {
        title: 'Eficiência e Sustentabilidade',
        text: 'Nossos produtos são projetados para eficiência energética, ajudando a reduzir os custos operacionais. Utilizamos materiais duráveis e sustentáveis que garantem longa vida útil dos produtos.',
        image: '/images/menu_images/vitrine.png'
      },
      {
        title: 'Flexibilidade de Configuração',
        text: 'Equipamentos personalizados para diferentes configurações de espaço, atendendo padarias de todos os tamanhos.',
        image: '/images/menu_images/vitrine2.png'
      }
    ]
  },
  'AR CONDICIONADO': {
    image: '/images/menu_images/render.jpg',
    descriptionText: 'Ar condicionado moderno',
    modalContent: [
      {
        title: 'Design e Estilo',
        text: 'O design moderno do ar condicionado proporciona um ambiente mais agradável, combinando eficiência com estilo.',
        image: '/images/menu_images/render.jpg'
      },
      {
        title: 'Tecnologia e Economia',
        text: 'Equipado com a mais alta tecnologia, o ar condicionado é altamente eficiente e contribui para uma redução no consumo de energia.',
        image: '/images/menu_images/vitrine.png'
      },
      {
        title: 'Controle Avançado',
        text: 'Controle de temperatura inteligente, oferecendo conforto e praticidade no uso diário.',
        image: '/images/menu_images/vitrine2.png'
      }
    ]
  }
};


const Design = () => {
  const { productName } = useParams();
  const { scrollYProgress } = useViewportScroll();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDesignVisible, setIsDesignVisible] = useState(false);

  const content = productDetails[productName] || { image: '', descriptionText: '', modalContent: [] };

  const backgroundOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0.5]);

  const openModal = () => {
    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 100);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsModalVisible(false);
      document.body.style.overflow = 'auto';
    }, 500);
  };

  useEffect(() => {
    const designSection = document.getElementById("design-section");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDesignVisible(true);
          observer.unobserve(designSection); // Desliga o observador para evitar múltiplas ativações
        }
      },
      {
        threshold: 0.2, // Ativa quando 20% da seção está visível
      }
    );

    if (designSection) {
      observer.observe(designSection);
    }

    return () => {
      if (designSection) observer.unobserve(designSection);
    };
  }, []);


  return (
    <SectionContainer id="design-section">
      <ContentContainer>
        <ImageContainer style={{ opacity: backgroundOpacity }}>
          <motion.img
            src={content.image}
            alt="Imagem"
            initial={{ opacity: 0, x: -100 }} // Começa fora da tela à esquerda
            animate={isDesignVisible ? { opacity: 1, x: 0 } : {}} // Anima para a posição correta
            transition={{ duration: 1 }} // Duração da animação
          />
        </ImageContainer>
        <TextContainer
          initial={{ x: '-100vw', opacity: 0 }}
          animate={isDesignVisible ? { x: 0, opacity: 1 } : {}} // Só anima quando a seção é visível
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <StyledTitle>Design</StyledTitle>
          <Description>{content.descriptionText}</Description>
          <LearnMoreButton
            as={motion.button}
            initial={{ x: '-100vw', opacity: 0 }}
            animate={isDesignVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: 'easeInOut', delay: 0.3 }}
            onClick={openModal}
          >
            <FiPlus size={20} style={{ marginRight: '10px' }} />
            Saiba mais
          </LearnMoreButton>
        </TextContainer>

      </ContentContainer>

      {isModalVisible && (
        <FullScreenModal
          initial={{ opacity: 0, y: '-100vh' }}
          animate={isModalOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: '-100vh' }}
          transition={{ duration: 0.5 }}
        >
          <CloseButton onClick={closeModal}>X</CloseButton>
          <ModalContent>
            {content.modalContent.map((section, index) => (
              <ModalSection key={index}>
                <ModalText>
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                </ModalText>
                <ModalImage src={section.image} alt={section.title} />
              </ModalSection>
            ))}
          </ModalContent>
        </FullScreenModal>
      )}
    </SectionContainer>
  );
};

export default Design;

// Styled Components
const FullScreenModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #fff;
  padding: 0 20px;
`;

const ModalText = styled.div`
  flex: 1;
  padding: 40px;
  h2 {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
  p {
    font-size: 1.4rem;
    line-height: 1.6;
  }
`;

const ModalImage = styled.img`
  flex: 1;
  width: 50%;
  height: 100%;
  object-fit: cover;
`;

const CloseButton = styled.button`
  position: fixed; 
  top: 80px;
  right: 50px;
  background-color: #242525;
  border: none;
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 1002;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #354A81;
  }
`;


const SectionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(90deg, rgba(25, 25, 25, 1) 0%, rgba(25, 25, 25, 1) 35%, rgba(58, 62, 62, 1) 100%);
  font-family: 'Ginza Heavy', sans-serif;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
`;

const ImageContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const TextContainer = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  text-align: left;
  padding-left: 150px;
`;

const StyledTitle = styled.h2`
  font-size: 8vw;
  margin-bottom: 20px;
  color: #ffffff;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  text-align: left;
  max-width: 600px;
  margin-left: 15px;
`;

const LearnMoreButton = styled.button`
  position: relative;
  margin-top: 20px;
  background-color: transparent;
  color: #ffffff; 
  border: 0.5px solid #ffffff;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.4s ease, background-color 0.4s ease;
  font-family: 'Brmalls';
  margin-left: 15px; 
  
  &:hover {
    color: #fff; 
    background-color: #797979;
  }
`;
