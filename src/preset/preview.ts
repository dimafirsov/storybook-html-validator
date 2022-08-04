import global from 'global';
import { addons } from '@storybook/addons';
import { withGlobals } from "../withGlobals";
import { withRoundTrip } from "../withRoundTrip";
import { EVENTS } from '../constants';

export const decorators = [withGlobals, withRoundTrip];

type Response = {
  type: 'error' | 'info',
  subType: string,
  message: string,
}

const { document, window: globalWindow } = global;

const channel = addons.getChannel();
let active = false;
let activeStoryId: string | undefined;

const run = async (storyId: string) => {
  activeStoryId = storyId;

  try {
    if (!active) {
      active = true;
      const element = "#root"
      const rootElement = document.querySelector(element);
      const rootElementInnerHTML = rootElement.innerHTML

      const response: Response[] = (await (await fetch("https://validator.w3.org/nu/?out=json", {
        method: 'POST',
        headers: { 'Content-Type': 'text/html; charset=utf-8'},
        body: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <title>Title</title>
            </head>
            <body>
              ${rootElementInnerHTML}
            </body>
          </html>`})).json()).messages;

      const result = response.reduce((acc: any, item: Response) => {
        if (item.type === 'error') {
          acc.danger.push({title: item.message})
        }

        if (item.type === 'info') {
          acc.warning.push({title: item.message})
        }

        return acc
      }, { danger: [], warning: [] })

      if (activeStoryId === storyId) {
        channel.emit(EVENTS.RESULT, {...result});
      } else {
        active = false;
        channel.emit(EVENTS.CLEAR);
        run(activeStoryId);
      }
    }
  } catch (error) {
    channel.emit(EVENTS.ERROR, error);
  } finally {
    active = false;
  }
};

channel.on(EVENTS.RUN, run);
