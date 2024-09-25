import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { GoDownload } from "react-icons/go";

const Vitrine = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Estado para controlar a animação de fechamento
  const [hasAnimated, setHasAnimated] = useState(false); // Estado para garantir que a animação seja executada apenas uma vez
  const sectionRef = useRef(null); // Referência para a seção da galeria

  const openModal = () => {
    setIsModalOpen(true);
    setIsClosing(false); // Certificar de que não está fechando ao abrir
  };

  const closeModal = () => {
    setIsClosing(true); // Começar a animação de fechamento
    setTimeout(() => {
      setIsModalOpen(false); // Fechar o modal após a animação
    }, 500); // O tempo da animação deve ser o mesmo que o da animação CSS
  };

  // JSON com informações reais sobre a vitrine refrigerada
  const vitrineData = {
    title: "ESPECIFICAÇÕES DA VITRINE REFRIGERADA",
    generalInformation: [
      { title: "DIMENSÕES", value: "2.00m (Largura) x 0.80m (Profundidade) x 1.20m (Altura)" },
      { title: "CAPACIDADE", value: "500 Litros" },
      { title: "TEMPERATURA", value: "-2°C a 8°C" },
      { title: "CONSUMO DE ENERGIA", value: "2.5 kWh/dia" },
      { title: "TIPO DE REFRIGERAÇÃO", value: "Refrigeração Ventilada" },
      { title: "MATERIAL", value: "Aço inoxidável" },
      { title: "GARANTIA", value: "12 meses" }
    ],
    additionalInformation: {
      material: "Aço Inoxidável",
      energyConsumption: "2.5 kWh/dia",
      temperatureRange: "-2°C a 8°C",
      compressorPower: "1.5 HP" // Novo item adicionado
    },
    dimensions: {
      height: "1.20m",
      width: "2.00m",
      depth: "0.80m",
      weight: "120kg"
    },
    downloadableImage: "/images/image/img2.jpg"
  };

  // Monitorar visibilidade da seção
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) { 
          setHasAnimated(true); // A animação será executada uma única vez
        }
      },
      {
        threshold: 0.2, // Defina o quanto da seção precisa estar visível para disparar o evento
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <SectionContainer ref={sectionRef} className={hasAnimated ? 'visible' : ''}>
      {/* Parte externa com especificações */}
      <Title>{vitrineData.title}</Title>
      <ContentContainer>
        {vitrineData.generalInformation.map((item, index) => (
          <Row key={index}>
            <TitleCell>{item.title}</TitleCell>
            <ValueCell>{item.value}</ValueCell>
          </Row>
        ))}
      </ContentContainer>
      <ExpandButton onClick={openModal}>Expandir todas as Especificações</ExpandButton>

      {isModalOpen &&
        ReactDOM.createPortal(
          <ModalOverlay className={isClosing ? 'closing' : ''}>
            <ModalContent className={isClosing ? 'closing' : ''}>
              <CloseButton onClick={closeModal}>X</CloseButton>

              {/* Título centralizado */}
              <ModalHeader>FICHA TÉCNICA</ModalHeader>

              <ModalBody>
                <LeftColumn>
                  {/* Imagem do produto à esquerda */}
                  <ImageWrapper>
                    <ModalImage src="/images/image/img1.jpg" alt="Imagem do Produto" />
                  </ImageWrapper>

                  {/* Informações adicionais abaixo da imagem */}
                  <InfoWrapper>
                    <InfoSectionTitle>Informações Adicionais</InfoSectionTitle>
                    <InfoGrid>
                      <InfoItem>
                        <InfoTitle>Material:</InfoTitle>
                        <InfoValue>{vitrineData.additionalInformation.material}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Consumo de Energia:</InfoTitle>
                        <InfoValue>{vitrineData.additionalInformation.energyConsumption}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Faixa de Temperatura:</InfoTitle>
                        <InfoValue>{vitrineData.additionalInformation.temperatureRange}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Potência do Compressor:</InfoTitle> {/* Exibição do novo item */}
                        <InfoValue>{vitrineData.additionalInformation.compressorPower}</InfoValue>
                      </InfoItem>
                    </InfoGrid>
                  </InfoWrapper>

                </LeftColumn>

                {/* Coluna direita contendo dimensões do produto e imagem para download */}
                <RightColumn>
                  <InfoWrapper>
                    <InfoSectionTitle>Dimensões do Produto</InfoSectionTitle>
                    <InfoGrid>
                      <InfoItem>
                        <InfoTitle>Altura:</InfoTitle>
                        <InfoValue>{vitrineData.dimensions.height}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Largura:</InfoTitle>
                        <InfoValue>{vitrineData.dimensions.width}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Profundidade:</InfoTitle>
                        <InfoValue>{vitrineData.dimensions.depth}</InfoValue>
                      </InfoItem>
                      <InfoItem>
                        <InfoTitle>Peso:</InfoTitle>
                        <InfoValue>{vitrineData.dimensions.weight}</InfoValue>
                      </InfoItem>
                    </InfoGrid>
                  </InfoWrapper>

                  {/* Imagem para download com ícone sobreposto */}
                  <DownloadableImageWrapper>
                    <DownloadableImage src={vitrineData.downloadableImage} alt="Downloadable Image" />
                    <DownloadIconWrapper href={vitrineData.downloadableImage} download="vitrine-details.png">
                      <GoDownload size={30} color="white" />
                    </DownloadIconWrapper>
                  </DownloadableImageWrapper>

                </RightColumn>
                <VerticalText>DATASHEET</VerticalText>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>,
          document.body
        )}
    </SectionContainer>
  );
};

