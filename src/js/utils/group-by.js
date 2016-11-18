const takeProps = (entry, props) =>
  props.reduce((filteredEntry, prop) => {
    filteredEntry[prop] = entry[prop]
    return filteredEntry
  }, {})
  
const leaveProps = (entry, ...remove) =>
  Object.keys(entry).reduce((filteredEntry, prop) => {
    if (remove.indexOf(prop) === -1) filteredEntry[prop] = entry[prop]
    return filteredEntry
  }, {})

/**
 * Utility function to transform an array of results with multiple entries for
 * the same id to an object with an entry per id
 */
//TODO add documentation
export function groupBy(results, key, ...props) {
  // no order for now
  return results.reduce((groups, entry) => {
    const keyValue = entry[key]
    if (!groups.hasOwnProperty(keyValue)) groups[keyValue] = {
      props: takeProps(entry, props),
      entries: []
    }
    groups[keyValue].entries.push(leaveProps(entry, key, ...props))
    return groups
  }, {})
}

//It does not value the ordering of the initial results (as a consequence of an
//ORDER BY statement in the sparql query): sorting is fast on the client, we
//can lose the order with `groupBy` and create then again with this function.
//`sortingKey` should be in the props (ie, it should information related to the
//entity we group by)
export function groupByWithOrder(results, key, sortingKey, ...props) {
  // no order for now
  const gByRslts = groupBy(results, key, ...props)
  const gByRsltsArr = Object.keys(gByRslts).reduce((arr, rsltKey) => {
    const { props, entries } = gByRslts[rsltKey]
    const refinedResult = {
      id: rsltKey,
      props,
      entries
    }
    arr.push(refinedResult)
    return arr
  }, [])
  return gByRsltsArr.sort((a, b) => {
    const left = a.props[sortingKey]
    const right = b.props[sortingKey]
    return right < left ? 1 :
           right === left ? 0 :
           -1
        
  })
  
}