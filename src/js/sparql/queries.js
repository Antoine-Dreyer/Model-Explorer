import {
  SKOSPrefix, ORGPrefix, VCARDPrefix, GSBPMPrefix, GSIMPrefix, RDFSPrefix, CSPAPrefix
} from './prefixes'

// TODO we might need to filter on the language, but for now English seems to be
// the only language available

/**
 * Builds the query that retrieves the list of NSIs.
 */
const NSIList = () => `
  PREFIX org: <${ORGPrefix}>
  PREFIX skos: <${SKOSPrefix}>

  SELECT ?nsi ?label
  WHERE {
    ?nsi a org:Organization ; skos:prefLabel ?label .
  }
  ORDER BY ?nsi
 `

 /**
  * Builds the query that retrieves the details on a given NSI.
  */
 const NSIDetails = (nsi) => `
   PREFIX org: <${ORGPrefix}>
   PREFIX skos: <${SKOSPrefix}>
   PREFIX vcard: <${VCARDPrefix}>

   SELECT ?name ?shortName ?address ?geo
   WHERE {
     <${nsi}> skos:prefLabel ?name .
     OPTIONAL {
       <${nsi}> skos:altLabel ?shortName .
     }
     OPTIONAL {
       <${nsi}> org:hasSite/org:siteAddress ?card .
       ?card vcard:street-address ?address ; vcard:hasGeo ?geo .
     }
   }
  `

/**
 * Builds the query that retrieves the GSBPM overview.
 */
const GSBPMDescription = () => `
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>
  SELECT ?phase ?phaseLabel ?subprocess ?subprocessLabel ?phaseCode
         ?subprocessCode ?subprocessDefinition
  WHERE {
   ?phase a gsbpm:Phase ;
          skos:narrower ?subprocess ;
   OPTIONAL {
     ?phase skos:prefLabel ?phaseLabel
   }
   OPTIONAL {
     ?subprocess skos:prefLabel ?subprocessLabel
	 }
   OPTIONAL {
     ?subprocess skos:definition ?subprocessDefinition
   }
   OPTIONAL {
     ?phase skos:notation ?phaseCode
   }
   OPTIONAL {
     ?subprocess skos:notation ?subprocessCode
   }
  }
 `

 /**
  * Builds the query that retrieves the list of CSPA services.
  */
const services = () => `
  PREFIX cspa:  <${CSPAPrefix}>
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT distinct ?service ?label ?description
  WHERE {
    ?service a cspa:package .
    OPTIONAL {?service cspa:label ?label}
	  OPTIONAL {?service cspa:hasPackageDefinition [
    	   a cspa:ServiceDefinition; cspa:aimsAt [cspa:description ?description]]}
  }
  ORDER BY ?label
`

/**
 * Builds the query that retrieves the details of a given CSPA service.
 */
const serviceDetails = service => `
  PREFIX cspa: <${CSPAPrefix}>
  PREFIX skos: <${SKOSPrefix}>

  SELECT
    ?label ?description ?outcomes ?subprocess ?restrictions ?graphName
    ?builderOrg
  WHERE {
    GRAPH ?graphName {
      <${service}>
        cspa:hasPackageDefinition [
    	     a cspa:ServiceDefinition; cspa:aimsAt [
             cspa:description ?description ;
    	        cspa:outcomes ?outcomes ;
    	        cspa:restrictions ?restrictions ]] ;
        cspa:hasPackageImplementation [
         	a cspa:ServiceImplementationDescription ;
            cspa:comesFrom [
              a cspa:Provenance ;
              cspa:builderOrganization [
              	cspa:organization ?builderOrg ]]] ;
    	  cspa:label ?label ;
    }
  }
`

/**
 * Builds the query that retrieves the GSBPM subprocess for a given service.
 */
//TODO investigate, we shouldn't need DISTINCT, should we ?
const serviceSubprocesses = service => `
  PREFIX cspa: <${CSPAPrefix}>
  PREFIX skos: <${SKOSPrefix}>

  SELECT DISTINCT ?sub ?label
  WHERE {
      <${service}>  cspa:hasPackageDefinition ?definition .
      ?definition cspa:aimsAt ?function .
      ?function  cspa:gsbpmSubProcess ?sub .
      ?sub       skos:prefLabel ?label
  }
`

