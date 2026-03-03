import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & Record<string, unknown>) => {
    const filteredProps = { ...props };
    delete filteredProps.fill;
    delete filteredProps.priority;
    delete filteredProps.loader;
    delete filteredProps.unoptimized;
    return React.createElement("img", { ...filteredProps, alt: props.alt ?? "" });
  },
}));

vi.mock("framer-motion", () => {
  const stripMotionProps = (props: Record<string, unknown>) => {
    const rest = { ...props };
    delete rest.animate;
    delete rest.initial;
    delete rest.exit;
    delete rest.transition;
    delete rest.whileInView;
    delete rest.whileHover;
    delete rest.whileTap;
    delete rest.viewport;
    return rest;
  };

  const makeMotionTag =
    (tag: string) => {
      const MotionComponent = ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) =>
        React.createElement(tag, stripMotionProps(props), children);
      MotionComponent.displayName = `MockMotion(${tag})`;
      return MotionComponent;
    };

  const motion = new Proxy(
    {},
    {
      get: (_, key: string) => makeMotionTag(key),
    },
  );

  return {
    motion,
    AnimatePresence: ({ children }: React.PropsWithChildren) => React.createElement(React.Fragment, null, children),
    useScroll: () => ({ scrollY: 0 }),
    useTransform: () => 0,
  };
});

Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
  configurable: true,
  value: vi.fn().mockResolvedValue(undefined),
});

Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value: vi.fn(),
});
