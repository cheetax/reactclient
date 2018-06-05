import React from 'react';
import Avatar from './Avatar'
import './UserEdit.css'

const UserEdit = ({ selectedUser, btnSave }) => {

    var user = selectedUser;

    const onChange = (event) => {
        user = {
            ...user,
            [event.target.id]: event.target.value,
        }
    }

    const Name = () => {
        return (
            <div>
                <div className="name-edit input-field">
                    <input id="firstName" type="text" className="validate" onChange={onChange} />
                    <label htmlFor="firstName">Имя</label>
                </div>
                <div className="name-edit input-field">
                    <input id="surName" type="text" className="validate" onChange={onChange}/>
                    <label htmlFor="surName">Фамилия</label>
                </div>
            </div>

        )
    }
    const Phone = () => {
        return (
            <div className="phone-edit input-field">
                <input id="phone" type="text" className="validate" onChange={onChange}/>
                <label htmlFor="phone">Телефон</label>
            </div>
        )
    }

    const Email = () => {
        return (
            <div className='email-edit input-field' >
                <input id="email" type="email" className="validate" onChange={onChange}/>
                <label htmlFor="email">Email</label>
            </div>
        )
    }

    const Post = () => {
        return (
            <div className='post-edit input-field' >
                <input id="post" type="text" className="validate" onChange={onChange}/>
                <label htmlFor="post">Должность</label>
            </div>
        )
    }

    const Office = () => {
        return (
            <div className='office-edit input-field' >
                <input id="office" type="text" className="validate" onChange={onChange}/>
                <label htmlFor="office">Местоположение офиса</label>
            </div>
        )
    }

    const Roles = () => {
        return (
            <div className='roles-edit input-field' >
                <div>Роли:</div>
                {selectedUser.roles.map((item, id) => <div key={id} style={{ fontWeight: '900', margin: '5px 0 0 0' }} >{item}</div>)}
            </div>
        )
    }

    const Buttons = () => {

        return (
            <div className='button-panel'>
                <a className='waves-effect waves-light btn' onClick={() => {
                    if (user !== null) btnSave(user)
                }} >Сохранить</a>
                <a className='waves-effect waves-light btn' onClick={() => { 
                    btnSave(null)
                }} >Отменить</a>
            </div>

        )
    }

    return (
        (!selectedUser) ?
            <div className='valign-wrapper contact-info' >

                <div id='NamePanel' className='avatar-panel grey lighten-4' >
                    <div className='title-edit' >Новый пользователь</div>
                    <Avatar selectedUser={selectedUser} />
                    <form className='edit' >
                        <Name />
                        <Phone />
                        <Email />
                        <Post />
                        <Office />
                        {/* <Roles/> */}
                        <Buttons />
                    </form>
                </div>


            </div> :
            <div className='valign-wrapper contact-info' >
                <div>
                    Редактирование пользователя
                </div>

            </div>
    )
}

export default UserEdit;  