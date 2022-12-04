import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class MilestoneDetails extends Component {
  render() {
    return (
        <section id="mainContent">
        <div className="container py-7">
            <div className="flex justify-center">
                <h1 className="text-3xl text-center font-bold md:text-center">Wallet Address</h1>
            </div>
        </div>
        <div class="container  flex  justify-center px-8 mx-auto space-y-0 md:space-y-0 md:flex-row ">
            <div class="flex justify-center ">
                <div class="mx-auto text-2xl font-bold text-left  bg-fumbaSix m-10 md:m-6 p-6 md:p-4 rounded-md md:max-w-full md:max-h-full md:text-2xl md:text-left flex justify-center">
                      <form action="" method="post">
                        <div class="flex flex-col space-y-2 ">
        
                             <div class="flex flex-col space-y-2 text-center md:text-left">
                                  <label for="hashString">Milestone CID:</label>
                                  <input type="text" name="hashString" id="hashString"  class="border-2 bg-fumbaHome border-gstlColor  rounded-md p-2"/>
                             </div>
                             <div class="flex flex-col space-y-2 text-center md:text-left">
                                  <label for="duration">Voting Period:</label>
                                  <input type="number" name="duration" id="duration"  class="border-2 bg-fumbaHome border-gstlColor rounded-md p-2"/>
                             </div>
                             <div class="flex flex-col space-y-2 md:py-6 ">
                             <Link to={'/'} >    <button type="submit" class="bg-fumbaOne text-gstlColorText rounded-md p-2  items-center mx-32 ">Submit</button></Link>
                             </div>
                        </div>
                        </form>
                </div>
            </div>
            
        </div>
    </section>
    )
  }
}
