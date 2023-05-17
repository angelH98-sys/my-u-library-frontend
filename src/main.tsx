import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import "./config/i18next/i18next.config";
import { AppRouter } from './router/routes/AppRouter'
import { Provider } from 'react-redux';
import { reduxStore } from './redux/store/store.redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <RouterProvider router={AppRouter}/>
    </Provider>
  </React.StrictMode>,
)
