import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateUser, createProduct } from './store'
import Form from 'react-bootstrap/Form';


class AddProduct extends Component {
    constructor(){
        super()
        this.state = {
            show: false,
            title: '',
            author: '',
            publisher: '',
            year: '',
            inventory: '',
            rating: '',
            price: '',
            imageUrl: '',
            description: ''
        },
            this.handleClose = this.handleClose.bind(this),
            this.handleShow = this.handleShow.bind(this),
            this.confirm = this.confirm.bind(this),
            this.handleChange = this.handleChange.bind(this)
        }
        confirm(e){
            e.preventDefault()
            const product = {
                title: this.state.title, 
                author: this.state.author, 
                publisher: this.state.publisher, 
                year: this.state.year * 1,
                inventory: this.state.inventory * 1,
                rating: this.state.rating * 1,
                price: this.state.price *1, 
                imageUrl: this.state.imageUrl,
                description: this.state.description,
                id: Math.floor(Math.random() * (10000000 - 50) + 50)
            }
            this.props.create(product)
            this.setState({ 
                title: '', 
                author: '', 
                publisher: '', 
                year: '',
                inventory: '',
                rating: '',
                price: '', 
                imageUrl: '',
                description: ''
             })
            this.handleClose()
        }
        handleChange(){
            this.setState({ checked: !this.state.checked})
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
                        <Modal.Title> Create User</Modal.Title>
                        <button onClick={() => this.setState({ show: !show })}> X </button>
                        </Modal.Header>
                        <Modal.Body>
                                <form>
                                    <input type='text' placeholder='title' style={{marginBottom: '1%'}} onChange={(e)=> this.setState({ title: e.target.value })}/>
                                    <input type='text' placeholder='author' style={{marginBottom: '1%'}}  onChange={(e)=> this.setState({ author: e.target.value })}/>
                                    <input type='text' placeholder='publisher' style={{marginBottom: '1%'}}  onChange={(e)=> this.setState({ publisher: e.target.value })}/>
                                    <input type='text' placeholder='year' style={{marginBottom: '1%'}}  onChange={(e)=> this.setState({ year: e.target.value })}/>
                                    <input type='text' placeholder='inventory' style={{marginBottom: '1%'}}  onChange={(e)=> this.setState({ inventory: e.target.value })}/>
                                    <input type='text' placeholder='rating' style={{marginBottom: '1%'}}  onChange={(e)=> this.setState({ rating: e.target.value })}/>
                                    <input type='text' placeholder='price' style={{marginBottom: '1%'}}  onChange={(e)=> this.setState({ price: e.target.value })}/>
                                    <input type='text' placeholder='imageUrl' style={{marginBottom: '1%'}}  onChange={(e)=> this.setState({ imageUrl: e.target.value })}/>
                                    <input type='text' placeholder='description' style={{marginBottom: '1%'}}  onChange={(e)=> this.setState({ description: e.target.value })}/>
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
        create: (product) => {
            dispatch(createProduct(product))
        }
    }
}
export default connect(mapState, mapDispatch)(AddProduct)