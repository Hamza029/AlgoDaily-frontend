import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Backdrop", () => {
  it("Footer should show app name along with current year", () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    const backdrop = screen.getByText(`AlgoDaily © ${currentYear}`);
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toBeVisible();
  });
});
