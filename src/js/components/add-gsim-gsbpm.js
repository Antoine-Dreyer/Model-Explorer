import React, { Component , PropTypes} from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function AddButton({ disabled, hndlClick, label }) {
  return (
    <div className="form-group">
      <div className="col-sm-3 col-sm-offset-9">
        { !disabled && 
          <button 
            className="form-control btn btn-default btn-sm"
            onClick={e => { e.preventDefault(); hndlClick() }} >
          <span className="glyphicon glyphicon-plus"></span>&nbsp;
          {label}
        </button>
      }
      </div>
    </div>
  )
}

AddButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  hndlClick: PropTypes.func.isRequired
}

class AddGSIM_ extends Component {
  constructor() {
    super()
    this.state = {
      selected: ''
    }
    this.edit = () => this.setState({
      editing: true
    })
    this.hndlChange = val => this.setState({
      selected: val
    })
    this.ok = () => {
      this.setState({
        editing: false,
        selected: ''
      })
      //TODO fragile (we need to give back uri and label to make
      //`ServiceSubEntities` component work, see prop `uriName` and `label` in
      //`ServiceEditorDetails` call to `ServiceSubEntities`)
      if (!this.entitiesById) this.entitiesById = this.props.GSIMClasses.reduce(
        (_, { GSIMClass, label }) => {
          _[GSIMClass] = {
            label,
            gsimClass: GSIMClass
          }
          return _
        }, {})
      this.props.add(this.entitiesById[this.state.selected])
    }
    this.cancel = () => {
      this.setState({
        editing: false
      })
    }
  }
  render() {
    const { disabled, loaded, GSIMClasses, label } = this.props
    const { selected, editing } = this.state
    if (loaded !== LOADED) return <span>loading...</span>
    if (!editing) return <AddButton
      disabled={disabled} hndlClick={this.edit} label={label} />
    return (
      <div className="form-group">
        <div className="col-sm-6 col-sm-offset-3">
          <select className="form-control" value={selected}
              onChange={ e => this.hndlChange(e.target.value) }>
            <option key='__empty__' value=''></option>
            {
              GSIMClasses.map(({ GSIMClass, label }) => 
                <option key={GSIMClass} value={GSIMClass}>
                  { label }
                </option> )
            }
          </select>
      </div>
      <div className="col-sm-3 btn-toolbar">
        <button className="small-button btn btn-primary btn-sm pull-right"
            onClick={this.ok} disabled={selected === ''}>
            OK
        </button>
        <button className="small-button btn btn-danger btn-sm pull-right"
            onClick={this.cancel} >
          Cancel
        </button>
      </div>
    </div>
    )
  }
}

AddGSIM_.propTypes = {
  add: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export const AddGSIM = sparqlConnect.GSIMAllClasses(AddGSIM_)


class AddGSBPM_ extends Component {
  constructor() {
    super()
    this.state = {
      selected: ''
    }
    this.edit = () => this.setState({
      editing: true
    })
    this.hndlChange = val => this.setState({
      selected: val
    })
    this.ok = () => {
      this.setState({
        editing: false,
        selected: ''
      })
      //TODO fragile (we need to give back uri and label to make
      //`ServiceSubEntities` component work, see prop `uriName` and `label` in
      //`ServiceEditorDetails` call to `ServiceSubEntities`)
      if (!this.entitiesById) this.entitiesById = this.props.subs.reduce(
        (_, { sub, label }) => {
          _[sub] = {
            label,
            sub
          }
          return _
        }, {})
      this.props.add(this.entitiesById[this.state.selected])
    }
    this.cancel = () => {
      this.setState({
        editing: false
      })
    }
  }
  render() {
    const { disabled, loaded, subs, label } = this.props
    const { selected, editing } = this.state
    if (loaded !== LOADED) return <span>loading...</span>
    if (!editing) return <AddButton
      disabled={disabled} hndlClick={this.edit} label={label} />
    return (
      <div className="form-group">
        <div className="col-sm-6 col-sm-offset-3">
          <select className="form-control" value={selected}
              onChange={ e => this.hndlChange(e.target.value) }>
            <option key='__empty__' value=''></option>
            {
              subs.map(({ sub, label }) => 
                <option key={sub} value={sub}>
                  { label }
                </option> )
            }
          </select>
      </div>
      <div className="col-sm-3 btn-toolbar">
        <button className="small-button btn btn-primary btn-sm pull-right"
            onClick={this.ok} disabled={selected === ''}>
            OK
        </button>
        <button className="small-button btn btn-danger btn-sm pull-right"
            onClick={this.cancel} >
          Cancel
        </button>
      </div>
    </div>
    )
  }
}

AddGSBPM_.propTypes = {
  add: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export const AddGSBPM = sparqlConnect.subprocesses(AddGSBPM_)
