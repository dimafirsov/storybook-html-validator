import React, { Fragment } from "react";
import { styled, themes, convert } from "@storybook/theming";
import { TabsState, Placeholder, Button } from "@storybook/components";
import { List } from "./List";
import { useStorybookState } from "@storybook/api";

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

type Results = {
  danger: any[];
  warning: any[];
};

interface PanelContentProps {
  results: Results;
  isLoading: boolean,
}

/**
 * Checkout https://github.com/storybookjs/storybook/blob/next/addons/jest/src/components/Panel.tsx
 * for a real world example
 */
export const PanelContent: React.FC<PanelContentProps> = ({
  results,
  isLoading,
}) => {
  const { storyId } = useStorybookState();

  return (
    <TabsState
      initial="overview"
      backgroundColor={convert(themes.normal).background.hoverable}
    >
      <div
        id="overview"
        title="Overview"
        color={convert(themes.normal).color.positive}
      >
        <Placeholder>
          <Fragment>
            It just works.
          </Fragment>
        </Placeholder>
      </div>
      <div
        id="danger"
        title={isLoading ? 'Validating...' : `${results.danger?.length} Danger`}
        color={convert(themes.normal).color.negative}
      >
        <List items={results.danger} />
      </div>
      <div
        id="warning"
        title={isLoading ? 'Validating...' : `${results.warning?.length} Warning`}
        color={convert(themes.normal).color.warning}
      >
        <List items={results.warning} />
      </div>
    </TabsState>
  )
};
