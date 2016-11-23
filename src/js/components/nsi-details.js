import React, { PropTypes } from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { connectFromRoute } from '../routes'
import ServicesByNSI from './services-by-nsi'
import { LOADED } from 'sparql-connect'

function NSIDetails({ nsi, loaded, name, shortName, address, geo }) {
  if (loaded !== LOADED) return <span>Loading...</span>
  var countryCode = nsi.slice(-2);
  var flagClassName = "flag-icon flag-icon-" + countryCode.toLowerCase() + " large-flag";
  // Computes the OpenStreetMap URL corresponding to the coordinates (NB: 18 is the zoom level)
  var osmURL = (geo) ? 'http://www.openstreetmap.org/#map=18/' + geo.substring(4).replace(',', '/') : '';

  return (
    <div>
      <span className={flagClassName}></span>
      <h1>{name + ((shortName) ? ' (' + shortName + ')' : '')}</h1>

      {address &&
        <div>
        {geo && (<a href={osmURL}><img src="/img/osm.png"/></a>)}
        <h2>{address}</h2>
        </div>
       }
       <ServicesByNSI nsi={nsi} />
    </div>
  )
}

export default connectFromRoute(sparqlConnect.NSIDetails(NSIDetails))
