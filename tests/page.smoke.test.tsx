import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Home from "@/app/page";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("home page smoke", () => {
  const push = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({ push } as never);
  });

  it("renders opening screen", () => {
    render(<Home />);
    expect(screen.getByTestId("opening-screen")).toBeInTheDocument();
    expect(screen.getByText("Wedding Invitation")).toBeInTheDocument();
  });

  it("starts fade and routes to preview after click", () => {
    vi.useFakeTimers();
    render(<Home />);
    const trigger = screen.getByTestId("open-invitation-trigger");

    fireEvent.click(trigger);
    vi.advanceTimersByTime(900);
    expect(push).toHaveBeenCalledWith("/preview");
    vi.useRealTimers();
  });
});
