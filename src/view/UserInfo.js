import React, { Component } from 'react';
import './UserInfo.css'

const UserInfo = ({selectedUser}) => {
    const avatar = () => {
        return (
          selectedUser.firstName.charAt(0) + selectedUser.surName.charAt(0)
        )
      }

    return (
      (selectedUser) ?
        <div className='valign-wrapper user-info' >
          <div className='circle grey darken-1 white-text valign-wrapper md-32 avatar' style={{ width: 85, height: 85 }} >{avatar()}</div>
          <div className='md-18 margin-18'>{selectedUser.firstName} {selectedUser.surName}</div>
        </div> : null
    )
  }

export default UserInfo;  