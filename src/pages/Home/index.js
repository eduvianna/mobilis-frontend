import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Header, Content } from './styles';

import logo_satc from '~/assets/logo-satc-horizontal.png';
import logo_mobilis from '~/assets/logo-mobilis.png';

export default function Home() {
  return (
    <Content>
      <Container>
        <Header>
          <img src={logo_satc} alt="SATC" width={280} />
          <img src={logo_mobilis} alt="MOBILIS" width={280} />
        </Header>
      </Container>
      <h1>SISTEMA DE MONITORAMENTO CARRO ELÉTRICO MOBILIS</h1>
      <h2>
        Este sistema foi desenvolvido com o intuito de realizar um monitoramento
        por completo de um carro elétrico desenvolvido pela empresa Mobilis.
        Podendo assim que este sistema possa auxiliar em futuras manutenções
      </h2>

      <Link to="/monitoramento">
        {' '}
        <button type="button">Iniciar Monitoramento</button>
      </Link>
    </Content>
  );
}
