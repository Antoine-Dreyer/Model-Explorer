import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import ServiceList from './service-list'

function ServicesByGSBPMPhase({ loaded, services }) {
  return <ServiceList
    services={services}
    msg="No service implements this GSBPM phase"
    loaded={loaded === LOADED} />
}

export default 
  sparqlConnect.servicesByGSBPMPhase(ServicesByGSBPMPhase)