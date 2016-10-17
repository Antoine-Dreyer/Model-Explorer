import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { uriToLink } from '../routes'
import { createService } from '../sparql/updates'
import ServiceEditorDetails from './service-editor-details'
import { removeInArrByKey, addInArr } from '../utils/arrays'

export default class ServiceCreator extends Component {
  constructor() {
    super()
    
    this.state = {
      label: '',
      description: '',
      outcomes: '',
      restrictions: '',
      subs: [],
      inputs: [],
      outputs: []
    }
    //TODO DRY with `Service` component
    this.editUtils = {
      hndlLabelChange: label => this.setState({ label }),
      hndlDescriptionChange: description => this.setState({ description }),
      hndlOutcomesChange: outcomes => this.setState({ outcomes }),
      hndlRestrictionsChange: restrictions => this.setState({ restrictions }),
      addInput: input => this.setState({
        inputs: addInArr(this.state.inputs, input)
      }),
      addOutput: output => this.setState({
        outputs: addInArr(this.state.outputs, output)
      }),
      addSubprocess: subprocess => this.setState({
        subs: addInArr(this.state.subs, subprocess)
      }),
      removeInput: input => this.setState({
        inputs: removeInArrByKey(this.state.inputs, input, 'gsimClass')
      }),
      removeOutput: output => this.setState({
        outputs: removeInArrByKey(this.state.outputs, output, 'gsimClass')
      }),
      removeSubprocess: subprocess => this.setState({
        subs: removeInArrByKey(this.state.subs, subprocess, 'sub')
      })
    }
    
    this.create = () => {
      const  {
        label, description, outcomes, restrictions, inputs, outputs, subs
      } = this.state
      const descr = {
        label, description, outcomes, restrictions,
        inputs: inputs.map(({ gsimClass }) => gsimClass),
        outputs: outputs.map(({ gsimClass }) => gsimClass),
        subs: subs.map(({ sub }) => sub)
      }
      return createService(descr)
        .then(uri => {
          browserHistory.push(uriToLink.serviceDetails(uri))
        })
    }
    
    const cancel = () => browserHistory.push('')
    const commit = descr => this.setState({
      descr
    })
    
  }
  
  render() {
    const descr = this.state
    return (
      <form className="form-horizontal">
        <ServiceEditorDetails 
          descr={descr} editing={true} editUtils={this.editUtils} />
        <div className="btn-toolbar pull-right">
          <button className="btn btn-primary"
                  onClick={e => { e.preventDefault(); this.create() }}>
            <span className="glyphicon glyphicon-save"></span>&nbsp;
            Create
          </button>
          <button className="btn btn-danger"
                  onClick={e => { e.preventDefault(); this.cancel() }}>
            <span className="glyphicon glyphicon-remove"></span>&nbsp;
            Cancel
          </button>
        </div>
      </form>
    )
  }
}
