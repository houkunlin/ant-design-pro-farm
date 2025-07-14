import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import '@/config/i18n.ts';
import TanStackApp from '@/router';

import { getInitialState } from '@/app';
import { useInitialState } from '@/models';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

getInitialState().then((data) => {
  useInitialState.getState().setInitialState(data);
});

root.render(<StrictMode>
  <HelmetProvider>
    <TanStackApp />
  </HelmetProvider>
</StrictMode>);
