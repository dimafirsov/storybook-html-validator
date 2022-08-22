import React, { useEffect, useState } from "react";
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

  const [ newDangers, setNewDangers ] = useState<number>(0)
  const [ newWarnings, setNewWarnings ] = useState<number>(0)
  const [ oldResults, setOldResults ] = useState<Result>({
    danger: [],
    warning: [],
  })

  useEffect(() => {
    const newDangersTitles = result.danger.map(r => r.title).join()
    const newWarningsittles = result.warning.map(r => r.title).join()

    const numberOfNewDangers = getNewDangersAmount(newDangersTitles, oldResults, 'danger')
    const numberOfNewWarnings = getNewDangersAmount(newWarningsittles, oldResults, 'warning')

    setNewDangers(numberOfNewDangers)
    setNewWarnings(numberOfNewWarnings)

    setOldResults(result)
  }, [result, oldResults])

  function getNewDangersAmount(newItems: string, oldItems: Result, type: 'danger' | 'warning') {
    const resultArray = oldItems[type].reduce((acc, item) => {
      acc = acc.replace(item.title, '')

      return acc
    }, newItems)

    return resultArray.split(',').filter(item => item).length
  }

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
        title={
          isLoading
            ? 'Validating...'
            : `${result.danger?.length} Danger ${newDangers ? `(${newDangers} new)` : ''}`
        }
        color={convert(themes.normal).color.negative}
      >
        <List items={result.danger} />
      </div>
      <div
        id="warning"
        title={
          isLoading
            ? 'Validating...'
            : `${result.warning?.length} Warning ${newWarnings  ? `(${newWarnings} new)` : ''}`
        }
        color={convert(themes.normal).color.warning}
      >
        <List items={result.warning} />
      </div>
    </TabsState>
  )
};
