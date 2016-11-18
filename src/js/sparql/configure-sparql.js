import queries from './documented-queries'
import { buildSparqlConnector } from 'sparql-connect'

export const {
  flush,
  sparqlConnect, 
  mainReducer,
  setFetchQuery
} = buildSparqlConnector(queries)