/**
 * Builds the query that retrieves the list of all GSBPM subprocesses.
 */
const subprocesses = () => `
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT ?sub ?label ?code
  WHERE {
    ?sub a gsbpm:SubProcess ;
         skos:prefLabel ?label ;
         skos:notation ?code
  }
  ORDER BY ?code
`

/**
 * Builds the query that retrieves the list of GSIM inputs of a given CSPA service.
 */
const serviceInputs = service => `
  PREFIX cspa:  <${CSPAPrefix}>
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX rdfs:  <${RDFSPrefix}>

  SELECT DISTINCT ?gsimClass ?label ?definition
  WHERE {
      <${service}> a cspa:package ;
          cspa:label ?servicelabel ;
          cspa:hasPackageDefinition ?pckgDefinition .

      ?pckgDefinition
          cspa:definitionHasInput ?input .
      ?input cspa:gsimInput ?gsimClass .
      ?gsimClass rdfs:label ?label .
      ?gsimClass gsim:classDefinition ?definition
  }
`
/**
 * Builds the query that retrieves the list of GSIM outputs of a given CSPA service.
 */
const serviceOutputs = service => `
  PREFIX cspa:  <${CSPAPrefix}>
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX rdfs:  <${RDFSPrefix}>

  SELECT DISTINCT ?gsimClass ?label ?definition
  WHERE {
      <${service}> a cspa:package ;
          cspa:label ?servicelabel ;
          cspa:hasPackageDefinition ?pckgDefinition .

      ?pckgDefinition
          cspa:definitionHasOutput ?input .
      ?input cspa:gsimOutput ?gsimClass .
      ?gsimClass rdfs:label ?label .
      ?gsimClass gsim:classDefinition ?definition
  }
`

/**
 * Builds the query that retrieves the list of all GSIM groups.
 */
const GSIMGroups = () => `
  PREFIX gsim: <${GSIMPrefix}>
  PREFIX rdfs: <${RDFSPrefix}>

  SELECT ?group ?label WHERE {
  	?group rdfs:subClassOf gsim:GSIMObject .
    ?group rdfs:label ?label
  }
`

/**
 * Builds the query that retrieves the list of all GSIM objects of a given group.
 */
const GSIMClasses = group => `
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT ?GSIMClass ?label ?definition WHERE {
    ?GSIMClass rdfs:subClassOf <${group}> ;
               gsim:classDefinition ?definition ;
               rdfs:label ?label
  }
  ORDER BY ?label
`

/**
 * Builds the query that retrieves the list of all GSIM objects.
 */
const GSIMAllClasses = () => `
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT ?GSIMClass ?label ?definition WHERE {
    ?GSIMClass rdfs:subClassOf ?group ;
               gsim:classDefinition ?definition ;
               rdfs:label ?label .
    ?group rdfs:subClassOf gsim:GSIMObject
  }
`

/**
 * Builds the query that retrieves the list of all CSPA services with a given GSIM input.
 */
const servicesByGSIMInput = GSIMClass => `
  PREFIX cspa:  <${CSPAPrefix}>
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX rdfs:  <${RDFSPrefix}>

  SELECT DISTINCT ?service ?label
  WHERE {
    ?service a cspa:package ;
             cspa:label ?label ;
             cspa:hasPackageDefinition ?pckgDefinition .

    ?pckgDefinition cspa:definitionHasInput ?input .
    ?input cspa:gsimInput <${GSIMClass}>
  }
`

/**
 * Builds the query that retrieves the list of all CSPA services with a given GSIM output.
 */
const servicesByGSIMOutput = GSIMClass => `
  PREFIX cspa:  <${CSPAPrefix}>
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX rdfs:  <${RDFSPrefix}>

  SELECT DISTINCT ?service ?label
  WHERE {
    ?service a cspa:package ;
             cspa:label ?label ;
             cspa:hasPackageDefinition ?pckgDefinition .

    ?pckgDefinition cspa:definitionHasOutput ?input .
    ?input cspa:gsimOutput <${GSIMClass}>
  }
`

/**
 * Builds the query that retrieves the list of all CSPA services in a given GSBPM subprocess.
 */
