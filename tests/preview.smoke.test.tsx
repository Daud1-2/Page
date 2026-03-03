import { render, screen } from "@testing-library/react";
import PreviewPage from "@/app/preview/page";

describe("preview page smoke", () => {
  it("renders all major invitation sections", () => {
    render(<PreviewPage />);

    expect(screen.getByTestId("section-hero")).toBeInTheDocument();
    expect(screen.getByTestId("section-countdown")).toBeInTheDocument();
    expect(screen.getByTestId("section-message")).toBeInTheDocument();
    expect(screen.getByTestId("section-details")).toBeInTheDocument();
    expect(screen.getByTestId("section-location")).toBeInTheDocument();
    expect(screen.getByTestId("section-rsvp")).toBeInTheDocument();
    expect(screen.getByTestId("section-footer")).toBeInTheDocument();
  });

  it("renders RSVP form fields and submit button", () => {
    render(<PreviewPage />);
    expect(screen.getByText("Will you be attending? *")).toBeInTheDocument();
    expect(screen.getByText("How many guests?")).toBeInTheDocument();
    expect(screen.getByText("Full Name *")).toBeInTheDocument();
    expect(screen.getByText("Will any children be attending?")).toBeInTheDocument();
    expect(screen.getByText("Message for the couple")).toBeInTheDocument();
    expect(screen.getByTestId("rsvp-button")).toBeInTheDocument();
  });
});
