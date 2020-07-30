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

  async function fillOutForm(email) {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.type(emailInput, email);
    await userEvent.click(screen.getByRole("button"));
  }

  describe("<ContactForm /> email input is invalid", () => {
    beforeEach(() => {
      fillOutForm("invalidemail");
    });

    test("it catches invalid email input without @", async () => {
      expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument();
    });
  });

  describe("<ContactForm /> throws error 500", () => {
    beforeEach(() => {
      fillOutForm("email500@gmail.com");
    });

    test("it catches failed API request due to InternalError", async () => {
      await waitForElementToBeRemoved(() => screen.getByText(/Signing up/i));

      expect(
        screen.getByText(
          /Unable to process subscribe to newsletter at the moment/i
        )
      ).toBeInTheDocument();
    });
  });

  describe("<ContactForm /> throws error 400", () => {
    beforeEach(() => {
      fillOutForm("email-400@gmail.com");
    });

    test("it catches failed API request due to invalid email input", async () => {
      await waitForElementToBeRemoved(() => screen.getByText(/Signing up/i));

      expect(
        screen.getByText(
          /Unable to process subscribe to newsletter at the moment/i
        )
      ).toBeInTheDocument();
    });
  });
});
