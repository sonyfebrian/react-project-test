import { render, screen, fireEvent } from "src/utils/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";
import Modal from "./Modal";
import { FormRegister } from "./FormRegister";
import { describe, it, expect, vi } from "vitest";
import store from "src/store/store";
import { Provider } from "react-redux";

describe("Navbar Component", () => {
  it("renders the Navbar component", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByAltText("Logo")).toBeInTheDocument();

    expect(screen.getByText("Blog Post")).toBeInTheDocument();
    expect(screen.getByText("Denom")).toBeInTheDocument();

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("toggles the mobile menu", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const mobileMenuButton = screen.getByText(/Logout/i);
    const blogLink = screen.getByText("Blog Post");
    const denomLink = screen.getByText("Denom");

    fireEvent.click(mobileMenuButton);

    expect(blogLink).toHaveClass("block");
    expect(denomLink).toHaveClass("block");

    fireEvent.click(mobileMenuButton);
  });
});

describe("Modal Component", () => {
  it("renders the 'Create' modal when articleToEdit is null", () => {
    const setShowModal = vi.fn();
    const cancelUpdate = vi.fn();

    render(
      <Provider store={store}>
        {" "}
        <Modal
          showModal={true}
          setShowModal={setShowModal}
          articleToEdit={null}
          cancelUpdate={cancelUpdate}
        />
      </Provider>
    );
  });

  it("renders the 'Edit' modal when articleToEdit is provided", () => {
    const setShowModal = vi.fn();
    const cancelUpdate = vi.fn();

    const articleToEdit = {
      id: 1,
      article: {
        desc: "Initial Description",
        title: "Initial Title",
      },
    };

    render(
      <Provider store={store}>
        <Modal
          showModal={true}
          setShowModal={setShowModal}
          articleToEdit={articleToEdit}
          cancelUpdate={cancelUpdate}
        />
      </Provider>
    );
  });
});

describe("FormRegister Component", () => {
  it("renders the form with email and password inputs", () => {
    render(
      <Provider store={store}>
        <Router>
          <FormRegister />
        </Router>
      </Provider>
    );

    // Check if email and password inputs are rendered
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
