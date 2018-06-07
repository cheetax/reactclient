import React, { Component } from 'react';
import './Avatar.css'

const Avatar = ({ selectedUser }) => {

  const avatar = () => {
    if (selectedUser) return selectedUser.firstName.charAt(0) + selectedUser.surName.charAt(0);
    else return '';
  }

  const name = () => {
    if (selectedUser) return selectedUser.firstName + ' ' + selectedUser.surName
    else '';
  }

  return (
    <div className='valign-wrapper user-info' >
      <div className='circle grey darken-1 white-text valign-wrapper md-32 avatar' style={{ minWidth: 85, minHeight: 85 }} >{avatar()}</div>
      <div className='md-18 margin-18'>{name()}</div>
    </div>
  )
}

export default Avatar;  