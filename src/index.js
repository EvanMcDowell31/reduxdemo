import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './app/store/configureStore'
import App from './modules/App'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./app/App', render)
// }
