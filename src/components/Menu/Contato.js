import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faInfoCircle, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion'; // Importando framer-motion

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ativando o loading ao enviar o formulário
    setLoading(true);

    // Verificar reCAPTCHA automaticamente ao enviar o formulário
    if (window.grecaptcha) {
      window.grecaptcha.enterprise.ready(() => {
        window.grecaptcha.enterprise
          .execute('6LdIwzsqAAAAAOH9_jNMcfSVtXuYRRDmjVUh-uKo', { action: 'submit' })
          .then((token) => {
            setRecaptchaValue(token); // Salvando o token gerado
            enviarFormulario(token); // Enviando o formulário após a verificação
          })
          .catch((error) => {
            console.error('Erro no reCAPTCHA:', error);
            alert('Erro ao verificar o reCAPTCHA.');
            setLoading(false); // Desativar o loading em caso de erro
          });
      });
    } else {
      console.error('grecaptcha não foi carregado.');
      alert('Erro ao carregar o reCAPTCHA.');
      setLoading(false); // Desativar o loading em caso de erro
    }
  };

  const enviarFormulario = (token) => {
    // Enviar dados para o backend
    fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formData: formData,
        token: token, // Token gerado pelo ReCAPTCHA
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEmailEnviado(true); // Mostrar mensagem de sucesso
          setLoading(false); // Desativar o loading
          // Mostrar mensagem de sucesso por alguns segundos e remover com fade out
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            setEmailEnviado(false); // Remove o escuro gradualmente
          }, 4000); // Exibe por 4 segundos
        } else {
          alert('Falha ao enviar o e-mail.');
          setLoading(false); // Desativar o loading após a resposta
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Erro ao enviar o e-mail.');
        setLoading(false); // Desativar o loading em caso de erro
      });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}  // Começa invisível
        animate={{ opacity: 1 }}   // Faz a transição para visível
        transition={{ duration: 1.5 }} // Transição suave de 1.5 segundos
        style={{ fontFamily: 'Arial, sans-serif', color: '#000' }}
      >
        {/* Seção "História" com imagem de fundo */}
        <Section2 id="historia">
          <motion.div
            initial={{ opacity: 0 }} // Apenas opacidade (sem movimento vertical)
            animate={{ opacity: 1 }}  // Aumenta opacidade para 1
            transition={{ duration: 1.5 }}  // Duração da animação
            style={{
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
            }}
          >
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

            {/* Texto focado com efeito fade-in */}
            <motion.div
              initial={{ opacity: 0 }} // Apenas opacidade
              animate={{ opacity: 1 }}  // Aumenta a opacidade para 1
              transition={{ duration: 2 }} // Transição suave e mais lenta que a imagem
              style={{ zIndex: 2 }}
            >
              <h1 style={{
                fontSize: '4rem',
                marginBottom: '20px',
                fontWeight: 'bold',
                textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)'
              }}>Contato</h1>
            </motion.div>
          </motion.div>
        </Section2>

        {/* Formulário de Contato com animação */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}  // Começa invisível e com escala reduzida
          animate={{ opacity: 1, scale: 1 }}    // Transição para visível e escala normal
          transition={{ duration: 1, delay: 0.5 }} // Atraso de 0.5s e duração de 1s
        >
          <ContactSection>
            <h2>Gostaria de tirar alguma dúvida?</h2>
            <p>Entre em contato com a nossa equipe e saiba mais.</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">
                  <FontAwesomeIcon icon={faUser} /> Nome: <span>*</span>
                </label>
                <input type="text" id="nome" placeholder="Digite o seu nome..." onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="empresa">
                  <FontAwesomeIcon icon={faUser} /> Empresa: <span>*</span>
                </label>
                <input type="text" id="empresa" placeholder="Digite o nome de sua empresa..." onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} /> E-mail: <span>*</span>
                </label>
                <input type="email" id="email" placeholder="Informe um e-mail para contato" onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">
                  <FontAwesomeIcon icon={faPhone} /> Telefone:
                </label>
                <input type="tel" id="telefone" placeholder="(00) 0000-0000" onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="assunto">
                  <FontAwesomeIcon icon={faInfoCircle} /> Assunto: <span>*</span>
                </label>
                <select id="assunto" onChange={handleChange} required>
                  <option value="">Selecione...</option>
                  <option value="duvida">Dúvida</option>
                  <option value="suporte">Suporte</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="mensagem">
                  <FontAwesomeIcon icon={faPencilAlt} /> Mensagem: <span>*</span>
                </label>
                <textarea id="mensagem" rows="6" placeholder="Digite a sua mensagem..." onChange={handleChange} required></textarea>
              </div>

              <div className="form-group form-privacy">
                <input type="checkbox" id="privacy" required />
                <label htmlFor="privacy">Li e concordo com os termos de Política de Privacidade.</label>
              </div>

              <button type="submit">Enviar</button>
            </form>
          </ContactSection>
        </motion.div>
      </motion.div>

      {/* Loading e Mensagem de Sucesso */}
      {loading && (
        <Overlay>
          <LoadingAnimation>
            <motion.img
              src="/images/logo/menu.png" // Substitua com o caminho da imagem de loading
              alt="Loading..."
              animate={{ opacity: [0.3, 1, 0.3] }} // Efeito de opacidade indo e voltando
              transition={{ repeat: Infinity, duration: 1 }} // Repetindo para sempre
            />
          </LoadingAnimation>
        </Overlay>
      )}

      {emailEnviado && showSuccessMessage && (
        <FadeOverlay
          initial={{ opacity: 0 }}  // Começa invisível
          animate={{ opacity: 1 }}   // Faz a transição para visível
          exit={{ opacity: 0 }}      // Sai com fade-out
          transition={{ duration: 1 }} // Duração do fade-in/out
        >
          <SuccessMessage>
            <h2>E-mail enviado com sucesso!</h2>
            <p>Entraremos em contato em breve.</p>
          </SuccessMessage>
        </FadeOverlay>
      )}
    </>
  );
};

// Estilos personalizados
const Section2 = styled.section`
  /* Estilos personalizados para a seção de "História" */
`;

const ContactSection = styled.section`
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
    align-items: center;
  }

  .form-group {
    display: contents;
  }

  label {
    font-size: 1rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  input, select {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    background-color: transparent;
    height: 40px;
  }

  textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
  }

  button {
    grid-column: span 2;
    padding: 10px 20px;
    background-color: #004d00;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #006600;
  }

  .g-recaptcha {
    grid-column: span 2;
  }

  .form-privacy {
    grid-column: span 2;
    display: flex;
    align-items: center;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  label[for="privacy"] {
    font-size: 0.9rem;
  }

  svg {
    margin-right: 10px;
  }
`;

// Estilos para o overlay de loading e mensagem de sucesso
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Escurece a tela */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const FadeOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Escurece a tela */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingAnimation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessMessage = styled.div`
  text-align: center;
  color: #fff;

  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
  }
`;

export default Contato;
