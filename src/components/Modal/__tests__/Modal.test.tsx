import { render, screen } from "@testing-library/react";
import Modal from "../Modal";

describe("Toast", () => {
  it("Modal should not be visible by default when rendered", () => {
    render(
      <Modal handleClose={() => {}}>
        <h1>Inside backdrop</h1>
      </Modal>,
    );
    const backdrop = screen.getByText("Inside backdrop");
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).not.toBeVisible();
  });

  it("Modal should have a close icon", () => {
    render(
      <Modal handleClose={() => {}}>
        <h1>Inside backdrop</h1>
      </Modal>,
    );
    const closeIconBtn = screen.getByRole("button");
    expect(closeIconBtn).toBeInTheDocument();
    expect(closeIconBtn).not.toBeVisible();
  });
});
