import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { KeyboardArrowRight, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { selectCars } from "../features/car/carSlice";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Lottie from "react-lottie";
import animationData from '../assets/lottie/X.json';

const Header = () => {
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [previousHoveredItem, setPreviousHoveredItem] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const [hoveredNestedSubItem, setHoveredNestedSubItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSubItem, setExpandedSubItem] = useState(null);
  const [showLottie, setShowLottie] = useState(false);
  const [lottiePosition, setLottiePosition] = useState(420);
  const [lottieMoved, setLottieMoved] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [nextMedia, setNextMedia] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [mediaTransitionVisible, setMediaTransitionVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prod = useSelector(selectCars);
  const navigate = useNavigate();
  const hideTimeout = useRef(null);
  const itemRefs = useRef([]);
  const submenuContainerRef = useRef(null);

  const media = {
    0: '/images/videos/vitrine.mp4', // Vídeo para "PRODUTOS"
    1: '/images/image/img1.jpg', // Imagem para "Item 1"
    2: '/images/image/img2.jpg', // Imagem para "Sobre Nós"
    3: '/images/image/img3.jpg', // Imagem para "Item 3"
  };

  const subItems = {
    "PRODUTOS": {
      'GABINETES': ['CÂMARA FRIA'],
      'MÁQUINAS': ['AR CONDICIONADO', 'CHILLER'],
      'BOX': ['BOX HZ', 'BOX VT', 'ESPECIAIS'],
      'ESTANTES': ['DEPOSITO', 'HIGIENIZAÇÃO', 'ESTOCAGEM', 'CREMALHEIRAS'],
      'EXPOSITORES': ['VITRINE', 'VISEU'],
      'MOBILIÁRIO': ['MESA', 'BUFFET', 'MESA COM PIA', 'LAVADORA', 'LAVATORIO', 'PRATELEIRA', 'ACESSÓRIOS']
    },
    "ASSISTENCIA TÉCNICA": {
      'SubItem 2.1': ['Acessar Sub Item A', 'Acessar Sub Item B', 'Acessar Sub Item C']
    },
    "SOBRE NÓS": {
      'Nossa História': [
        { name: 'Equipe', path: '/equipe' },
        { name: 'Missão', path: '/missao' },
        { name: 'Parceiros', path: '/parceiros' }
      ]
    },
    "Item 4": {
      'SubItem 4.1': ['Subitem 4.1', 'Subitem 4.2', 'Subitem 4.3']
    }
  };

  const handleItemHover = (index) => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setPreviousHoveredItem(hoveredItem);
    setHoveredItem(index);
    setMenuOpen(true);
    setShowLottie(true);
    setShowContent(true);
    setMediaTransitionVisible(true);

    if (!lottieMoved) {
      setLottiePosition(820);
      setLottieMoved(true);
    }

    if (currentMedia !== media[index]) {
      setNextMedia(media[index]);
      setFadeOut(true);
    } else {
      setCurrentMedia(media[index]);
      setFadeIn(true);
    }
  };

  useEffect(() => {
    let timeout;
    if (fadeOut) {
      timeout = setTimeout(() => {
        setCurrentMedia(nextMedia);
        setFadeOut(false);
        setFadeIn(true);
      }, 200);
    } else if (fadeIn) {
      timeout = setTimeout(() => {
        setFadeIn(false);
        if (!burgerStatus) {
          setMediaTransitionVisible(false);
        }
      }, 200);
    }
    return () => clearTimeout(timeout);
  }, [fadeOut, fadeIn, nextMedia, burgerStatus]);

  const handleItemLeave = () => {
    // Não fecha o menu ao sair do item principal
  };

  const handleSubItemHover = (subItem) => {
    setHoveredSubItem(subItem);
    setShowLottie(true);
  };

  const handleSubItemLeave = () => {
    setHoveredSubItem(null);
  };

  const handleNestedSubItemHover = (nestedSubItem) => {
    setHoveredNestedSubItem(nestedSubItem);
  };

  const handleNestedSubItemLeave = () => {
    setHoveredNestedSubItem(null);
  };

  const handleTextClick = (subItem) => {
    if (expandedSubItem === subItem) {
      setExpandedSubItem(null);
    } else {
      setExpandedSubItem(subItem);
    }
  };

  const handleMenuToggle = () => {
    if (burgerStatus) {
      setShowLottie(true);
      setTimeout(() => {
        setBurgerStatus(false);
        setShowLottie(false);
        setHoveredItem(null);
        setMenuOpen(false);
        setExpandedSubItem(null);
        setLottiePosition(420);
        setLottieMoved(false);
        setShowContent(false);
        setMediaTransitionVisible(false);
      }, 500);
    } else {
      setBurgerStatus(true);
      setShowLottie(true);
      setLottiePosition(420);
    }
  };

  const handleLottieClick = () => {
    setBurgerStatus(false);
    setShowLottie(false);
    setHoveredItem(null);
    setMenuOpen(false);
    setExpandedSubItem(null);
    setLottiePosition(420);
    setLottieMoved(false);
    setShowContent(false);
    setMediaTransitionVisible(false);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    if (burgerStatus && hoveredItem === null) {
      setHoveredItem(null);
      setMenuOpen(false);
      setShowContent(false);
    }
  }, [burgerStatus]);

  useEffect(() => {
    if (hoveredItem !== null && submenuContainerRef.current && itemRefs.current[hoveredItem]) {
      const itemOffsetTop = itemRefs.current[hoveredItem].offsetTop;
      submenuContainerRef.current.style.paddingTop = `${itemOffsetTop}px`;
    }
  }, [hoveredItem]);

  const handleMediaMouseEnter = () => {
    setShowButton(true);
  };

  const handleMediaMouseLeave = () => {
    setShowButton(false);
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleNavigation = (path, subItem) => {
    if (subItem) {
      navigate(`${path}/${subItem}`);
    } else {
      navigate(path);
    }
    setBurgerStatus(false);
    setShowLottie(false);
    setHoveredItem(null);
    setMenuOpen(false);
    setExpandedSubItem(null);
    setLottiePosition(420);
    setLottieMoved(false);
    setShowContent(false);
    setMediaTransitionVisible(false);
  };

  return (
    <Container>
      <RightMenu>
        <MenuContainer onClick={handleMenuToggle}>
          <MenuIcon />
          <TextMenu>
            <a>Menu</a>
          </TextMenu>
        </MenuContainer>
      </RightMenu>

      <BurgerNav show={burgerStatus}>
        <MenuImage src="/images/logo/logomenu.png" alt="Menu Icon" />
        <TextMenu2>
          <a>MENU</a>
        </TextMenu2>
        {prod && prod.map((pro, index) => (
          <React.Fragment key={index}>
            <Li
              onMouseEnter={() => handleItemHover(index)}
              onMouseLeave={handleItemLeave}
              active={hoveredItem === index}
              ref={el => itemRefs.current[index] = el}
            >
              <a>{pro}</a>
              <StyledArrow>
                {hoveredItem === index ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
              </StyledArrow>
            </Li>
          </React.Fragment>
        ))}
        <FooterImage src="/images/logo/menu.png" alt="Footer Image" />
      </BurgerNav>

      {showLottie && (
        <LottieContainer lottiePosition={lottiePosition} onClick={handleLottieClick}>
          <Lottie options={defaultOptions} height={50} width={50} />
        </LottieContainer>
      )}

      {mediaTransitionVisible && (
        <MediaTransitionContainer
          onMouseEnter={handleMediaMouseEnter}
          onMouseLeave={handleMediaMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {fadeIn && nextMedia && (
            typeof nextMedia === 'string' && nextMedia.endsWith('.mp4') ? (
              <TransitionVideo src={nextMedia} autoPlay loop muted fadeIn={fadeIn} />
            ) : (
              <TransitionImage src={nextMedia} fadeIn={fadeIn} />
            )
          )}
          {fadeOut && currentMedia && (
            typeof currentMedia === 'string' && currentMedia.endsWith('.mp4') ? (
              <TransitionVideo src={currentMedia} autoPlay loop muted fadeOut={fadeOut} />
            ) : (
              <TransitionImage src={currentMedia} fadeOut={fadeOut} />
            )
          )}
          {!fadeIn && !fadeOut && currentMedia && (
            typeof currentMedia === 'string' && currentMedia.endsWith('.mp4') ? (
              <TransitionVideo src={currentMedia} autoPlay loop muted />
            ) : (
              <TransitionImage src={currentMedia} />
            )
          )}
          {showButton && (
            <>
              <HoverImage src="/images/image/imgicon.png" style={{ top: mousePosition.y - 90, left: mousePosition.x - 190 }} />
              <HoverButton style={{ top: mousePosition.y - 8, left: mousePosition.x + 4 }}>
                Descubra mais
              </HoverButton>
            </>
          )}
        </MediaTransitionContainer>
      )}

      <CombinedNav show={menuOpen} ref={submenuContainerRef}>
        <SubItemsWrapper>
          {hoveredItem !== null && (
            <SubItems
              key={hoveredItem}
              onMouseEnter={() => {
                if (hideTimeout.current) {
                  clearTimeout(hideTimeout.current);
                  hideTimeout.current = null;
                }
              }}
              show={hoveredItem !== null}
            >
              {subItems[prod[hoveredItem]] && Object.entries(subItems[prod[hoveredItem]]).map(([subItem, nestedSubItems], subIndex) => (
                <li
                  key={subIndex}
                  onMouseEnter={() => handleSubItemHover(subItem)}
                  onMouseLeave={handleSubItemLeave}
                  style={{ opacity: 1 }}
                >
                  <ItemWrapper onClick={() => handleTextClick(subItem)}>
                    <span>{subItem}</span>
                    <StyledArrow>
                      {expandedSubItem === subItem ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                    </StyledArrow>
                  </ItemWrapper>
                  <NestedSubItems show={expandedSubItem === subItem}>
                    {nestedSubItems.map((nestedSubItem, nestedIndex) => (
                      <li
                        key={nestedIndex}
                        onMouseEnter={() => handleNestedSubItemHover(nestedSubItem)}
                        onMouseLeave={handleNestedSubItemLeave}
                        style={{ opacity: 1 }}
                        onClick={() => {
                          if (typeof nestedSubItem === 'object' && nestedSubItem.path) {
                            handleNavigation(nestedSubItem.path);
                          } else {
                            handleNavigation('/product', nestedSubItem);
                          }
                        }}
                      >
                        {nestedSubItem.name ? nestedSubItem.name : nestedSubItem}
                      </li>
                    ))}
                  </NestedSubItems>
                </li>
              ))}
            </SubItems>
          )}
        </SubItemsWrapper>
      </CombinedNav>

      <Overlay show={burgerStatus} onClick={handleMenuToggle} />
      <LogoContainer>
        <a href="/">
          <img src="/images/logo/header2.png" alt="Logo" style={{ width: '170px', height: 'auto', marginRight:100 }} />
        </a>
      </LogoContainer>
    </Container>
  );
};

export default Header;

// Estilos e animações
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.
  }
`;

const fadeInSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutSlide = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05); /* Ajuste a intensidade do zoom conforme necessário */
  }
`;

const Container = styled.div`
  min-height: 70px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: linear-gradient(to bottom, rgba(36,37,37), rgba(0, 0, 0, 0));
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuImage = styled.img`
  width: 230px;
  height: auto;
  margin-left: 50px;
`;

const TextMenu = styled.div`
  font-size: 14px;
  a {
    font-weight: 600;
    text-transform: uppercase;
    color: #fff;
    font-family: 'Brmalls';
    margin-left: 5px;
  }
`;

const TextMenu2 = styled.div`
  font-size: 15px;
  a {
    color: #fff;
    font-family: 'Ginza Heavy', sans-serif;
  }
`;

const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  z-index: 2;
  margin-left: 30px;
  margin-top: 20px;
`;

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  border-radius: 5px;
  bottom: 6px;
   right: -5px;
  &::after {
    content: '';
    position: absolute;
    top: -5px; /* Ajuste conforme necessário */
    bottom: -5px; /* Ajuste conforme necessário */
    left: -5px; /* Ajuste conforme necessário */
    right: -5px; /* Ajuste conforme necessário */
    background-color: transparent;
    transition: background-color 0.3s ease-in-out;
    z-index: -1; /* Certifique-se de que o fundo esteja atrás do texto/imagem */
    border-radius: 5px;
  }

  &:hover::after {
    background-color: #404040;
  }

  svg {
    width: 22px;
    height: 24px;
    color: #fff;
  }

  ${TextMenu} {
    margin-left: 5px;
    font-family: 'Brmalls';
  }
`;


const BurgerNav = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, rgba(14,14,14,1) 0%, rgba(14,14,14,1) 70%, rgba(20,20,20,1) 100%);
  width: 400px;
  z-index: 10;
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.2s ease-in;
  li {
    padding-top: 25px;
    a {
      font-weight: 600;
      font-family: 'Ginza Heavy', sans-serif;
      color: ${(props) => (props.active ? "#fff" : "#d4d4d4")};
    }
  }
`;

const CloseWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: -70px;
  z-index: 15;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LottieContainer = styled.div`
  position: absolute;
  top: 20px;
  left: ${(props) => props.lottiePosition}px;
  z-index: 15;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  backdrop-filter: ${(props) => (props.show ? "blur(5px)" : "none")};
  display: ${(props) => (props.show ? "block" : "none")};
`;

const CustomMenuContainer = styled.div`
  cursor: pointer;
  color: #fff;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    background-color: #404040;
    border-radius: 5px;
    padding: 5px;
  }
`;

const Li = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: ${(props) => (props.active ? 1 : 0.3)};
 border-radius: 5px;
  &::after {
    content: '';
    position: absolute;
    top: -5px; /* Ajuste conforme necessário */
    bottom: -5px; /* Ajuste conforme necessário */
    left: -5px; /* Ajuste conforme necessário */
    right: -5px; /* Ajuste conforme necessário */
    background-color: transparent;
    transition: background-color 0.3s ease-in-out;
    z-index: -1; /* Certifique-se de que o fundo esteja atrás do texto/imagem */
  }

  &:hover::after {
    
  }

  a {
    color: ${(props) => (props.active ? "#fff" : "#d4d4d4")};
  }

  &:hover a {
    color: #fff;
    opacity: 1;
  }
`;


const StyledArrow = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

const CombinedNav = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${(props) => (props.show ? "400px" : "-400px")};
  background: linear-gradient(90deg, rgba(14,14,14,1) 0%, rgba(14,14,14,1) 70%, rgba(20,20,20,1) 100%);
  width: 400px;
  z-index: 10;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: left 0.2s ease-in;
`;

const SubItemsWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubItems = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
  width: 100%;
  li {
    padding: 10px 0;
    font-family: 'Ginza Heavy', sans-serif;
    color: #d4d4d4;
    cursor: pointer;
    animation: ${fadeInSlide} 0.5s ease-out;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    &:hover {
      color: #fff;
      opacity: 1;
    }
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NestedSubItems = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  margin: 5px 0 5px 20px;
  max-height: ${(props) => (props.show ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.5s ease-out;
  li {
    padding: 5px 0;
    font-family: 'Ginza Heavy', sans-serif;
    color: #d4d4d4;
    cursor: pointer;
    animation: ${(props) => (props.show ? css`${fadeInSlide} 0.5s ease-out` : css`${fadeOutSlide} 0.5s ease-out`)};
    margin-right: 80px;
    text-align: start;
    &:hover {
      color: #fff;
      opacity: 1;
    }
  }
`;

const FooterImage = styled.img`
  width: 12%;
  margin-top: auto;
`;

const ProductTextWrapper = styled.div`
  margin: 10px 0;
`;

const ProductText = styled.div`
  height: auto;
  cursor: pointer;
  color: #fff;
  font-family: 'Ginza Heavy', sans-serif;
  &:hover {
    border: 0.1px solid #404040;
    background-color: #404040;
    border-radius: 10px;
    padding: 5px;
  }
`;

const ZoomImage = styled.img`
  animation: ${zoomIn} 20s infinite alternate;
`;

const MediaTransitionContainer = styled.div`
  position: fixed;
  top: 0;
  left: 800px;
  width: calc(100% - 800px);
  height: 100%;
  z-index: 5;
  background-color: black; /* Para garantir que o fundo não vaze */
`;

const TransitionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.fadeIn || props.fadeOut ? 0 : 1)};
  animation: ${(props) => (props.fadeIn ? fadeInAnimation : props.fadeOut ? fadeOutAnimation : 'none')} 0.2s ease-in-out;
`;

const TransitionVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.fadeIn || props.fadeOut ? 0 : 1)};
  animation: ${(props) => (props.fadeIn ? fadeInAnimation : props.fadeOut ? fadeOutAnimation : 'none')} 0.2s ease-in-out;
`;

const HoverButton = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const HoverImage = styled.img`
  position: fixed;
  width: 380px; /* Ajuste o tamanho da imagem conforme necessário */
  height: 200px; /* Ajuste o tamanho da imagem conforme necessário */
  z-index: 1;
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const zoomInOut = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;
