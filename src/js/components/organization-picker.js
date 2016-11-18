import React, { Component , PropTypes} from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function OrganizationPicker({ disabled, value, loaded, organizations, onChange }) {
  if (loaded !== LOADED) return <span>loading</span>
  return (
    <select
      value={value}
       disabled={disabled}
       onChange={e => onChange(e.target.value)} className="form-control">
      { organizations.map(({ org, label }) => 
        <option key={org} value={org}>
          {label}
        </option>)}
    </select>
  )
}
export default sparqlConnect.organizations(OrganizationPicker)