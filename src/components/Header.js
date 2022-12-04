import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
        <nav className='relative justify-center container mx-auto  items-center  py-6 rounded-md font-bold place-content-center md:mx-auto' >
        <div className='flex justify-center '>
            <div className=' flex  md:flex' >
                <h1 className=' text-center md:text-6xl md:text-center font-extrabold  text-5xl ' style={{color:'#ffffff'}}>Crowdfunding Platform</h1>
            </div>
        
        </div>
      </nav> 
    )
  }
}
