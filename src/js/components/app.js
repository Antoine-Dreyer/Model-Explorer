import React from 'react'
import Menu from './menu'

export default function App({ location, children }) {

  return (
    <div className="container-fluid">
      <Menu location={location} />
      {/* Children is a special prop name with react. Here, it allows
          `react-router` to populate our main component with the components
          that match the route */}
      { children }
    </div>
  )
}
