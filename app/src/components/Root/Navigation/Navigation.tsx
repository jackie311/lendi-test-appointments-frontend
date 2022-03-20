import { useState, useEffect } from 'react';
import styled from "styled-components";

import { IAppointment } from '../type';

const Wrapper = styled.div`
background-color: rgb(0, 192, 165);
display: flex;
font-size: 20px;
justify-content: space-between;
padding: 24px 48px;
box-shadow: 1px 1px 1px #b8b8b8;
margin-bottom: 48px;
color: rgb(255, 255, 255);
`;

const Navigation = () => {

  const [appointment, setAppointment] = useState({} as IAppointment);

  useEffect(() => {
    document.body.addEventListener('update', ({ detail }: any) => {
      setAppointment(detail)
    });
    return document.body.removeEventListener('update', () => { })
  }, [])

  const hasAppointment: boolean = Object.keys(appointment).length > 0;

  return (
    <Wrapper>
      {hasAppointment && <strong>
        Currently selected appointment: {appointment.date} with {appointment.brokerName}
      </strong>}
      <strong>Welcome to Lendi</strong>
    </Wrapper>
  );
};

export default Navigation;
