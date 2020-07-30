import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("<ContactForm />", () => {
  test("it renders form", () => {
    render(<ContactForm />);
  });

  test("it catches invalid email input without @", async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.type(emailInput, "invalidemail");
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument();
  });

  test("it catches failed API request", async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.type(emailInput, "email500@gmail.com");
    await userEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() => screen.getByText(/Signing up/i));

    expect(
      screen.getByText(
        /Unable to process subscribe to newsletter at the moment/i
      )
    ).toBeInTheDocument();
  });

  test("it catches failed API request due to invalid email input", async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.type(emailInput, "email-400@gmail.com");
    await userEvent.click(screen.getByRole("button"));
    await waitForElementToBeRemoved(() => screen.getByText(/Signing up/i));

    expect(
      screen.getByText(
        /Unable to process subscribe to newsletter at the moment/i
      )
    ).toBeInTheDocument();
  });
});
