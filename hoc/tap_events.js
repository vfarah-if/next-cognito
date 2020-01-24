// Make sure react-tap-event-plugin only gets injected once
import injectTapEventPlugin from 'react-tap-event-plugin';
if (!process.tapEventInjected) {
    injectTapEventPlugin();
    process.tapEventInjected = true;
  }
  