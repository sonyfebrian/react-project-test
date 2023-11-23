import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "src/utils/test-utils";
import { Home } from "./Home";
import store from "src/store/store";

describe("Home", () => {
  it("should render the Home component with FormLogin", () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("Log in");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
