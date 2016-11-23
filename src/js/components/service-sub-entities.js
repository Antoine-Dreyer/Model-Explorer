import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default function ServiceSubEntities(
    { entities, uriName, remove, disabled, noMsg, makeLink }) {
  if (entities.length === 0)
    return <span className="form-control">{noMsg}</span>
  return (
    <ul className="list-group" style={{ marginBottom: '5px' }}>
      { entities.map(entity => {
          const uri = entity[uriName]
          return (
            <li className="list-group-item" key={uri}>
              <Link to={makeLink(uri)}>
                {entity.label}
              </Link>
              { !disabled &&
               <Link className="pull-right"
                  onClick={() => remove(uri)} >
                 <span className="glyphicon glyphicon-remove"></span>
               </Link>
              }
            </li>
          )
        })
      }
    </ul>
  )
}

ServiceSubEntities.propTypes = {
  entities: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  noMsg: PropTypes.string.isRequired,
  makeLink: PropTypes.func.isRequired
}