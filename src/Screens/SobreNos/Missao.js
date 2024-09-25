import React, { useState } from 'react';
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { FaStar, FaRocket, FaRegLightbulb, FaAward } from 'react-icons/fa';

const Missao = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <div style={styles.videoContainer}>
          <video autoPlay loop muted style={styles.video}>
            <source src="/images/videos/vitrine.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div style={styles.contentContainer}>
          <div style={styles.logoTextContainer}>
            <img src="/images/logo/menu.png" alt="Logo" style={styles.logo} />
            <span style={styles.logoText}>Sobre nós</span>
          </div>
          <div style={styles.textContainer}>
            <h1 style={styles.heading}>Missão</h1>
            <p style={styles.paragraph}>
              Nossa missão é proporcionar serviços de alta qualidade e inovadores para nossos clientes, promovendo um ambiente sustentável e inclusivo.
            </p>
          </div>
          <div
            style={styles.imageContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src="/images/image/img3.jpg"
              alt="Imagem da Missão"
              style={isHovered ? { ...styles.image, ...styles.imageHover } : styles.image}
            />
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <h2 style={styles.subheading}>História e Marcos</h2>
        <VerticalTimeline>
          {/* 1990 - 2000 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="1990"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<FaStar />}
          >
            <h3 className="vertical-timeline-element-title">Início das Atividades</h3>
            <p>Assistência Técnica</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
            date="1994"
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<FaRocket />}
          >
            <h3 className="vertical-timeline-element-title">Câmara Frigorífica</h3>
            <p>Em Painel Modular</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(76, 175, 80)' }}
            date="1995"
            iconStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
            icon={<FaRegLightbulb />}
          >
            <h3 className="vertical-timeline-element-title">Rack de Compressores</h3>
            <p>Em Paralelo</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(255, 152, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(255, 152, 0)' }}
            date="1998"
            iconStyle={{ background: 'rgb(255, 152, 0)', color: '#fff' }}
            icon={<FaAward />}
          >
            <h3 className="vertical-timeline-element-title">Rack de Compressores</h3>
            <p>Descarga Única, Sucção Dividida</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
            date="1999"
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<FaRocket />}
          >
            <h3 className="vertical-timeline-element-title">Sistema de Ultra Congelamento</h3>
            <p>Contínuo</p>
          </VerticalTimelineElement>

          {/* 2000 - 2010 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="2001"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<FaStar />}
          >
            <h3 className="vertical-timeline-element-title">Sistema de Refrigeração</h3>
            <p>Em Cascata para Congelados</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
            date="2002"
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<FaRocket />}
          >
            <h3 className="vertical-timeline-element-title">Sistema de Monitoramento Remoto</h3>
            <p>Para Refrigeração</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(76, 175, 80)' }}
            date="2003"
            iconStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
            icon={<FaRegLightbulb />}
          >
            <h3 className="vertical-timeline-element-title">Sistema de Recuperação de Calor</h3>
            <p>Água Quente</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(255, 152, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(255, 152, 0)' }}
            date="2006"
            iconStyle={{ background: 'rgb(255, 152, 0)', color: '#fff' }}
            icon={<FaAward />}
          >
            <h3 className="vertical-timeline-element-title">Refrigerador Vertical</h3>
            <p>Com Portas de Vidro Duplo</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
            date="2008"
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<FaRocket />}
          >
            <h3 className="vertical-timeline-element-title">Refrigerador Modular Horizontal</h3>
            <p>Com Portas de Vidro Duplo</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(76, 175, 80)' }}
            date="2009"
            iconStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
            icon={<FaRegLightbulb />}
          >
            <h3 className="vertical-timeline-element-title">Expositor de Bolos Giratório</h3>
            <p>Refrigerado/Congelado sem Divisória Térmica</p>
          </VerticalTimelineElement>

          {/* 2010 - 2020 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
            date="2011"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<FaStar />}
          >
            <h3 className="vertical-timeline-element-title">Sistema Hidronico Modular</h3>
            <p>(Chiller)</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
            date="2012"
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<FaRocket />}
          >
            <h3 className="vertical-timeline-element-title">Linha de Vitrines Refrigeradas</h3>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(76, 175, 80)' }}
            date="2016"
            iconStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
            icon={<FaRegLightbulb />}
          >
            <h3 className="vertical-timeline-element-title">Linha de Vitrines Refrigeradas</h3>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(255, 152, 0)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(255, 152, 0)' }}
            date="2018"
            iconStyle={{ background: 'rgb(255, 152, 0)', color: '#fff' }}
            icon={<FaAward />}
          >
            <h3 className="vertical-timeline-element-title">Linha de Expositores e Vitrines</h3>
            <p>Linha Leiria</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
            date="2019"
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<FaRocket />}
          >
            <h3 className="vertical-timeline-element-title">Linha de Mobiliário em Aço Inox</h3>
            <p>Estampado Pré-Montado</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
            contentArrowStyle={{ borderRight: '7px solid  rgb(76, 175, 80)' }}
            date="2020"
            iconStyle={{ background: 'rgb(76, 175, 80)', color: '#fff' }}
            icon={<FaRegLightbulb />}
          >
            <h3 className="vertical-timeline-element-title">Vending Machine Via Moti/App</h3>
            <p>Refrigerada e Seca</p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </main>
    </div>
  );
};

const styles = {
  pageContainer: {
    background: 'linear-gradient(rgba(25,25,25,1) 0%, rgba(25,25,25,1) 35%, rgba(58,62,62,1) 100%)',
    minHeight: '200vh',
    color: '#fff',
  },
  header: {
    textAlign: 'center',
    position: 'relative',
  },
  logoTextContainer: {
    display: 'flex',
    alignItems: 'center',
    top: '430px',
    left: '30px',
    position: 'absolute',
  },
  logo: {
    width: '50px',
    height: '50px',
  },
  logoText: {
    marginLeft: '10px',
    fontSize: '1.2em',
    color: '#000',
  },
  videoContainer: {
    width: '100%',
    height: '400px',
    marginBottom: '0',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0',
    marginTop: '0',
    width: '100%',
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    padding: '20px',
    color: '#000',
    textAlign: 'left',
  },
  imageContainer: {
    flex: 1,
    margin: '0',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    display: 'block',
    transition: 'transform 10s ease',
    width: '100%',
    height: 'auto',
  },
  imageHover: {
    transform: 'scale(1.1)',
  },
  heading: {
    margin: '0 auto',
    maxWidth: '600px',
    fontSize: '2.5em',
    textAlign: 'left',
    fontFamily: 'Brmalls',
  },
  paragraph: {
    maxWidth: '600px',
    margin: '0 auto',
    fontSize: '1.2em',
    textAlign: 'left',
    fontFamily: 'Brmalls',
  },
  main: {
    padding: '20px',
    marginTop: '50px',
    position: 'relative',
  },
  subheading: {
    textAlign: 'center',
    marginTop: '50px',
    marginBottom: 50,
  },
  timelineElement: {
    marginBottom: '200px',
  },
  '@media (max-width: 768px)': {
    header: {
      top: '50px',
    },
    main: {
      top: '50px',
      marginTop: '100px',
    },
    paragraph: {
      padding: '0 10px',
    },
    subheading: {
      marginTop: '30px',
    },
    timelineElement: {
      marginBottom: '60px',
    },
    contentContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    textContainer: {
      paddingRight: '0',
      marginBottom: '20px',
      textAlign: 'left',
    },
    imageContainer: {
      width: '100%',
    },
    image: {
      width: '100%',
    },
  },
};

export default Missao;
