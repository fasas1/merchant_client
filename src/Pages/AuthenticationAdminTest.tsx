import React from 'react'
import withAdminAuth from '../HOC/withAdminAuth'

function AuthenticationAdminTest() {
  return (
    <div>This page can be accessed by logged in Admin</div>
  )
}

export default withAdminAuth(AuthenticationAdminTest)