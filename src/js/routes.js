
import { buildRouterMapping } from './utils/router-mapping'

/*
In order to show nice URLs, we can define some mappgins between route paremeters
and unique identifiers (most of the time URI).
*/

const servicePrefix = 'http://unece.org/services#'
const GSIMPrefix = 'http://rdf.unece.org/models/gsim#'
const GSBPMPrefix = 'http://id.unece.org/models/gsbpm/'
const NSIPrefix = 'http://id.unece.org/nsi/'

const regedPrefix = (prefix) => new RegExp(prefix + '(.*)')

/*
React router doesn't support dot (.) in the URL.
We have to translate dot in id to underscore,
and back.
*/
const pointToUnderscore = (str) => str.replace('.', '_')
const underscoreToPoint = (str) => str.replace('_', '.')

const routes = {
  // create: {
  //   pattern: 'create',
  //   paramsToProps:
  // }
  create: {
    pattern: 'create',
    uriToLink: () => 'create'
  },
  serviceDetails: {
    pattern: 'service/:serviceId',
    paramsToProps: (state, { serviceId }) => ({
      service: `${servicePrefix}${serviceId}`
    }),
    uriToLink: uri => {
      const seriveIdMatch = uri.match(regedPrefix(servicePrefix))
      if (!seriveIdMatch) throw new Error(
        `${uri} does not match the expected prefix ${servicePrefix}`
      )
      const serviceId = seriveIdMatch[1]
      return `/service/${serviceId}`
    }
  },
  GSIMClassDetails: {
    pattern: ':GSIMClass',
    paramsToProps: (state, { GSIMClass }) => ({
      GSIMClass: `${GSIMPrefix}${GSIMClass}`
    }),
    uriToLink: uri => {
      const GSIMClass = uri.match(regedPrefix(GSIMPrefix))[1]
      return `/gsim/${GSIMClass}`
    }
  },
  //TODO we should define these mappings in a hierarchical way, corresponding
  //to the hierarchy of routes defined in `Root` (to avoid mistakes like
  //defining a mapping for the pattern `gsbpm:GSBPMSub` instead of
  //`:GSBPMSub`)
  GSBPMSubProcessDetails: {
    pattern: 'subprocess/:GSBPMSub',
    paramsToProps: (state, { GSBPMSub }) => ({
      GSBPMSub: `${GSBPMPrefix}${underscoreToPoint(GSBPMSub)}`
    }),
    uriToLink: uri => {
      const GSBPMSubId = uri.match(regedPrefix(GSBPMPrefix))[1]
      return `/gsbpm/subprocess/${pointToUnderscore(GSBPMSubId)}`
    }
  },
  GSBPMPhaseDetails: {
    pattern: 'phase/:GSBPMPhase',
    paramsToProps: (state, { GSBPMPhase }) => ({
      GSBPMPhase: `${GSBPMPrefix}${underscoreToPoint(GSBPMPhase)}`
    }),
    uriToLink: uri => {
      const GSBPMPhaseId = uri.match(regedPrefix(GSBPMPrefix))[1]
      return `/gsbpm/phase/${pointToUnderscore(GSBPMPhaseId)}`
    }
  },
  NSIDetails: {
    pattern: ':NSIId',
    paramsToProps: (state, { NSIId }) => ({
      nsi: `${NSIPrefix}${NSIId}`
    }),
    uriToLink: uri => {
      const NSIId = uri.match(regedPrefix(NSIPrefix))[1]
      return `/nsis/${NSIId}`
    }
  }
}

export const {
  connectFromRoute,
  uriToLink,
  path,
  paramsToProps
} = buildRouterMapping(routes)
