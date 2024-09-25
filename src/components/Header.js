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

  // Estado para controlar a expansão dos subitens de "ACESSÓRIOS"
  const [isAccessoriesExpanded, setIsAccessoriesExpanded] = useState(false);
  const [isShelfExpanded, setIsShelfExpanded] = useState(false);

  const prod = useSelector(selectCars);
  const navigate = useNavigate();
  const hideTimeout = useRef(null);
  const itemRefs = useRef([]);
  const submenuContainerRef = useRef(null);

  const media = {
    0: '/images/videos/vitrine.mp4',
    1: '/images/image/img1.jpg',
    2: '/images/image/img2.jpg',
    3: '/images/image/img3.jpg',
  };

  const subItems = {
    "PRODUTOS": {
      'BALCÃO': ['BALCÃO PORTO HORIZONTAL', 'BALCÃO PORTO VERTICAL', 'ESPECIAIS'],
      'ESTANTES': ['DEPOSITO', 'HIGIENIZAÇÃO', 'ESTOCAGEM', 'CREMALHEIRAS'],
      'VITRINES': ['VITRINE PORTO GALICIA', 'VITRINE PORTO PARIS'],
      'EXPOSITORES': ['EXPOSITOR PORTO VISEU'],
      'MOBILIÁRIO': [
        'MESA',
        'BUFFET',
        'MESA COM PIA',
        'LAVADORA',
        'LAVATORIO',
        {
          name: 'PRATELEIRAS',
          subItems: ['PRATELEIRA 1', 'PRATELEIRA 2', 'PRATELEIRA 3'] // Subitens dentro de "PRATELEIRA"
        },
        {
          name: 'ACESSÓRIOS',
          subItems: ['ACESSÓRIO 1', 'ACESSÓRIO 2', 'ACESSÓRIO 3'] // Subitens dentro de "ACESSÓRIOS"
        }
      ]
    },
    "SOBRE NÓS": {},
    "SERVIÇOS": {},
    "CONTATO": {}
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
        setCurrentMedia(nextMedia);  // Atualiza a mídia após o fade-out terminar
        setFadeOut(false);  // Finaliza o fade-out
        setFadeIn(true);  // Inicia o fade-in imediatamente
      }, 200);  // Tempo para o fade-out (ajustado para 200ms)
    } else if (fadeIn) {
      timeout = setTimeout(() => {
        setFadeIn(false);  // Finaliza o fade-in após a nova mídia estar visível
      }, 200);  // Tempo para o fade-in (ajustado para 200ms)
    }
    return () => clearTimeout(timeout);
  }, [fadeOut, fadeIn, nextMedia, burgerStatus]);

  const handleSubItemClick = (subItem) => {
    if (subItem.name === 'ACESSÓRIOS') {
      // Alterna o estado de expansão de "ACESSÓRIOS"
      setIsAccessoriesExpanded(!isAccessoriesExpanded);
    } else if (subItem.name === 'PRATELEIRAS') {
      // Alterna o estado de expansão de "PRATELEIRA"
      setIsShelfExpanded(!isShelfExpanded);
    } else {
      // Lógica normal para subitens sem subitens adicionais
      handleNavigation('/product', subItem.name || subItem);
    }
  };


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

  const handleTextClick = (item) => {
    if (item === 'ACESSÓRIOS' || item === 'PRATELEIRAS') {
      return; // Não faça nada ao clicar diretamente em "ACESSÓRIOS" ou "PRATELEIRAS"
    } else if (item === 'SERVIÇOS') {
      handleNavigation('/servicos'); // Navega para serviços
    } else if (item === 'SOBRE NÓS') {
      handleNavigation('/equipe'); // Navega para sobre nós
    } else if (item === 'CONTATO') {
      handleNavigation('/contato'); // Navega para contato
    } else {
      // Se não for nenhum dos itens especiais, expande ou contrai o subitem
      if (expandedSubItem === item) {
        setExpandedSubItem(null); // Fecha o subitem se já estiver expandido
      } else {
        setExpandedSubItem(item); // Expande o subitem
      }
    }
  };
  
  

  const handleMenuToggle = () => {
    if (burgerStatus) {
      setShowLottie(true);
      setTimeout(() => {
        setBurgerStatus(false);
        setShowLottie(false);
        resetMenuState();
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
    resetMenuState();
  };

  const resetMenuState = () => {
    setHoveredItem(null);
    setMenuOpen(false);
    setExpandedSubItem(null);
    setLottiePosition(420);
    setLottieMoved(false);
    setShowContent(false);
    setMediaTransitionVisible(false);
    setIsAccessoriesExpanded(false); // Resetar expansão de "ACESSÓRIOS"
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

  const handleMediaMouseEnter = () => setShowButton(true);
  const handleMediaMouseLeave = () => setShowButton(false);
  const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

  const handleNavigation = (path, product = null, subProduct = null) => {
    if (!product) {
      // Se for um caminho sem produto (como "contato", "serviços", etc.), apenas navegue para a rota
      navigate(path);
    } else if ((product === 'ACESSÓRIOS' || product === 'PRATELEIRAS') && !subProduct) {
      console.log("Não navegar ao clicar em", product);
      return; // Sai da função sem navegar
    } else if (subProduct) {
      // Se for um subproduto de "ACESSÓRIOS" ou "PRATELEIRAS"
      const newPath = `/product/${encodeURIComponent(product)}/${encodeURIComponent(subProduct)}`;
      navigate(newPath);
    } else {
      // Se for outro produto principal
      const newPath = `${path}/${encodeURIComponent(product)}`;
      navigate(newPath);
    }
  
    setBurgerStatus(false);
    setShowLottie(false);
    resetMenuState();
    window.scrollTo(0, 0); // Reseta o scroll para o topo
  };
  
  
  

  return (
    <Container>
      <RightMenu>
        <MenuContainer onClick={handleMenuToggle}>
          <MenuIcon />
          <TextMenu><a>Menu</a></TextMenu>
        </MenuContainer>
      </RightMenu>

      <BurgerNav show={burgerStatus}>
        <MenuImage src="/images/logo/logomenu.png" alt="Menu Icon" />
        <TextMenu2><a>MENU</a></TextMenu2>
        {prod && prod.map((pro, index) => (
          <Li
            key={index}
            ref={el => itemRefs.current[index] = el}
            active={hoveredItem === index}
          >
            <a
              onMouseEnter={() => handleItemHover(index)}
              onMouseLeave={handleItemLeave}
              onClick={() => handleTextClick(pro)}  // Adiciona o onClick para navegação
              style={{ cursor: (pro === "SERVIÇOS" || pro === "CONTATO" || pro === "SOBRE NÓS") ? "pointer" : "default" }}
            >
              {pro}
            </a>
            <StyledArrow>
              {hoveredItem === index ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </StyledArrow>
          </Li>
        ))}

        <FooterImage src="/images/logo/menu.png" alt="Footer Image" />
      </BurgerNav>

      {showLottie && (
        <LottieContainer lottiePosition={lottiePosition} onClick={handleLottieClick}>
          <Lottie options={defaultOptions} height={50} width={50} />
        </LottieContainer>
      )}

      {mediaTransitionVisible && (
        <MediaTransitionContainer onMouseEnter={handleMediaMouseEnter} onMouseLeave={handleMediaMouseLeave} onMouseMove={handleMouseMove}>
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
            <SubItems show={hoveredItem !== null}>
              {subItems[prod[hoveredItem]] && (
                Object.entries(subItems[prod[hoveredItem]]).map(([subItemKey, subItemValue], subIndex) => (
                  <MenuItem
                    key={subIndex}
                    onMouseLeave={handleSubItemLeave}
                  >
                    <ItemWrapper onClick={() => setExpandedSubItem(subItemKey)}>
                      {/* Renderiza o nome do subItem (se for objeto, pega o 'name') */}
                      <span>{typeof subItemValue === 'object' && subItemValue.name ? subItemValue.name : subItemKey}</span>
                      <StyledArrow>
                        {expandedSubItem === subItemKey ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                      </StyledArrow>
                    </ItemWrapper>

                    {/* Renderiza os subitens se o item for expandido */}
                    {expandedSubItem === subItemKey && (
                      <NestedSubItems show={expandedSubItem === subItemKey}>
                        {Array.isArray(subItemValue) ? (
                          // Caso o subItem seja um array de strings ou objetos
                          subItemValue.map((nestedSubItem, nestedIndex) => (
                            typeof nestedSubItem === 'object' ? (
                              <>
                                {/* Renderiza o nome do subitem objeto */}
                                {/* Render "ACESSÓRIOS" with a click handler and an arrow */}
                                <MenuItem key={nestedIndex} onClick={() => handleSubItemClick(nestedSubItem)}>
                                  <ItemWrapper>
                                    <span>{nestedSubItem.name}</span>
                                    {/* Adiciona a seta ao lado direito de "ACESSÓRIOS" e "PRATELEIRA" */}
                                    {nestedSubItem.name === 'ACESSÓRIOS' && (
                                      <StyledArrow>
                                        {isAccessoriesExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                      </StyledArrow>
                                    )}
                                    {nestedSubItem.name === 'PRATELEIRAS' && (
                                      <StyledArrow>
                                        {isShelfExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                      </StyledArrow>
                                    )}
                                  </ItemWrapper>
                                </MenuItem>


                                {/* Renderiza os subitens dentro do objeto somente se estiver expandido */}
                                {nestedSubItem.name === 'ACESSÓRIOS' && isAccessoriesExpanded && (
                                  <NestedSubItems show={true}>
                                    {nestedSubItem.subItems.map((subNestedItem, subNestedIndex) => (
                                      <MenuItem
                                        key={subNestedIndex}
                                        onClick={() => handleNavigation('/product', 'ACESSÓRIOS', subNestedItem)}  // Passa o nome do subitem para ProductPage
                                      >
                                        <span>{subNestedItem}</span>
                                      </MenuItem>
                                    ))}
                                  </NestedSubItems>
                                )}

                                {nestedSubItem.name === 'PRATELEIRAS' && isShelfExpanded && (
                                  <NestedSubItems show={true}>
                                    {nestedSubItem.subItems.map((subNestedItem, subNestedIndex) => (
                                      <MenuItem
                                        key={subNestedIndex}
                                        onClick={() => handleNavigation('/product', 'PRATELEIRAS', subNestedItem)}  // Passa o nome do subitem para ProductPage
                                      >
                                        <span>{subNestedItem}</span>
                                      </MenuItem>
                                    ))}
                                  </NestedSubItems>
                                )}
                              </>
                            ) : (
                              // Renderiza se for uma string simples
                              <MenuItem
                                key={nestedIndex}
                                onClick={() => handleNavigation('/product', nestedSubItem)}  // Navega para ProductPage com o subitem simples
                              >
                                <span>{nestedSubItem}</span>
                              </MenuItem>
                            )
                          ))
                        ) : (
                          // Caso o subItem seja um objeto com 'subItems' (por exemplo, "ACESSÓRIOS")
                          subItemValue.subItems.map((subNestedItem, subNestedIndex) => (
                            <MenuItem
                              key={subNestedIndex}
                              onClick={() => handleNavigation('/product', 'ACESSÓRIOS', subNestedItem)}  // Garante que "ACESSÓRIOS" seja o produto e o subNestedItem seja o subProduto
                            >
                              <span>{subNestedItem}</span>
                            </MenuItem>
                          ))
                        )}
                      </NestedSubItems>
                    )}
                  </MenuItem>
                ))
              )}
            </SubItems>
          )}
        </SubItemsWrapper>
      </CombinedNav>

      <Overlay show={burgerStatus} onClick={handleMenuToggle} />
      <LogoContainer>
        <a href="/"><img src="/images/logo/header2.png" alt="Logo" style={{ width: '200px', height: 'auto', marginRight: 120 }} /></a>
      </LogoContainer>
    </Container>
  );
};

export default Header;

// Styled components
const fadeInAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOutAnimation = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const fadeInSlide = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeOutSlide = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
`;

const zoomIn = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.05); }
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
  z-index: 1001;
  background: linear-gradient(to bottom, rgba(36, 37, 37), rgba(0, 0, 0, 0));
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
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    background-color: transparent;
    transition: background-color 0.3s ease-in-out;
    z-index: -1;
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
`;

const TextMenu = styled.div`
  font-size: 14px;
  a {
    font-weight: 600;
    text-transform: uppercase;
    color: #fff;
    font-family: 'Ginza Heavy', sans-serif;
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
  font-family: 'Ginza Heavy', sans-serif;
  li {
    padding-top: 25px;
    a {
      font-weight: 600;
      font-family: 'Ginza Heavy', sans-serif;
      color: ${(props) => (props.active ? "#fff" : "#d4d4d4")};
    }
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
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    background-color: transparent;
    transition: background-color 0.3s ease-in-out;
    z-index: -1;
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
  display: flex;
  align-items: center;

  svg {
    transition: transform 0.3s ease;
  }

  &.expanded svg {
    transform: rotate(180deg);
  }
`;

const MenuImage = styled.img`
  width: 230px;
  height: auto;
  margin-left: 50px;
`;

const LottieContainer = styled.div`
  position: absolute;
  top: 20px;
  left: ${(props) => props.lottiePosition}px;
  z-index: 15;
  cursor: pointer;
`;

const MediaTransitionContainer = styled.div`
  position: fixed;
  top: 0;
  left: 800px;
  width: calc(100% - 800px);
  height: 100%;
  z-index: 5;
  background-color: black;
`;

const TransitionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.fadeIn || !props.fadeOut ? 1 : 0)};  // Garante que a imagem sempre fique visível
  animation: ${(props) => (props.fadeIn ? fadeInAnimation : props.fadeOut ? fadeOutAnimation : 'none')} 0.2s ease-in-out;
`;

const TransitionVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.fadeIn || !props.fadeOut ? 1 : 0)};  // Garante que o vídeo sempre fique visível
  animation: ${(props) => (props.fadeIn ? fadeInAnimation : props.fadeOut ? fadeOutAnimation : 'none')} 0.2s ease-in-out;
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

const FooterImage = styled.img`
  width: 12%;
  margin-top: auto;
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
  animation: ${fadeInAnimation} 0.5s ease-in-out;
`;

const HoverImage = styled.img`
  position: fixed;
  width: 380px;
  height: 200px;
  z-index: 1;
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
  padding-left: 30px;  // Faz o submenu (CÂMARA FRIA) ficar mais à direita, mas ainda abaixo do GABINETES
  margin-top: 5px;
  font-family: 'Brmalls';
   
  li {
    padding: 5px 0;
    color: #d4d4d4;
    cursor: pointer;
    
    &:hover {
      color: #fff;
    }
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;  // Adiciona o cursor de ponteiro ao passar o mouse
  font-family: 'Ginza Heavy', sans-serif;
`;

const MenuItem = styled.li`
  font-family: 'Brmalls';
  cursor: pointer;
  padding: 10px 0;
  margin-left: 0px;
  display: block;
`;

const NestedSubItems = styled.ul`
  list-style-type: none;
  padding-left: 20px;
  margin: 5px 0 5px 20px;
  max-height: ${(props) => (props.show ? '1000px' : '0')}; /* Garantir que os subitens sejam visíveis */
  overflow: hidden;
  transition: max-height 0.5s ease-out;
  li {
    padding: 5px 0;
    font-size: 13px;
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
