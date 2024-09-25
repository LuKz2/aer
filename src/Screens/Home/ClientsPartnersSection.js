import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick'; // Adiciona um carrossel com a biblioteca react-slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ClientsPartnersSection = () => {
    const sectionRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Animação de entrada
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    } else {
                        entry.target.classList.remove("is-visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const section = sectionRef.current;
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const clients = [
        {
            name: "Big bread",
            image: "/images/3d/bigbread.png",
            link: "https://www.instagram.com/bigbreadipiranga/"
        },
        {
            name: "Cepam",
            image: "/images/3d/cepam.jpg",
            link: "https://www.instagram.com/padocacepam/?hl=pt"
        },
        {
            name: "Carlo´s Bakery",
            image: "/images/3d/carlos.png",
            link: "https://carlosbakery.com.br/"
        },
        {
            name: "Padaria Colonial",
            image: "/images/3d/colonial.jpg",
            link: "https://www.instagram.com/colonialpadariaoficial/"
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        appendDots: dots => (
            <Dots>
                <ul> {dots} </ul>
            </Dots>
        ),
        customPaging: i => (
            <RectDotWrapper>
                <RectDot className={i === currentSlide ? 'slick-active' : ''} />
            </RectDotWrapper>
        ),
        beforeChange: (current, next) => setCurrentSlide(next),  // Atualiza o slide atual
    };

    return (
        <SectionContainer ref={sectionRef}>
            <Title>Nossos Clientes</Title>
            <SliderContainer>
                <Slider {...settings}>
                    {clients.map((client, index) => (
                        <ClientCard key={index} className="client-card">
                            <a href={client.link} target="_blank" rel="noopener noreferrer">
                                <ClientImage src={client.image} alt={client.name} />
                                <ClientName>{client.name}</ClientName>
                            </a>
                        </ClientCard>
                    ))}
                </Slider>
            </SliderContainer>
        </SectionContainer>
    );
};

export default ClientsPartnersSection;

// Styled Components

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionContainer = styled.div`
  padding: 60px 20px;
  background-color: #fff;
  color: #333;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease-out, transform 1s ease-out;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 80px;
  color: #333;
  text-transform: uppercase;
`;

const SliderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ClientCard = styled.div`
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ClientImage = styled.img`
  width: 150px;
  height: auto;
  margin: 0 auto;
  transition: transform 0.3s ease;

  ${ClientCard}:hover & {
    transform: scale(1.1);
  }
`;

const ClientName = styled.h3`
  font-size: 1.2rem;
  margin-top: 15px;
  color: #555;
  text-transform: uppercase;
  font-family: 'Brmalls';
`;

const Dots = styled.div`
  ul {
    display: flex;
    justify-content: center;
    padding: 10px;
  }

  li {
    margin: 0 8px;
    button {
      width: 30px;
      height: 10px;
      background-color: #bbb;  // Cor clara para o estado padrão
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #333;  // Cor mais escura ao passar o mouse
      }

      &.slick-active {
        background-color: #333;  // Cor mais escura quando ativo
      }
    }
  }
`;

const RectDotWrapper = styled.div`
  display: inline-block;
  margin: 0 8px;
`;

const RectDot = styled.div`
  width: 20px;
  height: 5px;
  background-color: #bbb;  // Cor clara no padrão
  border-radius: 1px;
  transition: background-color 0.3s ease;

  &.slick-active {  // Dot ativo
    background-color: #333;  // Fica mais escuro quando o slide está ativo
  }

  &:hover {
    background-color: #333;  // Fica mais escuro ao passar o mouse
  }
`;
