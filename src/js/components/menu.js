import React from 'react'
import { Link } from 'react-router'

export default function Menu({ location }) {
  return (
    <header>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">
              <img className="logo" src="/img/unece.png" />
              CSPA Services
            </Link>
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
  )
}
