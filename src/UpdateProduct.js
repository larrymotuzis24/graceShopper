import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateUserRole, updateBook } from "./store";

class UpdateProduct extends Component {
  constructor() {
    super();
    (this.state = {
      show: false,
      title: "",
      author: "",
      publisher: "",
      year: "",
      description: "",
      inventory: "",
      rating: "",
      price: "",
      productCategoryId: ""
    }),
      (this.handleClose = this.handleClose.bind(this)),
      (this.handleShow = this.handleShow.bind(this)),
      (this.confirm = this.confirm.bind(this));
  }

  componentDidMount() {
    this.setState({
      title: this.props.product.title,
      author: this.props.product.author,
      publisher: this.props.product.publisher,
      year: new Date(this.props.product.year).getFullYear(),
      description: this.props.product.description,
      inventory: this.props.product.inventory,
      rating: this.props.product.rating,
      price: this.props.product.price,
      productCategoryId: this.props.product.productCategoryId
    });
  }

  confirm(e) {
    e.preventDefault();
    const book = {
      id: this.props.product.id,
      title: this.state.title,
      author: this.state.author,
      publisher: this.state.publisher,
      year: this.state.year,
      description: this.state.description,
      inventory: this.state.inventory,
      rating: this.state.rating,
      price: (this.state.price * 1).toFixed(2),
      productCategoryId: this.state.productCategoryId
    };
    this.props.update(book);
    // this.setState({ title: "", author: "", price: "" });
    this.handleClose();
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const {
      show,
      title,
      author,
      publisher,
      year,
      description,
      inventory,
      rating,
      price,
      productCategoryId
    } = this.state;
    const { handleClose, handleShow, confirm } = this;
    const { categories } = this.props;
    return (
      <div>
        <>
          <div
            style={{
              marginTop: "0px",
              marginLeft: "12px",
            }}
            variant="primary"
            onClick={handleShow}
          >
            <div
              style={{
                marginTop: "0px",
                marginLeft: "12px",
              }}
            >
              <FontAwesomeIcon
                style={{ display: "inlineblock" }}
                icon="fa-solid fa-highlighter"
              />
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Update {this.props.product.title}</Modal.Title>
              <button onClick={() => this.setState({ show: !show })}>
                {" "}
                X{" "}
              </button>
            </Modal.Header>
            <Modal.Body>
              <form>
                <select
                  name="category"
                  value={productCategoryId}
                  onChange={(ev) => this.setState({ productCategoryId: ev.target.value })}
                  className="form-select"
                >
                  <option value="">-- Select a Category --</option>
                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.category}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  style={{ marginBottom: "1%" }}
                  onChange={(ev) => this.setState({ title: ev.target.value })}
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={author}
                  style={{ marginBottom: "1%" }}
                  onChange={(ev) => this.setState({ author: ev.target.value })}
                />
                <input
                  type="text"
                  placeholder="Publisher"
                  value={publisher}
                  style={{ marginBottom: "1%" }}
                  onChange={(ev) =>
                    this.setState({ publisher: ev.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={year}
                  style={{ marginBottom: "1%" }}
                  onChange={(ev) => this.setState({ year: ev.target.value })}
                />
                <textarea
                  type="text"
                  placeholder="Description"
                  value={description}
                  style={{ marginBottom: "1%" }}
                  onChange={(ev) =>
                    this.setState({ description: ev.target.decoration })
                  }
                />
                <input
                  type="text"
                  placeholder="Inventory"
                  value={inventory}
                  style={{ marginBottom: "1%" }}
                  onChange={(ev) =>
                    this.setState({ inventory: ev.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Rating"
                  value={rating}
                  style={{ marginBottom: "1%" }}
                  onChange={(ev) => this.setState({ rating: ev.target.rating })}
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  style={{ marginBottom: "1%" }}
                  onChange={(ev) => this.setState({ price: ev.target.value })}
                />
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={(e) => confirm(e)}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    categories: state.categories
  };
};
const mapDispatch = (dispatch) => {
  return {
    update: (book) => {
      dispatch(updateBook(book));
    },
  };
};
export default connect(mapState, mapDispatch)(UpdateProduct);
