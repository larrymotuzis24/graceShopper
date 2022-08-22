import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateUserRole, updateBook } from './store'

class UpdateProduct extends Component {
    constructor(){
        super()
        this.state = {
            show: false,
            title: '',
            author: '',
            price: ''
        },
            this.handleClose = this.handleClose.bind(this),
            this.handleShow = this.handleShow.bind(this),
            this.confirm = this.confirm.bind(this)
        }
        confirm(e){
            e.preventDefault()
            const book = {id: this.props.product.id, title: this.state.title, author: this.state.author, price: this.state.price * 1}
            this.props.update(book)
            this.setState({ title: '', author: '', price: '' })
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
                        <Modal.Title>Update {this.props.product.title}</Modal.Title>
                        <button onClick={() => this.setState({ show: !show })}> X </button>
                        </Modal.Header>
                        <Modal.Body>
                                <form>
                                    <input type='text' placeholder='Title' style={{marginBottom: '1%'}} onChange={(e)=> this.setState({ title: e.target.value })} />
                                    <input type='text' placeholder='Author' style={{marginBottom: '1%'}} onChange={(e)=> this.setState({ author: e.target.value })}/>
                                    <input type='text' placeholder='Price' style={{marginBottom: '1%'}} onChange={(e)=> this.setState({ price: e.target.value })}/>
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
        update: (book) => {
           dispatch(updateBook(book))
        }
    }
}
export default connect(mapState, mapDispatch)(UpdateProduct)