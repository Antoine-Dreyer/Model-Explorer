import React, { Component } from 'react'
import GSIMGroupSelector from './gsim-group-selector'
import { LOADED } from 'sparql-connect' 
import { sparqlConnect } from '../sparql/configure-sparql'
import { browserHistory, Link } from 'react-router'
import { uriToLink } from '../routes'
import classnames from 'classnames'

const ALL = 'ALL'
//TODO use group uri instead of label
//It allows to improve aesthetics for expected groups (and ensure order) to make
//the GSIM explorer looks like the image with the four colored squares.
const baseGroupLabel = 'Base'
const otherGroupLabels = [
  'Business', 'Exchange', 'Structures', 'Concepts'
]

class GSIMExplorer extends Component {
  constructor() {
    super()
    this.state = {
      selectedGroup: null
    }
    this.selectGroup = group => this.setState({
      selectedGroup: group
    })
  }
  render() {
    const { selectedGroup } = this.state
    return(
      <div className="gsim-explorer">
        <div>
          <GSIMSelectGroup 
            select={this.selectGroup}
            selectedGroup={selectedGroup}/>
        </div>
         { selectedGroup &&
           <div className="grow">
             <GSIMSelectClass group={selectedGroup} />
           </div>
         }
      </div>
    )
  }
}

function GSIMSelectClass_({ loaded, GSIMClasses, selectClass }){
  if (loaded !== LOADED) return <span>loading...</span>
  return (
    <div className="list-group">
      {
        GSIMClasses.map(({ GSIMClass, label }) =>
          <Link
            key={GSIMClass}
            className="list-group-item"
            to={uriToLink.GSIMClassDetails(GSIMClass)}>{label}</Link>)
    }
    </div>
  )
}

const GSIMSelectClass = sparqlConnect.GSIMClasses(GSIMSelectClass_)

function GSIMSelectGroup_({ loaded, selectedGroup, groups, select, unselect }) {
  if (loaded !== LOADED) return <span>loading...</span>
  const groupsByLabel = groups.reduce((_, group) => {
    _[group.label] = group
    return _
  }, {})
  
  const baseGroup = groupsByLabel[baseGroupLabel]
  const otherGroups = otherGroupLabels.map(label => groupsByLabel[label])
  
  const cnBase = `base-group-link ${selectedGroup && 'base-group-link-small'}`
  const cn = selectedGroup ? 'gsim-select-group-small' : 'gsim-select-group-full'
  return (
    <div className="gsim-select-group">
      <Link className={cnBase}
        onClick={e => { e.preventDefault(); select(baseGroup.group)}}>
        Base group
      </Link>
      <div className={cn}>
        { otherGroups.map(({ group, label }) => {
            const cn = classnames(
              `gsim-group-${label.toLowerCase()}`,
              group === selectedGroup && 'active')
            return (
              <div key={group}
                     className={cn}
                     onClick={() => select(group)}>
                  {label}
                </div> 
            )
          })
        }
        {
          selectedGroup && 
            <Link onClick={e => {e.preventDefault();select()}}>
              main explorer
            </Link>
        }
      </div>
    </div>
  )
}

const GSIMSelectGroup = sparqlConnect.GSIMGroups(GSIMSelectGroup_)

export default GSIMExplorer
