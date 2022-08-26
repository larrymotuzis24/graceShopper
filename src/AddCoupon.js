import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateUser, createProduct, fetchBooks, updateBookCoupon } from './store'


class AddCoupon extends Component {
    constructor(){
        super()
        this.state = {
            show: false,
            selectedBook: '',
            couponCode: '',
            percent: '',
            value: new Date()
        },
            this.handleClose = this.handleClose.bind(this),
            this.handleShow = this.handleShow.bind(this),
            this.confirm = this.confirm.bind(this),
            this.handleChange = this.handleChange.bind(this)
        }

        confirm(e){
            e.preventDefault()
            const coupon = {
                selectedBook: this.state.selectedBook, 
                coupon: this.state.couponCode,
                percent: this.state.percent * 1
            }
            this.props.createCoupon(coupon)
            this.setState({ 
                selectedBook: '', 
                couponCode: '', 
                percent: ''
             })
            this.handleClose()
        }
        handleSelect(date){
            console.log(date); // native Date object
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
        componentDidMount(){
            this.props.getBooks()
        }

      render() {
        const { show } = this.state
        const { handleClose, handleShow, confirm } = this;
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
                             <Button style={{float: 'right', marginLeft: '10px', marginTop: '4px', marginRight: '6px'}}> + Create Coupon Code </Button>
                         </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title> Create Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <form>
                                    <select onChange={(e) => this.setState({ selectedBook: e.target.value })}>
                                        <option> Select Product</option>
                                        {this.props.products.map(product => {
                                            return (
                                                <option> {product.title} </option>
                                            )
                                        })}
                                    </select>
                                    <input type='text' placeholder='Create Coupon Code' onChange={(e) => this.setState({ couponCode: e.target.value})}/>
                                    <input type='text' placeholder='Percentage off the product' onChange={(e) => this.setState({ percent: e.target.value})}/>
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
        users: state.users,
        products: state.books
    }
}
const mapDispatch = (dispatch) => {
    return {
        createCoupon: (coupon) => {
            dispatch(updateBookCoupon(coupon))
        },
        getBooks: () => {
            dispatch(fetchBooks())
        }
    }
}
export default connect(mapState, mapDispatch)(AddCoupon)