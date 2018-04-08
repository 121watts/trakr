import React from 'react'
import ReactDOM from 'react-dom'
import App from 'src/components/App'
import WithAuth from 'src/components/WithAuth'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

ReactDOM.render(
  <WithAuth render={({ authUser }) => <App authUser={authUser} />} />,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
