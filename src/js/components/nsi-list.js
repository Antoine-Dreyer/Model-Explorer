import React from 'react'
import { Link } from 'react-router'
import { uriToLink } from '../routes'

export default function NSIList({ nsis }) {

  if (nsis.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        Sorry, the NSI list is empty.
      </div>
    )

  return(
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Coutry</th>
          <th>Institute</th>
        </tr>
      </thead>
      <tbody>
        { nsis.map(({ nsi, label }) =>
          <tr key={nsi}>
            <td><a href={'http://dbpedia.org/resource/ISO_3166-2:' + nsi.slice(-2)}>{nsi.slice(-2)}</a></td>
            <td>
              <Link to={uriToLink.NSIDetails(nsi)}>
                { label }
              </Link>
            </td>
          </tr>)
        }
      </tbody>
    </table>
  )
}

NSIList.propTypes = {
  nsis: React.PropTypes.array.isRequired
}
