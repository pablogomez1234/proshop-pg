import React from 'react'
import {Twitter, Google, Facebook, Instagram } from 'react-bootstrap-icons'

function Footer() {
  return (
    <div>
      <footer className="bg-primary text-center text-white mt-5">
        <div className="container">
          <section className="">
            <Facebook className='m-5'/>
            <Twitter className='m-5'/>
            <Google className='m-5'/>
            <Instagram className='m-5'/>
          </section>
        </div>
      </footer>
    </div>
  )
}


export default Footer
