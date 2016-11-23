import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import ServicesByGSBPMPhase from './services-by-gsbpm-phase'
import GSBPMSubprocesses from './gsbpm-subprocesses.js'

function GSBPMPhaseDetails({
    GSBPMPhase, loaded, label, code, definition }) {
  
  return (
      <div>
        <dl className="dl-horizontal">
          <dt>Label</dt>
          <dd>{label}</dd>
          <dt>Code</dt>
          <dd>{code}</dd>
          <dt>Definition</dt>
          <dd>{definition}</dd>
          <dt>Subprocesses</dt>
          <dd>
            <GSBPMSubprocesses GSBPMPhase={GSBPMPhase}/>
          </dd>
          <dt>Services</dt>
          <dd>
            <ServicesByGSBPMPhase GSBPMPhase={GSBPMPhase} />
          </dd>
        </dl>
      </div>
  )
}

export default connectFromRoute(
  sparqlConnect.GSBPMPhaseDetails(GSBPMPhaseDetails)
)
