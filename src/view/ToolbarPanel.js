import React from 'react';
import './ToolbarPanel.css'

const ToolbarPanel = ({ onClick }) => {
    return (
        <div id='ToolbarPanel' >
            <div className='my-btn' >
                <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={onClick} ><i className="material-icons center" style={{ fontSize: '28px' }} >add</i></a>
            </div>
            <div className='my-btn' >
                <a className='waves-effect waves-teal btn-flat my-btn-flat' onClick={onClick} ><i className="material-icons center" style={{ fontSize: '28px' }} >add</i></a>
            </div>
        </div>
    )
}

export default ToolbarPanel;