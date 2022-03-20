export interface IAppointment {
  id: number;
  date: string;
  brokerId: number;
  brokerName?: string;
}
export interface IBrokerProps {
  id: number;
  name: string;
  appointments: IAppointment[];
}
