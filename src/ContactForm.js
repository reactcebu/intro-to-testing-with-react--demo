import React, { useRef, useState } from "react";

export const ContactForm = () => {
  // ✔️ If user inputs invalid email, post to screen "Email is invalid!"
  // ✔️ If user inputs correct email, send POST request to /newsletter with the email
  // ✔️ If POST request fails, post to screen "Unable to process subscribe to newsletter at the moment"
  // ✔️ If POST request returns 200, post to screen "Success! Please check your inbox to confirm newsletter subscription."

  const emailInput = useRef(null);
  const [formState, setFormState] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = (email) => email.includes("@");
    const email = emailInput.current.value;

    if (!isEmailValid(emailInput.current.value)) {
      setFormState("invalid_input");
      return;
    } else {
      setFormState("idle");
    }

    const apiUrl =
      "https://wt-873f548fdd5b60d59d25e0cae4a5051c-0.sandbox.auth0-extend.com/newsletter-subscribe";

    // send post request
    setFormState("sending_request");
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        res.json();
      })
      .then(() => {
        setFormState("success");
      })
      .catch(() => {
        setFormState("failed");
      })
      .finally(() => setTimeout(() => setFormState("idle"), 10000));
  };

  return (
    <>
      <h2 className="is-size-2">Newsletter</h2>
      {formState === "success" && (
        <div className="notification is-success">
          <button className="delete"></button>
          Success! Please check your inbox to confirm newsletter subscription
        </div>
      )}
      {["invalid_input"].includes(formState) && (
        <div className="notification is-danger">
          <button className="delete"></button>
          Email is invalid!
        </div>
      )}
      {["failed"].includes(formState) && (
        <div className="notification is-danger">
          <button className="delete"></button>
          Unable to process subscribe to newsletter at the moment
        </div>
      )}
      <form method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <div className="control">
            <input
              className="input"
              id="email"
              name="Email"
              type="text"
              ref={emailInput}
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-black" type="submit">
            {formState === "sending_request" ? "Signing up..." : "Sign Me Up"}
          </button>
        </div>
      </form>
    </>
  );
};
