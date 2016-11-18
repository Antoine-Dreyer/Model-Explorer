import React from 'react'
import { LOADED } from 'sparql-connect'
import { Link, browserHistory } from 'react-router'
import { uriToLink } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import ServiceList from './service-list'

function Services({ loaded, services }) {
  const handleClick = () =>
    browserHistory.push(uriToLink.create())
  
  return (
    <div>
      <ServiceList services={services} loaded={loaded === LOADED}/>
      <button 
        className="btn btn-primary"
        onClick={handleClick}>Create a new service</button>
      <img src="/img/unece.png" />
    </div>
  )
}

export default sparqlConnect.services(Services)
export const DumbServices = Services
