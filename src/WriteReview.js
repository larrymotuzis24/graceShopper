import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ReactStars from 'react-stars'
import { render } from 'react-dom'
import { connect } from 'react-redux';
import { createRating, fetchReviews } from './store'
class WriteReview extends Component {
    constructor(){
        super()
        this.state = {
            show: false,
            reviewText: 'grgr',
            rating: 0
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.ratingChanged = this.ratingChanged.bind(this)
    }
    ratingChanged(newRating){
        this.setState({ rating: newRating })
    }
    handleClose(){
        const rating ={ 
            review: this.state.reviewText, 
            rating: this.state.rating * 1,
            productId:this.props.order.id,
            userId: this.props.auth.id,
            review_date: new Date()
        }
        this.props.addRating(rating)
        this.setState({ reviewText: '', rating: 0 })
        this.setState({ show: false })
    }
    handleShow(){
        this.setState({ show: true })
    }
  render() {
    const { handleClose, handleShow, ratingChanged} = this
    const { show } = this.state
    return (
      <div>
        <Button variant="primary" onClick={handleShow}>
            + Create Review
        </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4> Add a written review </h4>
            <form>
                <textarea 
                    onChange={(e) => this.setState({ reviewText: e.target.value})} 
                    placeholder="Did you enjoy the book or did you hate it? Let us know." 
                    name="paragraph_text" 
                    cols="50" 
                    rows="6"
                />
            </form>
            <h4> Overall rating</h4>
            <ReactStars
                count={5}
                value={this.state.rating}
                onChange={(rating) => ratingChanged(rating)}
                size={24}
                color2={'#ffd700'} 
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
  }
}


const mapState = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatch = (dispatch) => {
    return {
        addRating: (rating) => {
            dispatch(createRating(rating))
            dispatch(fetchReviews())
        }
    }
}

export default connect(mapState, mapDispatch)(WriteReview)