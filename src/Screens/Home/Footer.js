import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoColumn>
          <Logo src="/images/icon/logo.png" alt="Logo" />
          <SocialMedia>
            <a href="#"><FaFacebookF size={30} /></a>
            <a href="#"><FaInstagram size={30} /></a>
            <a href="#"><FaTwitter size={30} /></a>
            <a href="#"><FaYoutube size={30} /></a>
          </SocialMedia>
        </LogoColumn>

        <Column>
          <ColumnTitle>Suporte</ColumnTitle>
          <Link href="#">Fale Conosco</Link>
          <Link href="#">FAQ</Link>
          <Link href="#">Downloads</Link>
          <Link href="#">Localizar Revendedor</Link>
          <Link href="#">Registro de Produto</Link>
          <Link href="#">Peças Sobressalentes</Link>
        </Column>

        <Column>
          <ColumnTitle>Empresa</ColumnTitle>
          <Link href="#">Sobre a Empresa</Link>
          <Link href="#">Design</Link>
          <Link href="#">Carreiras</Link>
          <Link href="#">Notícias</Link>
          <Link href="#">Acesso Exclusivo</Link>
        </Column>

        <Column2>
          <NewsletterTitle>Assine para Atualizações</NewsletterTitle>
          <NewsletterForm>
            <Input type="email" placeholder="Digite seu e-mail" />
            <SubscribeButton>Inscrever-se</SubscribeButton>
          </NewsletterForm>
        </Column2>

        <Column>
          <ColumnTitle>Endereço e Contato</ColumnTitle>
          <Text>Rua Exemplo, 123</Text>
          <Text>Bairro Exemplo</Text>
          <Text>Cidade, Estado - CEP</Text>
          <Text>Telefone: (11) 1234-5678</Text>
          <Text>Email: contato@empresa.com</Text>
          <Text>Horário de Atendimento: Seg-Sex 9h às 18h</Text>
        </Column>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

// Styled Components

const FooterContainer = styled.footer`
  background-color: #242525;
  padding: 60px 90px;
  color: white;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%; /* Usando o espaço completo da tela */
  margin: 0 auto;
  gap: 60px; /* Aumenta o espaçamento entre as colunas */
  flex-wrap: nowrap;
  overflow-x: auto;
`;

const Column = styled.div`
  flex: 1;
  min-width: 220px;
  margin-bottom: 20px;
  text-align: left;

  @media (max-width: 768px) {
    margin-bottom: 40px;
    text-align: center;
  }
`;

const Column2 = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
  text-align: left;
  margin-right: 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
    text-align: center;
  }
`;

const LogoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 220px;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: white;
    transition: color 0.3s;

    &:hover {
      color: #354A81;
    }
  }
`;

const ColumnTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Link = styled.a`
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 10px;
  font-size: 1rem;
  transition: color 0.3s;

  &:hover {
    color: #354A81;
  }
`;

const NewsletterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const NewsletterForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
`;

const SubscribeButton = styled.button`
  background-color: #354A81;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e85454;
  }
`;

const Text = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 8px;
`;
