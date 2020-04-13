/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';
import { isBefore, isAfter, isEqual, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import api from '~/services/api';

import { Container } from './styles';

const columns = [
  { id: 'sensor_id', label: 'ID Sensor', minWidth: 150, align: 'center' },
  {
    id: 'sensor_name',
    label: 'Nome do Sensor',
    minWidth: 150,
    align: 'center',
  },
  {
    id: 'sensor_type',
    label: 'Tipo do Sensor',
    minWidth: 150,
    align: 'center',
  },
  { id: 'alarm_name', label: 'Nome do Alarme', minWidth: 150, align: 'center' },
  { id: 'alarm_value', label: 'Valor', minWidth: 150, align: 'center' },
  { id: 'alarm_date', label: 'Data/Hora', minWidth: 150, align: 'center' },
];

export default function AlarmTable({ sensor_id, word, startDay, endDay }) {
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    async function getMeasurements(sensor, sensorWord) {
      setDatas([]);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const start = startDay.set({ hour: 0, minute: 0, second: 0 }).toDate();
      const end = endDay.set({ hour: 23, minute: 59, second: 59 }).toDate();

      let allMeasurements = [];

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
            responseData.measurements.forEach(alarm => {
              allMeasurements.push({
                sensor_id: responseData.sensor.sensor_id,
                sensor_name: responseData.sensor.name,
                sensor_type: responseData.sensor.type,
                alarm_name: responseData.word.name,
                alarm_value: alarm.value,
                alarm_date: format(alarm.created_at, 'dd/MM/YYY HH:mm'),
              });
            });
          }
        }
      });
      setDatas(allMeasurements);
      console.log(allMeasurements);
    }

    getMeasurements(sensor_id, word);
  }, [startDay, endDay, sensor_id, word]);
  return (
    <Container>
      {datas && datas.length > 0 ? (
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {datas
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map(column => {
                          const value = data[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={datas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <p>
          Este(s) alarme(s) não possuem nenhum valor medido neste intervalo de
          tempo definido{' '}
        </p>
      )}
    </Container>
  );
}

AlarmTable.propTypes = {
  sensor_id: PropTypes.string.isRequired,
  word: PropTypes.number.isRequired,
  startDay: momentPropTypes.momentObj.isRequired,
  endDay: momentPropTypes.momentObj.isRequired,
};
