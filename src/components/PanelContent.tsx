import React from "react";
import { styled, themes, convert } from "@storybook/theming";
import { TabsState, Placeholder, Button } from "@storybook/components";
import { List } from "./List";
import { useStorybookState } from "@storybook/api";
import { Result } from "../preset/preview";

export const RequestDataButton = styled(Button)({
  marginTop: "1rem",
});

interface PanelContentProps {
  result: Result;
  isLoading: boolean,
  run: (storyId: string) => void
}

export const PanelContent: React.FC<PanelContentProps> = ({
  run,
  result,
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
        {/* Apparently, the Placeholder component doesn't accept any props which makes ts complain over its children */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Placeholder>
          It just works.
          <Button
            secondary
            small
            onClick={() => run(storyId)}
            style={{ marginTop: 36 }}
          >
            Click to validate
          </Button>
        </Placeholder>
      </div>
      <div
        id="danger"
        title={isLoading ? 'Validating...' : `${result.danger?.length} Danger`}
        color={convert(themes.normal).color.negative}
      >
        <List items={result.danger} />
      </div>
      <div
        id="warning"
        title={isLoading ? 'Validating...' : `${result.warning?.length} Warning`}
        color={convert(themes.normal).color.warning}
      >
        <List items={result.warning} />
      </div>
    </TabsState>
  )
};
