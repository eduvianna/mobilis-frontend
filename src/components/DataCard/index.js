import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { MdDeveloperBoard } from 'react-icons/md';

import api from '~/services/api'; // Configurações API

import { Container, Card, InfoTime } from './styles';

/**
 * Função tem como objetivo realizar comparações entre a data atual
 *  e a data de quando foi realizado a medida para que assim possa se criar
 * um texto identificando o tempo passado desde a ultima medida
 */
function checkLastUpdate(date, compareDate) {
  let lastUpdate = differenceInYears(date, compareDate);
  if (lastUpdate === 0) {
    lastUpdate = differenceInDays(date, compareDate);

    if (lastUpdate > 0 && lastUpdate <= 31) {
      return lastUpdate <= 1
        ? `Atualizado há ${lastUpdate} dia`
        : `Atualizado há ${lastUpdate} dias`;
    }
    if (lastUpdate >= 31) {
      lastUpdate = differenceInMonths(date, compareDate);
      return lastUpdate <= 1
        ? `Atualizado há ${lastUpdate} mês`
        : `Atualizado há ${lastUpdate} meses`;
    }
    lastUpdate = differenceInHours(date, compareDate);
    if (lastUpdate < 1) {
      lastUpdate = differenceInMinutes(date, compareDate);

      if (lastUpdate < 1) {
        lastUpdate = differenceInSeconds(date, compareDate);
        return lastUpdate >= 1
          ? `Atualizado há ${lastUpdate} segundos`
          : `Atualizado há ${lastUpdate} segundo`;
      }
      return lastUpdate > 1
        ? `Atualizado há ${lastUpdate} minutos`
        : `Atualizado há ${lastUpdate} minuto`;
    }
    return lastUpdate > 1
      ? `Atualizado há ${lastUpdate} horas`
      : `Atualizado há ${lastUpdate} hora`;
  }
  return lastUpdate > 1
    ? `Atualizado há ${lastUpdate} anos`
    : `Atualizado há ${lastUpdate} ano`;
}

export default function DataCard({ sensor_id, word, name, type }) {
  const [sensor, setSensor] = useState({ created_at: '' }); // Definição do estado dos sensores

  //
  useEffect(() => {
    /**
     * Função timer que tem como objetivo pegar medidas dos sensores a cada 3s
     */
    const timer = setInterval(() => {
      api
        .get('list-measurements', { params: { sensor_id, word } })
        .then(response => {
          if (response.data.measurements.length > 0) {
            const { value, created_at } = response.data.measurements[0];

            const date = new Date();
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const compareDate = utcToZonedTime(created_at, timezone);

            const last_update = checkLastUpdate(date, compareDate);
            setSensor({ value, created_at, last_update });
          }
        });
    }, 3000);

    return () => clearInterval(timer);
  }, [sensor_id, word]);

  return (
    <Container>
      <Card>
        <MdDeveloperBoard size={48} />
        <div>
          <strong>{name}</strong>
          <span>{type}</span>
        </div>

        <strong>{sensor.value ? sensor.value : 'NaN'}</strong>
      </Card>

      <InfoTime>
        {sensor.last_update ? sensor.last_update : 'Não Atualizado ainda'}
      </InfoTime>
    </Container>
  );
}

DataCard.propTypes = {
  sensor_id: PropTypes.string.isRequired,
  word: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
