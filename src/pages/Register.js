import React, { Component } from 'react'
import DetailsForm from '../components/DetailsForm'
import HeaderCampaign from '../components/HeaderCampaign'

export default class Register extends Component {
  render() {
    return (

      <div className=' bg-fumbaHome h-[44.6rem]'>
        <HeaderCampaign />
        <DetailsForm />
      </div>
    )
  }
}
