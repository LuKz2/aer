import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { ThreeModelViewer } from './modelglb/ThreeModelViewer'; // Seu modelo 3D
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Section = ({ title, description, leftBtn, rightBtn, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Card>
      <ImageWrapper>
        <Image src={image} alt={title} />
        <Overlay />
        <TextContent>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <ButtonGroup>
            <ActionButton>{leftBtn}</ActionButton>
            {rightBtn && <ActionButton secondary onClick={openModal}>{rightBtn}</ActionButton>}
          </ButtonGroup>
        </TextContent>
      </ImageWrapper>

      {isModalOpen &&
        ReactDOM.createPortal(
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={closeModal}>X</CloseButton>
              <ModalHeader>Vitrine - Medidas Reais</ModalHeader>

              {/* Modelo 3D */}
              <ThreeDModelContainer>
              <Canvas style={{ position: "absolute", margin: 0, left: 0, right: 0, top: -100, bottom: 0 }}>
                  <ambientLight intensity={2} />
                  <Environment preset="night" />
                  <OrbitControls
                    maxPolarAngle={Math.PI / 2}
                    minDistance={1}
                    maxDistance={3.5}
                    enablePan={false}
                    enableZoom={false}
                  />
                  <ThreeModelViewer />
                </Canvas>

              </ThreeDModelContainer>

              {/* Medidas do Produto */}
              <ProductInfo>
                <MeasureTitle>Medidas do Produto</MeasureTitle>
                <MeasureList>
                  <MeasureItem>Altura: 1.20m</MeasureItem>
                  <MeasureItem>Largura: 2.00m</MeasureItem>
                  <MeasureItem>Profundidade: 0.80m</MeasureItem>
                  <MeasureItem>Peso: 120kg</MeasureItem>
                </MeasureList>
              </ProductInfo>

              {/* Carrossel de Imagens */}
              <CarouselWrapper>
                <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlaySpeed={3000}
                  centerMode={false}
                  containerClass="container"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={{
                    desktop: {
                      breakpoint: { max: 3000, min: 1024 },
                      items: 3,
                      slidesToSlide: 3,
                    },
                    tablet: {
                      breakpoint: { max: 1024, min: 464 },
                      items: 2,
                      slidesToSlide: 2,
                    },
                    mobile: {
                      breakpoint: { max: 464, min: 0 },
                      items: 1,
                      slidesToSlide: 1,
                    },
                  }}
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                >
                  <CarouselImage src="/images/image/img1.jpg" alt="Medida 1" />
                  <CarouselImage src="/images/image/img1.jpg" alt="Medida 2" />
                  <CarouselImage src="/images/image/img1.jpg" alt="Medida 3" />
                </Carousel>
              </CarouselWrapper>
            </ModalContent>
          </ModalOverlay>,
          document.body
        )}
    </Card>
  );
};

export default Section;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #181414;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  max-width: 1000px;
  width: 90%;
  max-height: 90vh;
  height: auto;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: black;
  z-index: 1001; // Certifique-se de que o botão esteja acima de outros elementos

  &:hover {
    color: white;
  }
`;


const ModalHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: white;
`;

const ThreeDModelContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
`;

const ProductInfo = styled.div`
  margin-bottom: 20px;
`;

const MeasureTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: white;
`;

const MeasureList = styled.ul`
  list-style: none;
  padding: 0;
  color: white;
`;

const MeasureItem = styled.li`
  font-size: 16px;
  margin-bottom: 5px;
  color: white;
`;

const CarouselWrapper = styled.div`
  margin-top: 20px;
  overflow: visible;  /* Garantir que o overflow seja visível */
  position: relative; /* Certifique-se de que o posicionamento seja adequado */
`;

const CarouselImage = styled.img`
  width: 100%;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
  position: relative;
  z-index: 1;

  &:hover {
    transform: scale(1.3) translateY(-20px);
    z-index: 2000;  /* Garantir que a imagem fique sobre outros elementos */
  }
`;


const Card = styled.div`
  width: 80%;
  max-width: 700px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px auto;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  transition: transform 0.3s ease;

  ${ImageWrapper}:hover & {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 100%);
  border-radius: 20px;
`;

const TextContent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Description = styled.p`
  margin: 10px 0;
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const ActionButton = styled.button`
  background-color: ${props => (props.secondary ? 'transparent' : 'white')};
  color: ${props => (props.secondary ? 'white' : 'black')};
  border: ${props => (props.secondary ? '2px solid white' : 'none')};
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.9;
  }
`;
