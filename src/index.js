import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'


const store = createStore(App.reducer)

render(
  <Provider store={store}>
    <App.Component />
  </Provider>,
  document.getElementById('main')
)