export default Vitrine;

// Styled Components

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  font-family: 'Arial', sans-serif;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
    animation: ${fadeIn} 0.5s ease forwards;
  }

  /* Adiciona mais espaçamento no final da página */
  margin-bottom: 10vh; /* Aumenta o espaço para rolar mais para baixo */
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  margin-top: 100px; /* Mover a seção mais para baixo */
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 800px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const TitleCell = styled.div`
  font-weight: bold;
  color: #333;
  flex: 1;
  text-align: left;
`;

const ValueCell = styled.div`
  color: #555;
  flex: 1;
  text-align: right;
`;

const ExpandButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #555;
  }
`;

/* Animações do Modal */
const fadeInOverlay = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const fadeOutOverlay = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0.8);
  }
  to {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const fadeInContent = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutContent = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeInOverlay} 0.5s ease-in-out forwards;
  
  &.closing {
    animation: ${fadeOutOverlay} 0.5s ease-in-out forwards;
  }
`;

const ModalContent = styled.div`
  background-color: #1a1a1a;
  padding: 40px;
  border-radius: 10px;
  max-width: 1000px;
  width: 90%;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  position: relative;
  animation: ${fadeInContent} 0.5s ease-in-out forwards;

  &.closing {
    animation: ${fadeOutContent} 0.5s ease-in-out forwards;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #ff5555;
  }
`;

const ModalHeader = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  display: flex;
  gap: 20px;
`;

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 300px;
  border-radius: 10px;
`;

const InfoWrapper = styled.div`
  margin-top: 20px;
`;

const InfoSectionTitle = styled.h3`
  font-size: 22px;
  text-align: left;
  margin-bottom: 10px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: #222;
  padding: 10px;
  border-radius: 8px;
`;

const InfoTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #ccc;
  text-align: left;
  align-items: center; /* Alinha o conteúdo verticalmente */
`;

const InfoValue = styled.div`
  font-size: 16px;
  color: white;
  align-items: center; /* Alinha o conteúdo verticalmente */
`;

const DownloadableImageWrapper = styled.div`
  position: relative;
  text-align: center;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Alinha o conteúdo verticalmente */
`;

const DownloadableImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 250px;
  border-radius: 10px;
  filter: brightness(70%);
`;

const DownloadIconWrapper = styled.a`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  cursor: pointer;
`;

const VerticalText = styled.div`
  writing-mode: vertical-rl; /* Texto em modo vertical */
  text-orientation: mixed; /* Faz o texto ser exibido corretamente */
  font-size: 12px;
  color: #ccc;
  letter-spacing: 10px; /* Espaçamento entre as letras */
  font-weight: bold;
  position: absolute;
  top: 78%;
  right: 30px; /* Ajuste conforme necessário */
  transform: translateY(-50%);
`;
