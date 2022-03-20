import { screen, render, fireEvent } from "@testing-library/react";

import Broker from "./Broker";

const testBroker = {
  name: "bob",
  id: 1,
  appointments: [{ brokerId: 1, date: "24/11/2021", id: 1 }],
};

describe("Broker Component", () => {
  test("should hide and show appointments on button click", () => {
    const handleClick = jest.fn();
    render(<Broker broker={testBroker} onClick={handleClick} />);

    const showAppointmentsButton = screen.getByTestId(
      "toggle-button"
    );
    expect(showAppointmentsButton.textContent).toBe('Open appointments');

    fireEvent.click(showAppointmentsButton);
    expect(showAppointmentsButton.textContent).toBe('Hide appointments');

    fireEvent.click(showAppointmentsButton);
    expect(showAppointmentsButton.textContent).toBe('Open appointments');

    const appointmentsList = screen.getByTestId("broker-appointments-list");
    expect(appointmentsList.textContent).toBe('24/11/2021')
  });
});
