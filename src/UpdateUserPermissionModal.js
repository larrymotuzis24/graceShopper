import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateUserRole } from './store'
class UpdateUserPermissionModal extends Component {
    constructor(){
        super()
        this.state = {
            show: false,
        },
            this.handleClose = this.handleClose.bind(this),
            this.handleShow = this.handleShow.bind(this),
            this.confirm = this.confirm.bind(this)
        }
        confirm(){
            const user = this.props.user
            this.props.update(user)
            this.handleClose()
        }
        handleClose () {
            this.setState({ show: false })
        }
        handleShow () {
         this.setState({ show: true })
        }
  
      render() {
        const { show } = this.state
        const { handleClose, handleShow, confirm } = this
        return (
          <div>
               <>
                    <div style={{ 
                        marginTop: '0px',
                        marginLeft: '12px'
                     }}variant="primary" onClick={handleShow}>
                        <div style={{ 
                             marginTop: '0px',
                             marginLeft: '12px'
                        }}>
                             <FontAwesomeIcon style={{display: 'inlineblock'}} icon="fa-solid fa-highlighter" /> 
                         </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                        <Modal.Title>Upgrade to Administrator?</Modal.Title>
                        <button onClick={() => this.setState({ show: !show })}> X </button>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                The user will then be upgraded to an admintrator. They can then make other other users Administrators.
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=> confirm()} >
                            Confirm
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
          </div>
        )
      }
}

const mapState = (state) => {
    return {
        users: state.users
    }
}
const mapDispatch = (dispatch) => {
    return {
        update: (user) => {
            dispatch(updateUserRole(user))
        }
    }
}
export default connect(mapState, mapDispatch)(UpdateUserPermissionModal)