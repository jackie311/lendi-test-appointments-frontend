import { Dispatch, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Broker from "./Broker";
import { sortByDate, sortByField } from "./helpers";
import { IBrokerProps, IAppointment } from "../type";

const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 250px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
  display: block;
  font-size: 20px;
`;

const fetchData = (cb: Dispatch<any>) =>
  Promise.all([
    axios
      .get("http://localhost:8080/brokers")
      .then(({ data }) => data.sort(sortByField('id'))),
    axios
      .get("http://localhost:8080/appointments")
      .then(({ data }) => data)
  ])
    .then(([brokers, appointments]) => {
      const brokerAppointments: IBrokerProps[] = brokers.map((broker: IBrokerProps) => {
        broker.appointments =
          appointments
            .filter(({ brokerId }: { brokerId: number }) =>
              brokerId === broker.id
            )
            .sort(sortByDate('date'));
        return broker;
      })

      return cb(brokerAppointments);
    })

const AppointmentSelect = () => {

  const [brokerAppointments, setBrokerAppointments] = useState<IBrokerProps[]>([]);
  const [currentAppointment, setCurrentAppointment] = useState<IAppointment>({} as IAppointment);

  useEffect(() => {
    fetchData(setBrokerAppointments)
  }, []);

  const update = (appointment: IAppointment, name: string): void => {
    setCurrentAppointment(appointment);
    document.body.dispatchEvent(
      new CustomEvent('update', {
        detail: { ...appointment, brokerName: name }
      })
    );
  }

  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        <ul>
          {brokerAppointments.map((broker: IBrokerProps) => (
            <Broker
              key={broker.id}
              broker={broker}
              onClick={(appointment) => update(appointment, broker.name)}
            />
          ))}
        </ul>
      </SideBar>
      <div>
        <Heading>Appointment details</Heading>
        <br />
        <div>Broker Id: {currentAppointment.brokerId}</div>
        <div>Date: {currentAppointment.date}</div>
        <div>Appointment Id: {currentAppointment.id}</div>
      </div>
    </Wrapper>
  );
};

export default AppointmentSelect;
