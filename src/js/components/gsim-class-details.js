import React, { PropTypes } from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { connectFromRoute } from '../routes'
import { LOADED } from 'sparql-connect'

import ServiceList from './service-list.js'

function ServicesByGSIMInputOrOutput({ loaded, services, msg }){
  return <ServiceList
    services={services}
    msg={msg}
    loaded={loaded === LOADED} />
}

const ServicesByGSIMInput = 
  sparqlConnect.servicesByGSIMInput(ServicesByGSIMInputOrOutput)

const ServicesByGSIMOutput =
  sparqlConnect.servicesByGSIMOutput(ServicesByGSIMInputOrOutput)
  
  
function GSIMClassDetails({ GSIMClass, loaded, label, definition, explanatoryText }) {
  if(loaded !== LOADED) return <span>loading......</span>
  return (
    <div>
      <dl className="dl-horizontal">
        <dt>Label</dt>
        <dd>{label}</dd>
        <dt>Definition</dt>
        <dd>{definition}</dd>
        <dt>Explanatory text</dt>
        <dd>{explanatoryText}</dd>
      </dl>
      <h3>Services referencing this GSIM class</h3>
      <dl className="dl-horizontal">
        <dt>As input</dt>
        <dd>
          <ServicesByGSIMInput
            GSIMClass={GSIMClass}
            msg="No service references this GSIM class as input"/>
        </dd>
        <dt>As output</dt>
        <dd>
          <ServicesByGSIMOutput
            GSIMClass={GSIMClass}
            msg="No service references this GSIM class as output" />
        </dd>
      </dl>
    </div>
  )
}

export default connectFromRoute(sparqlConnect.GSIMClassDetails(GSIMClassDetails))
