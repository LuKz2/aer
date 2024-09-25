import React, { useState } from 'react';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

const UpdatesSection = () => {
  const updates = [
    {
      title: "Lançamento do WHATSZAP 2",
      description: "A AER acaba de lançar uma nova versão do WHATSZAP com mais funcionalidades e melhor performance. Com uma interface simplificada e melhorias na usabilidade, esta versão promete transformar a forma como as pessoas interagem com a nossa tecnologia.",
      date: "25 de Agosto de 2024",
      image: "/images/menu_images/render.jpg",
      tags: ["Novidade", "Tecnologia"]
    },
    {
      title: "Parceria com a FrioTec",
      description: "A AER estabeleceu uma parceria com a FrioTec para desenvolver novas soluções em refrigeração. Essa colaboração visa o desenvolvimento de tecnologias mais sustentáveis e eficientes para o setor.",
      date: "15 de Agosto de 2024",
      image: "/images/menu_images/render.jpg",
      tags: ["Parceria", "Soluções"]
    },
    {
      title: "Novos Produtos para Refrigeração",
      description: "Novas câmaras frigoríficas e sistemas de refrigeração foram adicionados ao nosso catálogo. Esses novos produtos visam atender às mais altas demandas de eficiência energética e sustentabilidade.",
      date: "10 de Agosto de 2024",
      image: "/images/menu_images/render.jpg",
      tags: ["Produtos", "Refrigeração"]
    }
  ];

  return (
    <UpdatesContainer>
      <Fade bottom cascade>
        <SectionTitle>Atualizações</SectionTitle>

        {updates.map((update, index) => (
          <UpdateRow key={index}>
            <UpdateImageWrapper>
              <UpdateImage src={update.image} alt={update.title} />
            </UpdateImageWrapper>
            <UpdateContent>
              <UpdateDate>{update.date}</UpdateDate>
              <UpdateTags>
                {update.tags.map((tag, idx) => (
                  <Tag key={idx}>{tag}</Tag>
                ))}
              </UpdateTags>
              <UpdateTitle>{update.title}</UpdateTitle>
              <ReadMore update={update} />
            </UpdateContent>
          </UpdateRow>
        ))}
      </Fade>
    </UpdatesContainer>
  );
};

const ReadMore = ({ update }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <DescriptionContainer>
        <Fade collapse when={isExpanded}>
          <Description>{update.description}</Description>
        </Fade>
      </DescriptionContainer>
      <ReadMoreButton onClick={toggleDescription}>
        {isExpanded ? 'Ler Menos' : 'Ler Mais'}
      </ReadMoreButton>
    </div>
  );
};

export default UpdatesSection;

// Styled Components

const UpdatesContainer = styled.div`
  padding: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: left;
  margin-bottom: 150px;
  transform: translateY(-20px); /* Subindo o texto */
`;

const UpdateRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 60px;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 40px;
  position: relative; /* Para facilitar o posicionamento da data */
`;

const UpdateImageWrapper = styled.div`
  width: 50%;
  padding-right: 20px;
`;

const UpdateImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const UpdateContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const UpdateDate = styled.p`
  font-size: 0.9rem;
  color: #888;
  position: absolute;
  margin-top: -80px; /* Ajuste a altura conforme necessário */
`;

const UpdateTags = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const Tag = styled.span`
  background-color: #e6e6e6;
  color: #333;
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 20px;
`;

const UpdateTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 15px;
  text-align: left;
`;

const ReadMoreButton = styled.button`
  background-color: white;
  border: 1px solid black;
  color: black;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const DescriptionContainer = styled.div`
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #444;
  text-align: left; /* Alinhamento à esquerda */
  margin-top: 0;
`;
