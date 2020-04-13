/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Select, Scope } from '@rocketseat/unform';
import moment from 'moment';

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';

import api from '../../services/api';

import CardMenu from '../../components/CardMenu';
import Chart from './Chart';

import { Container, Content, CardChart } from './styles';

export default function Report() {
  const [sensors, setSensors] = useState([]);
  const [words, setWords] = useState([]);
  const [report, setReport] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [startDay, setStartDay] = useState(moment(new Date()));
  const [endDay, setEndDay] = useState(moment(new Date()));
  const [focusInput, setFocusInput] = useState(null);

  function handleSubmit({ sensor_id, word }) {
    setReport(null);
    if (!sensor_id || !word || !startDay || !endDay) {
      return toast.error('Todos os campos precisam ser preenchidos');
    }

    setReport(
      <CardChart>
        <Chart
          sensor_id={sensor_id}
          word={Number(word)}
          startDay={startDay}
          endDay={endDay}
        />
      </CardChart>
    );
  }

  function getWords(sensorID) {
    setWords([]);
    sensors.map(sensor => {
      if (Number(sensor.id) === Number(sensorID)) {
        if (sensor.words.length > 0) {
          sensor.words.map(word => {
            word.title = `${word.name} (${word.word})`;
            word.id = word.word;
          });
          setWords(sensor.words);
          setDisabled(false);
        } else {
          toast.error('Este ID de sensor não possui nenhum sensor cadastrado');
          setDisabled(true);
        }
      }
    });
  }

  useEffect(() => {
    async function loadSensors() {
      const response = await api.get('list-sensors');
      response.data.map(sensor => {
        sensor.title = `${sensor.name} (${sensor.sensor_id})`;
        sensor.id = sensor.sensor_id;
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
          <Form onSubmit={handleSubmit}>
            <Select
              name="sensor_id"
              options={sensors}
              onChange={option =>
                option.target.value && getWords(option.target.value)
              }
            />
            <Select name="word" disabled={disabled} options={words} />
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

            <button type="submit">Gerar Relatório</button>
          </Form>
          {report}
        </Content>
      </Container>
    </>
  );
}
