import React, { Component } from 'react';
import Avatar from './Avatar';
import Checkbox from '../components/checkbox';
import './UserEdit.css'

class UserEdit extends Component { // ({ selectedUser, btnSave }) =>

    constructor(props) {
        super(props)
        this.state = {
            user: props.selectedUser,
            openModal: false,
            openModalMore: false,
            roles: (() => {
                var roles = [];
                for (var roleKey in this.props.roles) {
                    roles.push(this.props.roles[roleKey])
                }
                return roles;
            })(),
            userRoles: [...props.selectedUser.roles],
        }
        this.modal = this.modal.bind(this);
        this._onCheckedRoles = this._onCheckedRoles.bind(this);
        this._onCheckedPassword = this._onCheckedPassword.bind(this);
        this._onAccepted = this._onAccepted.bind(this);

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
        var user = { ...this.state.user };
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
                        {this.state.roles.map((item) =>
                            <a key={item.id} className='collection-item'>
                                <label>
                                    <input id={item.id} checked={this.state.userRoles.includes(item.id)} type='checkbox' className="filled-in" onChange={this._onCheckedRoles} />
                                    <span></span>
                                </label>
                                {/* <Checkbox /> */}
                                {item.name}
                            </a>)}
                    </div>
                    <div className='footer' >
                        <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={() => this.setState({ openModal: false, userRoles: [...this.state.user.roles] })} >Закрыть</a>
                        <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={this._onAccepted} >Принять</a>

                    </div>
                </div>
            </div>
        )
    }

    modalMore = () => {
        return (
            <div >
                <div style={this.state.openModalMore ? {
                    position: 'fixed',
                    background: 'black',
                    opacity: '0.08',
                    top: '0px',
                    left: '0px',
                    width: '100%',
                    height: '100%',
                    zIndex: '999',
                } : null}
                onClick={() => {
                    this.setState({ openModalMore: false })
                  }}/>
                <div id='modal1' className='modal-more' style={this.state.openModalMore ? {
                    display: 'block',
                    opacity: '1',                    
                    padding: '8px 0px'
                } : null} >
                    <div className='modal-more-menu' >
                        <a className='modal-more-item' onClick={() => {
                            this.setState({ openModalMore: false })
                            this.props.btnDelete()
                        }} >Удалить</a>
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

                <div className='title-roles' >
                    <div>Роли:</div>
                    <div>
                        <a className='waves-effect waves-teal btn-flat my-btn-flat color-accent' onClick={() => this.setState({ openModal: true })} >
                            <div >
                                <i className="material-icons left"  >edit</i>
                                Изменить
                        </div>
                        </a>
                    </div>


                </div>
                {user.roles.map((item, id) => <div key={id} style={{ margin: '5px 0 0 0' }} >{this._rolesByID(item)}</div>)}
            </div>
        )
    }

    Password = () => {
        var user = this.state.user
        return (
            <div>
                <div className='my-checkbox'>
                    <div>Использовать пароль</div>
                    <div className='switch'>
                        <label>
                            <input checked={user.usePassword} type='checkbox' className="filled-in" onChange={this._onCheckedPassword} />
                            <span className="lever" ></span>
                        </label>
                    </div>

                </div>

                <div className='password-edit input-field' >
                    <input checked={user.usePassword} type='checkbox' className="filled-in" onChange={this._onCheckedPassword} />
                    <input id="password" value={user.password} disabled={!user.usePassword} type="password" className="" onChange={this.onChange} />
                    <label htmlFor="password" className={user.password ? 'active' : ''} >Пароль</label>
                </div>
            </div>

        )
    }

    btnEdit = (event) => {
        var x = event.target.currentTarget

    }

    _onCheckedRoles = (event) => {
        var roles = [...this.state.userRoles];
        if (event.target.checked) roles.push(event.target.id)
        else roles = roles.filter(item => item != event.target.id)
        this.setState({
            userRoles: roles,
        })
        console.log(event);
    }

    _onCheckedPassword = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                usePassword: event.target.checked,
            }
        })
    }

    _onAccepted = () => {
        this.setState({
            user: { ...this.state.user, roles: this.state.userRoles },
            openModal: false
        })
    }

    _rolesByID = (item) => {
        return this.props.roles[item].name
    }

    Buttons = () => {
        var user = this.state.user
        return (
            <div className='button-panel'>
                <a className='waves-effect waves-teal btn-flat' onClick={() => {
                    if (user !== null) this.props.btnSave(user)
                }} ></a>
                <a className='waves-effect waves-light btn' onClick={() => {
                    this.props.btnSave(null)
                }} >Отменить</a>
            </div>

        )
    }
    render() {
        var user = this.state.user
        return (

            <div className='valign-wrapper contact-info' >
                <div id='NamePanel' className='avatar-panel grey lighten-4' >
                    <div className='title-edit' >
                        <a className='btn-back my-btn-flating' onClick={() => {
                            this.props.btnSave(null)
                        }} ><i className="material-icons md-18">close</i></a>
                        <div className='header-edit' >
                            {(!this.props.selectedUser.id) ? 'Новый пользователь' : 'Изменить пользователя'}
                        </div>
                        <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={() => {
                            if (user !== null) this.props.btnSave(user)
                        }} >Сохранить</a>
                        <div style={{ position: 'relative' }} >
                            {this.modalMore(this)}
                            <a className='btn-back my-btn-flating' onClick={() => this.setState({ openModalMore: true })} >
                                <i className="material-icons md-18">more_vert</i>
                            </a>
                        </div>

                    </div>

                    <form className='edit' >
                        <Avatar selectedUser={this.props.selectedUser} />
                        <this.Name />
                        <this.Phone />
                        <this.Email />
                        <this.Post />
                        <this.Office />
                        <this.Password />
                        <this.Roles />
                    </form>
                </div>
            </div>
        )
    }
}

export default UserEdit;  