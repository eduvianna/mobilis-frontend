import React, { useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';

import CardMenu from '../../components/CardMenu';
import { Container, CardHistoryAlarm } from './styles';

export default function DashboardAlarm() {
  const [alarms, setAlarms] = useState([]);

  function handleSubmit({ alarm }) {}
  return (
    <Container>
      <CardMenu />
      <CardHistoryAlarm>
        <Form onSubmit={handleSubmit}>
          <div>
            <Select name="alarm" options={alarms}>
              <button type="submit">Buscar</button>
            </Select>
          </div>
        </Form>
      </CardHistoryAlarm>
    </Container>
  );
}
