import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createCoupon, fetchCoupons } from './store'


class AddCoupon extends Component {
    constructor(){
        super()
        this.state = {
            show: false,
            code: '',
            percentage: '',
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
                code: this.state.code,
                percentage: this.state.percentage * 1
            }
            this.props.createCoupon(coupon)
            this.setState({ 
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

      render() {
        const { show, code, percentage } = this.state
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
                        <Modal.Title> Create Coupon</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                                <form>
                                    <input type='text' placeholder='Create Coupon Code' onChange={(e) => this.setState({ code: e.target.value})}/>
                                    <input type='text' placeholder='Percentage off the product' onChange={(e) => this.setState({ percentage: e.target.value})}/>
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

const mapStateToProps = (state) =>{
    return {
        coupons: state.coupons
    }
}


const mapDispatch = (dispatch) => {
    return {
        createCoupon: (coupon) => {
            dispatch(createCoupon(coupon))
        }
    }
}
export default connect(mapStateToProps, mapDispatch)(AddCoupon)