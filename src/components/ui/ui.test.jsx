import { render, screen } from "src/utils/test-utils";
import Button from "./Button";
import Label from "./Label";
import { describe, it, expect } from "vitest";

describe("Button", async () => {
  it("should render the button", () => {
    render(<Button type="button">+ Create</Button>);
    expect(screen.getByText("+ Create")).toBeDefined();
    expect(screen.getByText("+ Create").tagName).toBe("BUTTON");
    expect(screen.getByText("+ Create")).toHaveAttribute("type", "button");
  });
});

describe("Label", () => {
  it("should render the label with correct props", () => {
    render(<Label className="custom-class">Example Label</Label>);

    expect(screen.getByText("Example Label")).toBeDefined();

    const labelElement = screen.getByText("Example Label");
    expect(labelElement.tagName).toBe("LABEL");

    // Check the custom class
    expect(labelElement).toHaveClass("block");
    expect(labelElement).toHaveClass("font-semibold");
    expect(labelElement).toHaveClass("custom-class");
  });

  it("should render with default className when no className prop is provided", () => {
    render(<Label>Default Label</Label>);
    expect(screen.getByText("Default Label")).toHaveClass("block");
    expect(screen.getByText("Default Label")).toHaveClass("font-semibold");
  });
});
