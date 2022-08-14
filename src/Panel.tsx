import React, { useEffect, useState } from "react";
import { useAddonState, useChannel, useStorybookState } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS } from "./constants";
import { PanelContent } from "./components/PanelContent";


interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [ loading, setLoading ] = useState(false)
  const { storyId } = useStorybookState()
  const [results, setState] = useAddonState(ADDON_ID, {
    danger: [],
    warning: [],
  });

  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => setState(newResults),
  });

  useEffect(() => {
    emit(EVENTS.CLEAR)
    setLoading(true)

    setTimeout(() => {
      emit(EVENTS.RUN, storyId)
      setTimeout(() => setLoading(false), 500)
    }, 1000)
  }, [storyId, emit])

  return (
    <AddonPanel {...props}>
      <PanelContent
        result={results}
        isLoading={loading}
        run={() => {
          setLoading(true)
          emit(EVENTS.RUN, storyId)
          setTimeout(() => setLoading(false), 500)
        }}
      />
    </AddonPanel>
  );
};
