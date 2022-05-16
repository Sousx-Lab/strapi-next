import Navbar from './Navbar.jsx'
import React from 'react'
import PropTypes from 'prop-types'
/**
 * @param {React.ReactNode} children
 * @returns {React.ReactNode}
 */
export default function Layout ({ children }) {
  return (
    <>
      <Navbar />
        { children }
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}
