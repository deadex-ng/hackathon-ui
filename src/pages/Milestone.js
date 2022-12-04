import React, { Component } from 'react'
import HeaderMilestone from '../components/HeaderMilestone'
import MilestoneDetails from '../components/MilestoneDetails'
export default class Milestone extends Component {
  render() {
    return (
        <div className=' bg-fumbaHome  h-[44.6rem] '>
        <HeaderMilestone />
        <MilestoneDetails />
      </div>
    )
  }
}
