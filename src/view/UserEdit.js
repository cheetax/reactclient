import React, { Component } from 'react';
import Avatar from './Avatar'
import './UserEdit.css'

class UserEdit extends Component { // ({ selectedUser, btnSave }) =>

    constructor(props) {
        super(props)
        this.state = {
            user: props.selectedUser,
            openModal: false,
            roles: (() => {
                var roles = [];
                for (var roleKey in this.props.roles) {
                    roles.push(this.props.roles[roleKey])
                }
                return roles;
            })(),
        }
        this.modal = this.modal.bind(this)
    }

    componentDidMount() {
        //  $('.dropdown-trigger').dropdown();
        //var x = $('.dropdown-button').dropdown();        
    }

    onChange = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.id]: event.target.value,
            }
        })
    }

    Name = () => {
        var user = this.state.user
        return (
            <div>
                <div className="name-edit input-field">
                    <input id="firstName" value={user.firstName} type="text" className="validate" onChange={this.onChange} />
                    <label htmlFor="firstName" className={user.firstName ? 'active' : ''}>Имя</label>
                </div>
                <div className="name-edit input-field">
                    <input id="surName" type="text" value={user.surName} className="validate" onChange={this.onChange} />
                    <label htmlFor="surName" className={user.surName ? 'active' : ''} >Фамилия</label>
                </div>
            </div>

        )
    }

    Phone = () => {
        var user = this.state.user
        return (
            <div className="phone-edit input-field">
                <input id="phone" value={user.phone} type="text" className="validate" onChange={this.onChange} />
                <label htmlFor="phone" className={user.phone ? 'active' : ''}>Телефон</label>
            </div>
        )
    }

    Email = () => {
        var user = this.state.user
        return (
            <div className='email-edit input-field' >
                <input id="email" value={user.email} type="email" className="validate" onChange={this.onChange} />
                <label htmlFor="email" className={user.email ? 'active' : ''} >Email</label>
            </div>
        )
    }

    Post = () => {
        var user = this.state.user
        return (
            <div className='post-edit input-field' >
                <input id="post" value={user.post} type="text" className="validate" onChange={this.onChange} />
                <label htmlFor="post" className={user.post ? 'active' : ''} >Должность</label>
            </div>
        )
    }

    Office = () => {
        var user = this.state.user
        return (
            <div className='office-edit input-field' >
                <input id="office" value={user.office} type="text" className="validate" onChange={this.onChange} />
                <label htmlFor="office" className={user.office ? 'active' : ''} >Местоположение офиса</label>
            </div>
        )
    }

    modal = () => {
        return (
            <div style={{ position: 'relative' }} >
                <div style={this.state.openModal ? {
                    position: 'fixed',
                    background: 'black',
                    opacity: '0.08',
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: '100%',
                    zIndex: '999',
                } : null} />
                <div id='modal1' className='modal-menu' style={this.state.openModal ? {
                    width: '280px',
                    display: 'block',
                    opacity: '1',
                } : null} >
                    <div className='header' >
                        Выберите роли:
                    </div>
                    <div className='collection'  >
                        {this.state.roles.map((item) => <a key={item.id} className='collection-item'>{item.name}</a>)}
                    </div>
                    <div className='footer' >
                        <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={() => {
                        }} >Отменить</a>
                        <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={() => {
                        }} >Сохранить</a>

                    </div>
                </div>
            </div>
        )
    }

    Roles = () => {
        var user = this.state.user
        return (
            <div className='roles-edit input-field' >
                {this.modal(this)}

                <div className='title' >
                    <div>Роли</div>
                    <div>
                        <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={() => this.setState({ openModal: true })} >
                            <div >
                                <i className="material-icons left"  >edit</i>
                                Изменить
                        </div>
                        </a>
                    </div>


                </div>
                {user.roles.map((item, id) => <div key={id} style={{ fontWeight: '900', margin: '5px 0 0 0' }} >{this._rolesByID(item)}</div>)}


            </div>
        )
    }

    btnEdit = (event) => {
        var x = event.target.currentTarget

    }

    _rolesByID = (item) => {
        return this.props.roles[item].name
    }

    Buttons = () => {
        var user = this.state.user
        return (
            <div className='button-panel'>
                <a className='waves-effect waves-light btn' onClick={() => {
                    if (user !== null) this.props.btnSave(user)
                }} >Сохранить</a>
                <a className='waves-effect waves-light btn' onClick={() => {
                    this.props.btnSave(null)
                }} >Отменить</a>
            </div>

        )
    }
    render() {
        return (

            <div className='valign-wrapper contact-info' >
                <div id='NamePanel' className='avatar-panel grey lighten-4' >
                    <div className='title-edit' >{(!this.props.selectedUser.id) ? 'Новый пользователь' : 'Редактирование пользователя'} </div>
                    <Avatar selectedUser={this.props.selectedUser} />
                    <form className='edit' >
                        <this.Name />
                        <this.Phone />
                        <this.Email />
                        <this.Post />
                        <this.Office />
                        <this.Roles />
                    </form>


                    <this.Buttons />
                </div>
            </div>
        )
    }
}

export default UserEdit;  