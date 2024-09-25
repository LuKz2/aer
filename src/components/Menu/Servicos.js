import React from 'react';
import styled from 'styled-components';
import Footer from '../../Screens/Home/Footer'; // Importando o Footer

const Servicos = () => {
  const services = [
    {
      title: 'Qualidade do Início ao Fim',
      description: 'Mantemos o controle total do processo de fabricação, do começo ao fim, para assegurar que cada sistema de refrigeração entregue esteja alinhado aos mais altos padrões de qualidade.',
      image: 'images/image/img1.jpg',
      altText: 'Qualidade do Início ao Fim'
    },
    {
      title: 'Consultoria e Projetos Personalizados',
      description: 'Oferecemos soluções sob medida para atender as demandas específicas de cada cliente, garantindo que cada projeto de refrigeração seja otimizado para suas necessidades.',
      image: 'images/image/img1.jpg',
      altText: 'Consultoria e Projetos Personalizados'
    },
    {
      title: 'Manutenção Preventiva e Corretiva',
      description: 'Nossos serviços de manutenção garantem que seus sistemas de refrigeração estejam sempre funcionando com a máxima eficiência, evitando problemas futuros e custos desnecessários.',
      image: 'images/image/img1.jpg',
      altText: 'Manutenção Preventiva e Corretiva'
    }
  ];

  const processSteps = [
    {
      step: '1. Consulta e Análise',
      description: 'Entendemos as necessidades específicas do cliente e analisamos as condições ideais para o projeto de refrigeração.',
      icon: 'images/icons/consulta.png'
    },
    {
      step: '2. Projeto e Planejamento',
      description: 'Desenvolvemos um projeto personalizado, levando em consideração o espaço, a eficiência energética e os requisitos técnicos.',
      icon: 'images/icons/projeto.png'
    },
    {
      step: '3. Instalação Profissional',
      description: 'Nossa equipe realiza a instalação com os mais altos padrões de qualidade, garantindo o funcionamento ideal do sistema.',
      icon: 'images/icons/instalacao.png'
    },
    {
      step: '4. Suporte e Manutenção',
      description: 'Oferecemos suporte contínuo e serviços de manutenção preventiva e corretiva para prolongar a vida útil dos sistemas.',
      icon: 'images/icons/suporte.png'
    }
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#000' }}>
      {/* Seção "História" */}
      <Section2 id="historia">
        <div style={{
          position: 'relative',
          backgroundImage: `url('images/image/img1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          textAlign: 'center'
        }}>
          {/* Overlay escuro */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1
          }}></div>

          {/* Texto focado */}
          <div style={{ zIndex: 2 }}>
            <h1 style={{
              fontSize: '4rem',
              marginBottom: '20px',
              fontWeight: 'bold',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)'
            }}>Serviços</h1>
          </div>
        </div>
      </Section2>

      {/* Conteúdo da seção "Servicos" */}
      <Section id="servicos">
        <SectionTitle>
          <img src="/images/logo/menu.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
          <h1>Serviços</h1>
        </SectionTitle>

        <ServiceContainer>
          {services.map((service, index) => (
            <ServiceItem key={index} reverse={index % 2 !== 0}>
              <ServiceText>
                <ServiceSubtitle>THE NATURAL CHOICE</ServiceSubtitle>
                <h3>{service.title}</h3>
                <Underline />
                <p>{service.description}</p>
              </ServiceText>
              <ServiceImage>
                <img src={service.image} alt={service.altText} />
              </ServiceImage>
            </ServiceItem>
          ))}
        </ServiceContainer>
      </Section>

      {/* Etapas do Processo */}
      <Section id="processo">
        <SectionTitle>
          <h1>Nosso Processo</h1>
        </SectionTitle>

        <ProcessContainer>
          {processSteps.map((step, index) => (
            <ProcessItem key={index}>
              <ProcessIcon>
                <img src={step.icon} alt={step.step} />
              </ProcessIcon>
              <h3>{step.step}</h3>
              <p>{step.description}</p>
            </ProcessItem>
          ))}
        </ProcessContainer>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Estilos para a sessão de "História" e "Serviços"
const Section = styled.section`
  min-height: 50vh;
  margin: 0;
  padding: 40px 50px;
  text-align: center;
`;

const Section2 = styled.section`
  /* Estilos personalizados para a seção de "História" */
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-left: 20px;
  }
`;

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 50px;
`;

const ServiceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  flex-wrap: wrap;
`;

const ServiceText = styled.div`
  max-width: 50%;
  text-align: left;

  h3 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    margin-top: 20px;
  }
`;

const ServiceSubtitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #666;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const Underline = styled.div`
  width: 100px;
  height: 3px;
  background-color: #0044cc;
  margin-top: 10px;
`;

const ServiceImage = styled.div`
  max-width: 45%;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const ProcessContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 50px;
`;

const ProcessItem = styled.div`
  width: 300px;
  padding: 20px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #0044cc;
  }

  p {
    font-size: 1.1rem;
  }
`;

const ProcessIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;

  img {
    width: 100%;
    height: auto;
  }
`;

export default Servicos;
