import React from 'react'
import { uriToLink } from '../routes'

export default function GSBPMSubprocess({ subprocess, code, label, definition, active }) {
 return (
    <div className="subprocess cell">
      <a href={uriToLink.GSBPMSubProcessDetails(subprocess)} title={definition}>
	      <div>{code}</div>
		    <div>{label}</div>
	    </a>
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
