import type { DecoratorFunction } from "@storybook/addons";

export const withRoundTrip: DecoratorFunction = (storyFn) => {
  return storyFn();
};
