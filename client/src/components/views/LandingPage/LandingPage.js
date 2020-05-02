import React from 'react'
import { FaCode } from "react-icons/fa";

function LandingPage() {
  return (
    <>
      <div className="app">
        <FaCode style={{ fontSize: '4rem' }} /><br />
        <span style={{ fontSize: '2rem' }}>Write a code!</span>
      </div>
    </>
  )
}

export default LandingPage