/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';
import { isBefore, isAfter, isEqual, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import Table from 'react-bootstrap/Table';

import api from '../../../services/api';

import { Container } from './styles';

export default function AlarmTable({ sensor_id, word, startDay, endDay }) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    async function getMeasurements(sensor, sensorWord) {
      setDatas([]);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const start = startDay.set({ hour: 0, minute: 0, second: 0 }).toDate();
      const end = endDay.set({ hour: 23, minute: 59, second: 59 }).toDate();

      const response = await api.get('list-measurements', {
        params: { sensor_id: sensor, word: sensorWord },
      });

      if (sensor !== -1 && sensorWord !== -1) {
        response.data = [response.data];
      }

      response.data.forEach(responseData => {
        if (responseData.measurements.length > 0) {
          responseData.measurements.map(element => {
            element.created_at = utcToZonedTime(element.created_at, timezone);
          });

          responseData.measurements = responseData.measurements.filter(
            element => {
              if (
                (isBefore(element.created_at, end) &&
                  isAfter(element.created_at, start)) ||
                isEqual(element.created_at, start) ||
                isEqual(element.created_at, end)
              ) {
                return true;
              }
              return false;
            }
          );
          if (responseData.measurements.length > 0) {
            setDatas([...datas, responseData]);
          }
        }
      });
    }

    getMeasurements(sensor_id, word);
  }, [startDay, endDay, sensor_id, word]);
  return (
    <>
      <Container>
        {datas && datas.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Sensor</th>
                <th>Nome do Sensor</th>
                <th>Tipo do Sensor</th>
                <th>Nome do Alarme</th>
                <th>Valor</th>
                <th>Data/Hora</th>
              </tr>
            </thead>
            <tbody>
              {datas.map(data => (
                <>
                  {data.measurements.map(e => (
                    <tr key={e.id}>
                      <td>{data.sensor.sensor_id}</td>
                      <td>{data.sensor.name}</td>
                      <td>{data.sensor.type}</td>
                      <td>{data.word.name}</td>
                      <td>{e.value}</td>
                      <td>{format(e.created_at, 'dd/MM/YYY HH:mm')}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>
            Este(s) alarme(s) não possuem nenhum valor medido neste intervalo de
            tempo definido{' '}
          </p>
        )}
      </Container>
    </>
  );
}

AlarmTable.propTypes = {
  sensor_id: PropTypes.string.isRequired,
  word: PropTypes.number.isRequired,
  startDay: momentPropTypes.momentObj.isRequired,
  endDay: momentPropTypes.momentObj.isRequired,
};
