import { useState } from "react";
import styled from "styled-components";
import {IBrokerProps, IAppointment} from '../../type';

const Button = styled.button`
  display: flex;
  outline: none;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.3rem;
  position: relative;
  height: 1.5rem;
  cursor: pointer;
  background: #999;
  font-weight: bold;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #45404a
  }
}
`
const Li = styled.li`
  padding: '5px 0';
  max-height: ${(props: any) => props.open ? '100%' : '0'};
  overflow: hidden;
  margin: 3px;
  transition: max-height 0.2s ease-out;
  background: rgb(0, 192, 165);
  cursor: pointer;
  border-radius: 5px;
  justify-content: center;


  &:hover {
    background-color: rgb(50, 204, 183);
  }
`

interface IProps {
  broker: IBrokerProps;
  onClick: (appointment: IAppointment) => React.MouseEventHandler<HTMLButtonElement>;
}

const Broker = ({ broker, onClick }: IProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <li>
      {broker.name}
      <br />
      appointments:
      {(broker.appointments || []).length > 0 &&
        <Button
          data-testid = 'toggle-button'
          onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? 'Open' : 'Hide'} appointments
        </Button>}

      <ul>
        {(broker.appointments || []).map(appointment =>
          <Li 
            data-testid = 'broker-appointments-list'
            key={appointment.id}
            /* @ts-ignore */
            open={!isCollapsed}
            onClick={() => onClick(appointment)}
            >
            {appointment.date}
          </Li>
        )}
      </ul>
    </li>
  );
};

export default Broker;
