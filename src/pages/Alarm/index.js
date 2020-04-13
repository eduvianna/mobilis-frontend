/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { Form, Select, Scope } from '@rocketseat/unform';
import moment from 'moment';
import { toast } from 'react-toastify';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

import api from '~/services/api';

import CardMenu from '~/components/CardMenu';
import AlarmTable from './AlarmTable';

import { Container, Content, CardTableAlarm, ContentForm } from './styles';

export default function DashboardAlarm() {
  const [sensors, setSensors] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [contentAlarm, setContentAlarm] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [startDay, setStartDay] = useState(moment(new Date()));
  const [endDay, setEndDay] = useState(moment(new Date()));
  const [focusInput, setFocusInput] = useState(null);

  function handleSubmit({ sensor_id, word }) {
    if (!sensor_id || !word || !startDay || !endDay) {
      return toast.error('Todos os campos precisam ser preenchidos');
    }
    setContentAlarm(null);
    setContentAlarm(
      <CardTableAlarm>
        <AlarmTable
          sensor_id={sensor_id}
          word={Number(word)}
          startDay={startDay}
          endDay={endDay}
        />
      </CardTableAlarm>
    );
  }

  function getAlarms(sensorID) {
    setAlarms([]);
    sensors.map(sensor => {
      if (Number(sensor.id) === Number(sensorID)) {
        sensor.words.map(word => {
          word.title = `${word.name} (${word.word})`;
          word.id = word.word;
        });
        setAlarms(sensor.words);
        setDisabled(false);
      }
    });
  }

  useEffect(() => {
    async function loadSensors() {
      const response = await api.get('list-sensors', {
        params: { alarm: true },
      });
      response.data.map(sensor => {
        sensor.title = `${sensor.name} (${sensor.sensor_id})`;
        sensor.id = sensor.sensor_id;
        sensor.words.splice(0, 0, { word: -1, name: 'Todos os sensores' });
      });
      response.data.splice(0, 0, {
        id: '-1',
        title: 'Todos os ID sensores',
        words: [{ word: -1, name: 'Todos os sensores' }],
      });
      setSensors(response.data);
    }

    loadSensors();
  }, []);
  return (
    <>
      <Container>
        <CardMenu />
        <Content>
          <h1>Carro Mobilis - Histórido de Alarmes</h1>
          <ContentForm>
            <Form onSubmit={handleSubmit}>
              <Select
                name="sensor_id"
                options={sensors}
                onChange={option =>
                  option.target.value && getAlarms(option.target.value)
                }
              />
              <Select name="word" disabled={disabled} options={alarms} />
              <Scope path="date">
                <DateRangePicker
                  isOutsideRange={() => false}
                  startDate={startDay}
                  startDateId="start_date"
                  startDatePlaceholderText="Data Inicio"
                  minimumNights={0}
                  endDate={endDay}
                  endDateId="end_date"
                  endDatePlaceholderText="Data Final"
                  onDatesChange={({ startDate, endDate }) => {
                    setStartDay(startDate);
                    setEndDay(endDate);
                  }}
                  focusedInput={focusInput}
                  onFocusChange={focusedInput => setFocusInput(focusedInput)}
                  displayFormat="DD/MM/YYYY"
                />
              </Scope>
              <button type="submit">Buscar</button>
            </Form>
          </ContentForm>
          {contentAlarm}
        </Content>
      </Container>
    </>
  );
}
