import React from 'react'
import { uriToLink } from '../routes'
import { Link } from 'react-router'

export default function GSBPMSubprocess({ subprocess, code, label, definition, active }) {
 return (
    <div className="subprocess cell">
      <Link to={uriToLink.GSBPMSubProcessDetails(subprocess)} title={definition}>
	      <div>{code}</div>
		    <div>{label}</div>
	    </Link>
	    <GSBPMSubprocessDefinition definition={definition}/>
    </div>
  )
}

function GSBPMSubprocessDefinition({definition}) {
  var divDefinitionStyle = {display: 'none'};
  return (
	  <div style={divDefinitionStyle}>{definition}</div>
  )
}
