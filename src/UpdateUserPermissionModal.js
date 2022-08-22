import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateUser } from './store'
import Form from 'react-bootstrap/Form';


class UpdateUser extends Component {
    constructor(){
        super()
        this.state = {
            show: false,
            firstName: '',
            lastName: '',
            email: '',
            isAdmin: '',
            checked: false
        },
            this.handleClose = this.handleClose.bind(this),
            this.handleShow = this.handleShow.bind(this),
            this.confirm = this.confirm.bind(this),
            this.handleChange = this.handleChange.bind(this)
        }
        confirm(e){
            e.preventDefault()
            const user = {id: this.props.user.id, firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, isAdmin: true}
            this.props.update(user)
            this.setState({ firstName: '', lastName: '', email: '', checked: false })
            this.handleClose()
        }
        handleChange(){
            this.setState({ checked: true})
        }
        handleClose () {
            this.setState({ show: false })
        }
        handleShow () {
         this.setState({ show: true })
        }
  
      render() {
        const { show } = this.state
        const { handleClose, handleShow, confirm, handleChange } = this
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
                        <Modal.Title>Update {this.props.user.firstName}</Modal.Title>
                        <button onClick={() => this.setState({ show: !show })}> X </button>
                        </Modal.Header>
                        <Modal.Body>
                                <form>
                                    <input type='text'  placeholder='First Name' style={{marginBottom: '1%'}} onChange={(e)=> this.setState({ firstName: e.target.value })}/>
                                    <input type='text' placeholder='Last Name' style={{marginBottom: '1%'}}  onChange={(e)=> this.setState({ lastName: e.target.value })}/>
                                    <input type='text' placeholder='Email' style={{marginBottom: '1%'}}  onChange={(e)=> this.setState({ email: e.target.value })}/>
                                    <div style={{display: 'flex'}}>
                                    <Form.Check 
                                            style={{marginLeft: '-3%'}}
                                            type='checkbox'
                                            id={`default-checkbox`}
                                            label={`default checkbox`}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e)=> confirm(e)} >
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
            dispatch(updateUser(user))
        }
    }
}
export default connect(mapState, mapDispatch)(UpdateUser)