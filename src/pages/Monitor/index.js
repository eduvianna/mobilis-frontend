import React, { useState, useEffect } from 'react';
import { Collapse } from 'reactstrap';
import { MdExpandMore } from 'react-icons/md';

import {
  Container,
  CardMonitoring,
  Card,
  CardHeader,
  CardBody,
} from './styles';
import CardMenu from '~/components/CardMenu';
import DataCard from '~/components/DataCard';

import api from '~/services/api';

export default function DashboardMonitoramento() {
  const [openedCollapses, setOpenedCollapses] = useState([]);
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    async function loadSensors() {
      const response = await api.get('list-sensors');
      response.data.map(async element => {
        const words = await api.get('list-words', {
          params: { sensor_id: element.sensor_id },
        });

        element.words = words.data;
      });
      setSensors(response.data);
    }

    loadSensors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const collapsesToggle = collapse => {
    if (openedCollapses.includes(collapse)) {
      const key = openedCollapses.findIndex(element => element === collapse);
      openedCollapses.splice(key, 1);
      setOpenedCollapses([...openedCollapses]);
    } else {
      setOpenedCollapses([...openedCollapses, collapse]);
    }
  };
  return (
    <Container>
      <CardMenu />
      <CardMonitoring>
        <h1>Carro Mobilis - Monitoramento</h1>
        {sensors &&
          sensors.map(element => (
            <Card key={element.sensor_id}>
              <CardHeader
                role="tab"
                onClick={() => collapsesToggle(`${element.sensor_id}`)}
                aria-expanded={openedCollapses.includes(`${element.sensor_id}`)}
              >
                <h5 className="mb-0">{element.name}</h5>
                <MdExpandMore size={48} />
              </CardHeader>
              <Collapse
                role="tabpanel"
                isOpen={openedCollapses.includes(`${element.sensor_id}`)}
              >
                <CardBody>
                  {element.words &&
                    element.words.map(word => (
                      <DataCard
                        sensor_id={word.sensor_id}
                        word={word.word}
                        name={word.name}
                        type={element.type}
                      />
                    ))}
                </CardBody>
              </Collapse>
            </Card>
          ))}
      </CardMonitoring>
    </Container>
  );
}
