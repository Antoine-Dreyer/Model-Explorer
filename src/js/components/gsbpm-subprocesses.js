import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { uriToLink } from '../routes'
import { sparqlConnect} from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function GSBPMSubprocesses({ loaded, subprocesses }) {
  
  if (loaded !== LOADED) return <span>loading subprocesses</span>
    
  return(
    <div className="list-group">
      { subprocesses.map(({ subprocess, label }) =>
        <Link key={subprocess} to={uriToLink.GSBPMSubProcessDetails(subprocess)}
          className="list-group-item" title={label}>
          { label }
        </Link>)
       }
    </div>
  )
}

export default sparqlConnect.SubsByGSBPMPhase(GSBPMSubprocesses)