import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import store from "../store";

it("should render initially password field empty", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
  const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

  expect(passwordInput.value).toBe("");
  expect(emailInput.value).toBe("");
});

it("should render initially button as disabled", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});

it("should redirect to register page", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  userEvent.click(screen.getByRole("link"));

  expect(screen.getByText(/Don't you have an account/i)).toBeInTheDocument();
});

it("Should initially set user to null", () => {
  const state = store.getState().user;

  expect(state.user).toEqual(null);
});

it("Should initially set contacts to an empty array", () => {
  const state = store.getState().contacts;

  expect(state.contacts).toEqual([]);
});
