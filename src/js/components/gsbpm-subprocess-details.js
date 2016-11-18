import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import ServicesByGSBPMSubProcess from './services-by-gsbpm-subprocess'

// GSBPMSub comes from `connectFromRoute` (it's then passed to the sparql
// connected component, which keeps it in its own props)
function GSBPMSubProcessDetails({
    GSBPMSub, loaded, label, code, definition }) {
  return (
      <div>
        <dl className="dl-horizontal">
          <dt>Label</dt>
          <dd>{label}</dd>
          <dt>Definition</dt>
          <dd>{definition}</dd>
          <dt>Code</dt>
          <dd>{code}</dd>
          <dt>Services</dt>
          <dd>
            <ServicesByGSBPMSubProcess GSBPMSub={GSBPMSub} />
          </dd>
        </dl>
      </div>
  )
}

export default connectFromRoute(
  sparqlConnect.GSBPMSubProcessDetails(GSBPMSubProcessDetails)
)
