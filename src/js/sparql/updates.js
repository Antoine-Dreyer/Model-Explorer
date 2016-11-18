import { insertUpdateService } from '../sparql/insert-update-service-query'
import { removeServiceQuery } from '../sparql/remove-service-query'
import { CSPANamed } from './prefixes'
//TODO improve, update helpers should be included in sparql-connect
//At initialization, `fetchQuery` is not available since we need the
//authentication token first (which will be set within the `authentication`
//module).
const fetchQueryHolder = {
  fetchQuery: null
}

export const setFetchQueryUpdate = fetchQuery =>
  fetchQueryHolder.fetchQuery = fetchQuery

export function createService(descr) {
  const { query, serviceURI } = insertUpdateService(descr)
  return fetchQueryHolder.fetchQuery(query)
          .then(() => serviceURI)
 }
 
 export function updateService(descr) {
   const { query, serviceURI } = insertUpdateService(descr, true)
   return fetchQueryHolder.fetchQuery(query)
           .then(() => serviceURI)
  }

export function removeService(serviceGraph) {
  return fetchQueryHolder.fetchQuery(removeServiceQuery(serviceGraph))
}