const servicesByGSBPMSubProcess = (GSBPMSub) => `
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>
  PREFIX cspa:  <${CSPAPrefix}>

  SELECT ?service ?label WHERE {
    ?function cspa:gsbpmSubProcess <${GSBPMSub}> .
    ?definition cspa:aimsAt ?function .
    ?service cspa:hasPackageDefinition ?definition .
    ?service cspa:label ?label
  }
`

/**
 * Builds the query that retrieves the list of all CSPA services in a given GSBPM phase.
 */
const servicesByGSBPMPhase = (GSBPMPhase) => `
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>
  PREFIX cspa:  <${CSPAPrefix}>

  SELECT ?service ?label WHERE {
    <${GSBPMPhase}> skos:narrower ?subprocess .
    ?function cspa:gsbpmSubProcess ?subprocess .
    ?definition cspa:aimsAt ?function .
    ?service cspa:hasPackageDefinition ?definition .
    ?service cspa:label ?label
  }
`

/**
 * Builds the query that retrives the list of all the services in which a NSI
 * is involved
 */
const servicesByNSI = nsi => `
  PREFIX cspa: <${CSPAPrefix}>
  PREFIX rdfs:  <${RDFSPrefix}>
  
  SELECT ?service ?serviceLabel ?roleLabel
  WHERE {
    ?service a cspa:package ;
             cspa:label ?serviceLabel ;
    cspa:hasPackageImplementation [
    cspa:comesFrom [?role [ cspa:organization <${nsi}> ]]] .
    ?role rdfs:label ?roleLabel
  }
`
/**
 * Builds the query that retrieves the details for a GSIM class
 */
const GSIMClassDetails = GSIMClass => `
  PREFIX gsim: <${GSIMPrefix}>
  PREFIX rdfs:  <${RDFSPrefix}>

  SELECT ?label ?definition ?explanatoryText
  WHERE {
    <${GSIMClass}> rdfs:label ?label ;
                   gsim:classDefinition ?definition ;
    OPTIONAL { <${GSIMClass}>  gsim:classExplanatoryText ?explanatoryText }
  }
`

/**
 * Builds the query that retrieves the details for a GSBPM sub process
 */
const GSBPMSubProcessDetails = GSBPMSub => `
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT ?label ?code ?definition
  WHERE {
    <${GSBPMSub}> skos:prefLabel ?label ;
                  skos:notation ?code ;
                  skos:definition ?definition
  }
`

/**
 * Builds the query that retrieves the details for a GSBPM sub process
 */
const GSBPMPhaseDetails = GSBPMPhase => `
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT ?label ?code ?definition
  WHERE {
    <${GSBPMPhase}> skos:prefLabel ?label ;
                  skos:notation ?code ;
                  skos:definition ?definition
  }
`
/**
 * Builds the query that retrives all the organizations
 */
const organizations = () => `
  PREFIX org: <${ORGPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT ?org ?label
  WHERE {
    ?org a org:Organization ;
         skos:prefLabel ?label
  }
`
/**
 * Builds the query that retrives all the subprocesses for a GSBPM phase
 */
//TODO we retrieve twice the same information, see GSBPM description query.
//There might be a better option, but for now it's easier to use a global query
//to show the GSBPM explorer, and some dedicated queries to show all the
//subprocesses in a given GSBPM phase.
const SubsByGSBPMPhase = GSBPMPhase => `
PREFIX skos:  <${SKOSPrefix}>

SELECT ?subprocess ?label 
WHERE {
 <${GSBPMPhase}> skos:narrower ?subprocess .
 ?subprocess skos:prefLabel ?label
}
`
export default {
  NSIList,
  NSIDetails,
  GSBPMDescription,
  services,
  serviceDetails,
  serviceSubprocesses,
  serviceInputs,
  serviceOutputs,
  servicesByGSIMInput,
  servicesByGSIMOutput,
  servicesByNSI,
  subprocesses,
  GSIMClasses,
  GSIMAllClasses,
  servicesByGSBPMSubProcess,
  servicesByGSBPMPhase,
  GSIMGroups,
  GSIMClassDetails,
  GSBPMSubProcessDetails,
  GSBPMPhaseDetails,
  organizations,
  SubsByGSBPMPhase
}
