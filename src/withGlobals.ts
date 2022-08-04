import type { DecoratorFunction } from "@storybook/addons";

export const withGlobals: DecoratorFunction = (StoryFn) => {
  return StoryFn();
}
