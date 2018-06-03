import React from 'react';
import './ContactInfo.css'

const ContactInfo = ({selectedUser}) => {
    const Title = () => {
        return (
          <div className='title valign-wrapper' >
            <div>Контакт</div>
            <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={() => { }} ><i className="material-icons left"  >edit</i>Изменить</a>
          </div>
        )
      }
    const Phone = () => {
        return (
            <div className='phone valign-wrapper' >
              <div>Рабочий телефон</div>
              <div style={{fontWeight: '900', margin: '5px 0 0 0'}} >{selectedUser.phone}</div>
            </div>
          )
    }  

    const Email = () => {
        return (
            <div className='email valign-wrapper' >
              <div>Электронная почта</div>
              <div style={{fontWeight: '900', margin: '5px 0 0 0'}} >{selectedUser.email}</div>
            </div>
          )
    } 

    const Post = () => {
        return (
            <div className='post valign-wrapper' >
              <div>Должность</div>
              <div style={{fontWeight: '900', margin: '5px 0 0 0'}} >{selectedUser.post}</div>
            </div>
          )
    } 

    const Office = () => {
        return (
            <div className='office valign-wrapper' >
              <div>Местоположение офиса</div>
              <div style={{fontWeight: '900', margin: '5px 0 0 0'}} >{selectedUser.office}</div>
            </div>
          )
    } 

    const Roles = () => {
        return (
            <div className='roles valign-wrapper' >
              <div>Роли:</div>
              {selectedUser.roles.map(item => <div style={{fontWeight: '900', margin: '5px 0 0 0'}} >{item}</div>)}
            </div>
          )
    } 

    return (
      (selectedUser) ?
        <div className='valign-wrapper contact-info' >
            <Title />
            <Phone/>
            <Email/>
            <Post/>
            <Office/>
            <Roles/>
        </div> : null
    )
  }

export default ContactInfo;  