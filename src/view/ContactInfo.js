import React from 'react';
import Avatar from './Avatar'
import './ContactInfo.css'

const ContactInfo = ({ selectedUser, btnEdit, btnDelete, roles }) => {

  const name = () => {
    if (selectedUser) return selectedUser.firstName + ' ' + selectedUser.surName
    else '';
  }
  
  const Title = () => {
    return (
      <div className='title valign-wrapper' >
        {/* <div>Контакт</div> */}
        <div id='NamePanel' className='one-panel grey lighten-4' >
          {(selectedUser) ? <Avatar selectedUser={selectedUser} btnEdit={btnEdit} /> : null}
        </div>
        <div style={{ height: '0px', alignSelf: 'flex-end' }} >
          <a className='waves-effect waves-light btn-floating btn-large my-btn-floating' onClick={() => btnEdit()} ><i className="material-icons"  >edit</i></a>

        </div>


        <div className='name-user'>{name()}</div>
      </div>

    )
  }
  const Phone = () => {
    return (
      <div className='phone valign-wrapper' >
        <div>Рабочий телефон</div>
        <div style={{ fontWeight: '900', margin: '5px 0 0 0' }} >{selectedUser.phone}</div>
      </div>
    )
  }

  const Email = () => {
    return (
      <div className='email valign-wrapper' >
        <div>Электронная почта</div>
        <div style={{ fontWeight: '900', margin: '5px 0 0 0' }} >{selectedUser.email}</div>
      </div>
    )
  }

  const Post = () => {
    return (
      <div className='post valign-wrapper' >
        <div>Должность</div>
        <div style={{ fontWeight: '900', margin: '5px 0 0 0' }} >{selectedUser.post}</div>
      </div>
    )
  }

  const Office = () => {
    return (
      <div className='office valign-wrapper' >
        <div>Местоположение офиса</div>
        <div style={{ fontWeight: '900', margin: '5px 0 0 0' }} >{selectedUser.office}</div>
      </div>
    )
  }

  const Roles = () => {
    return (
      <div className='roles valign-wrapper' >
        <div>Роли:</div>
        {selectedUser.roles.map((item, id) => <div key={id} style={{ fontWeight: '900', margin: '5px 0 0 0' }} >{_rolesByID(item)}</div>)}
      </div>
    )
  }

  const _rolesByID = (item) => {
    return roles[item].name
  }

  return (
    (selectedUser) ?
      <div className='valign-wrapper contact-info' >
        <Title />
        <Phone />
        <Email />
        <Post />
        <Office />
        <Roles />
      </div> : null
  )
}

export default ContactInfo;  