import React from 'react'
import { Link } from 'react-router'

export default function App({ location, children }) {

  return (
    <div className="container-fluid">
      <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">CSPA services</Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <Link className={/^\/gsbpm/.test(location.pathname) && 'active'} to="/gsbpm">Search the GSBPM</Link>
                </li>
                <li>
                  <Link className={/^\/gsim/.test(location.pathname) && 'active'} to="/gsim">Search the GSIM</Link>
                </li>
                <li>
                  <Link className={/^\/nsis/.test(location.pathname) && 'active'} to="/nsis">Search by NSI</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {/* Children is a special prop name with react. Here, it allows
          `react-router` to populate our main component with the components
          that match the route */}
      { children }
    </div>
  )
}
