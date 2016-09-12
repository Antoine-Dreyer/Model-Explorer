import React from 'react'

export default function App({ children }) {
  return (
    <div className="container-fluid">
      <h1>Model Explorer</h1>
      {/* Children is a special prop name with react. Here, it allows
          `react-router` to populate our main component with the components
          that match the route */}
      { children }
    </div>
  )
}
