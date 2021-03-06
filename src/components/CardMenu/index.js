import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Header, Menu } from './styles';

import logo_satc from '~/assets/logo-satc-horizontal.png';
import logo_mobilis from '~/assets/logo-mobilis.png';

export default function CardMenu() {
  return (
    <Container>
      <Header>
        <img src={logo_satc} alt="SATC" width={200} />
        <img src={logo_mobilis} alt="MOBILIS" width={200} />
      </Header>
      <Menu>
        <h1>Bem Vindo ao sistema de Monitoramento Mobilis.</h1>

        <Link to="/monitoramento">
          <button type="button">Monitoramento</button>
        </Link>

        <Link to="/alarme">
          <button type="button">Histórico Alarmes</button>
        </Link>

        <Link to="/relatorio">
          <button type="button">Relatórios</button>
        </Link>
      </Menu>
    </Container>
  );
}
