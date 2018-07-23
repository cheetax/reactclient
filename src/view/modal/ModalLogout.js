

export default ModalLogout = ({openModalLogout, }) => {
    return (
      <div >
        <div style={this.state.openModalLogout ? {
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
          this.setState({ openModalLogout: false })
        }}/>
        <div id='modal1' className='modal-more' style={this.state.openModalLogout ? {
          display: 'block',
          opacity: '1',
          top: '100%',
          margin: '5px 0px',
          width: '100%'
        } : null} >
          <div className='modal-more-menu' >
            <a className='modal-more-item' onClick={() => {}} >Настройки</a>
          </div>
          <hr size='1' width='100%' style={{margin: '0' }} />
          <div className='modal-more-menu' >
            <a className='modal-more-item' onClick={() => {
              this.btnLogout()
            }} >Выйти</a>
          </div>

        </div>
      </div>
    )
  }