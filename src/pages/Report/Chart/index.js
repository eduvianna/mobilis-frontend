import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';
import { toast } from 'react-toastify';
import { Line } from '@nivo/line';
import { isBefore, isAfter, isEqual, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import api from '~/services/api';

import { Container, Card, InfoCard, InfoTime } from './styles';

export default function Chart({ sensor_id, word, startDay, endDay }) {
  const [datas, setDatas] = useState([]);
  const [infoValues, setInfoValues] = useState({
    minValue: 0,
    avgValue: 0,
    maxValue: 0,
  });

  useEffect(() => {
    async function getMeasurements(sensor, sensorWord) {
      setDatas([]);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const start = startDay.set({ hour: 0, minute: 0, second: 0 }).toDate();
      const end = endDay.set({ hour: 23, minute: 59, second: 59 }).toDate();

      const response = await api.get('list-measurements', {
        params: { sensor_id: sensor, word: sensorWord },
      });

      if (response.data.measurements.length > 0) {
        setInfoValues({
          maxValue: response.data.measurements.reduce((prev, current) =>
            Number(prev.value) > Number(current.value) ? prev : current
          ),
          minValue: response.data.measurements.reduce((prev, current) =>
            Number(prev.value) < Number(current.value) ? prev : current
          ),
          avgValue:
            response.data.measurements
              .map(a => {
                return a.value;
              })
              .reduce((a, b) => {
                return Number(a) + Number(b);
              }) / response.data.measurements.length,
        });
        // eslint-disable-next-line array-callback-return
        response.data.measurements.map(element => {
          element.x = utcToZonedTime(element.created_at, timezone);

          element.y = element.value;
          delete element.created_at;
          delete element.value;
        });

        const sensorValues = response.data.measurements.filter(element => {
          if (
            (isBefore(element.x, end) && isAfter(element.x, start)) ||
            isEqual(element.x, start) ||
            isEqual(element.x, end)
          ) {
            return true;
          }
          return false;
        });
        if (sensorValues.length > 0) {
          setDatas(sensorValues);
        } else {
          toast.error(
            'Não possui nenum valor medido neste intervalo de datas definido'
          );
        }
      } else {
        toast.error('Este sensor não possui nenhum valor medido ainda.');
      }
    }

    getMeasurements(sensor_id, word);
  }, [startDay, endDay, sensor_id, word]);
  return (
    datas.length > 0 && (
      <>
        <Container>
          <Card>
            <InfoCard>
              <div>
                <strong>Valor Minimo</strong>
              </div>

              <strong>{infoValues.minValue.y}</strong>
            </InfoCard>

            <InfoTime>{`Valor medido em ${format(
              infoValues.minValue.x,
              'dd/MM/YYY HH:mm'
            )}`}</InfoTime>
          </Card>
          <Card>
            <InfoCard>
              <div>
                <strong>Valor Médio</strong>
              </div>

              <strong>{infoValues.avgValue.toFixed(2)}</strong>
            </InfoCard>

            <InfoTime>Média de todos os valores medidos</InfoTime>
          </Card>
          <Card>
            <InfoCard>
              <div>
                <strong>Valor Máximo</strong>
              </div>

              <strong>{infoValues.maxValue.y}</strong>
            </InfoCard>

            <InfoTime>{`Valor medido em ${format(
              infoValues.maxValue.x,
              'dd/MM/YYY HH:mm'
            )}`}</InfoTime>
          </Card>
        </Container>

        <Line
          width={900}
          height={400}
          margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
          animate
          data={[{ id: 'Sensor', data: datas }]}
          xScale={{
            type: 'time',
            format: 'native',
          }}
          xFormat="time:%d/%m/%Y %H:%M"
          yScale={{
            type: 'linear',
            stacked: false,
          }}
          axisBottom={{
            format: '%b %d',
            tickValues: 'every day',
            legend: 'Tempo (dia)',
            legendPosition: 'middle',
            legendOffset: 46,
          }}
          curve="monotoneX"
          useMesh
          enableSlices={false}
        />
      </>
    )
  );
}

Chart.propTypes = {
  sensor_id: PropTypes.string.isRequired,
  word: PropTypes.number.isRequired,
  startDay: momentPropTypes.momentObj.isRequired,
  endDay: momentPropTypes.momentObj.isRequired,
};
