import React from 'react';
import './Avatar.css'

const Avatar = ({ selectedUser, btnEdit }) => {

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
      <div className='circle grey darken-1 white-text valign-wrapper md-32 avatar' >{avatar()}</div>
      {/* <div  style={{height: '0px', alignSelf: 'flex-end' }} >
        <a className='waves-effect waves-light btn-floating btn-large my-btn-floating' onClick={() => btnEdit()} ><i className="material-icons"  >edit</i></a>

      </div>


      <div className='title'>{name()}</div> */}
    </div>
  )
}

export default Avatar;  