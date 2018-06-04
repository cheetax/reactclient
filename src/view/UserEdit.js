import React from 'react';
import './UserEdit.css'

const UserEdit = ({ selectedUser }) => {
    const Name = () => {
        return (
            <div>
                <div className="name input-field">
                    <input placeholder='укажите имя' id="first_name" type="text" className="validate" />
                    <label htmlFor="first_name">Имя</label>
                </div>
                <div className="name input-field">
                    <input placeholder='укажите фамилию' id="sur_name" type="text" className="validate" />
                    <label htmlFor="sur_name">Фамилия</label>
                </div>
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
                {selectedUser.roles.map((item, id) => <div key={id} style={{ fontWeight: '900', margin: '5px 0 0 0' }} >{item}</div>)}
            </div>
        )
    }

    return (
        (!selectedUser) ?
            <div className='valign-wrapper contact-info' >
                <div>
                    Добавление нового пользователя
                </div>
                <form>
                    <Name />
                </form>

            </div> :
            <div className='valign-wrapper contact-info' >
                <div>
                    Редактирование пользователя
                </div>

            </div>
    )
}

export default UserEdit;  