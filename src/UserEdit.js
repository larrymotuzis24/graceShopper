import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "./store";

class UserEdit extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      imageUrl: "",
      avatar: "",
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.el.addEventListener("change", (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.setState({ avatar: reader.result });
      });
      reader.readAsDataURL(file);
    });
    this.setState({
      firstName: this.props.auth.firstName,
      lastName: this.props.auth.lastName,
      email: this.props.auth.email,
      address: this.props.auth.address,
      city: this.props.auth.city,
      state: this.props.auth.state,
      zipCode: this.props.auth.zipCode,
    });
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  async save(ev) {
    ev.preventDefault();
    const user = {
      id: this.props.auth.id,
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      imageUrl: this.state.avatar,
    };

    try {
      if (
        !/^[a-zA-Z ]*$/g.test(user.firstName) ||
        !/^[a-zA-Z ]*$/g.test(user.lastName)
      ) {
        throw "First Name and Last Name must be alphabet characters";
      } else {
        await this.props.editUser(user);
      }
    } catch (error) {
      if (typeof error === "string") {
        this.setState({ error: error });
      } else {
        this.setState({ error: error.response.data.err.errors[0].message });
      }
    }
  }

  render() {
    const { auth, history, states } = this.props;
    const { firstName, lastName, email, address, error, zipCode, state, city } =
      this.state;
    const { onChange, save } = this;
    const { avatar } = this.state;

    return (
      <main id="order-info" style={{height: '70vh'}}>
        <div id="order-info-div">
          <div id="shipping-info">
            <h3
              style={{
                margin: "40px",
              }}
            >
              Edit Personal Information
            </h3>
            <form className="row g-3" onSubmit={save}>
              <div style={{ display: 'flex', alignItems:'center', justifyContent: "space-evenly" }}>
                {!avatar ? (
                  <img
                    src={auth.imageUrl}
                    style={{
                      width: '150px',
                      height: '150px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'top center',
                      borderRadius: '50%'
                    }}
                  ></img>
                ) : (
                  <img
                    src={avatar}
                    style={{
                      width: '150px',
                      height: '150px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'top center',
                      borderRadius: '50%'
                    }}
                  ></img>
                )}
                <input type="file" ref={(el) => (this.el = el)}></input>
                <label><span style={{ fontSize: '25px' }}>UPLOAD AVATAR</span></label>
              </div>
              <div
                className="col"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <input
                  placeholder="First Name"
                  value={firstName}
                  name="firstName"
                  onChange={onChange}
                  className="form-control"
                  style={{ width: "45%" }}
                ></input>
                <input
                  placeholder="Last Name"
                  value={lastName}
                  name="lastName"
                  onChange={onChange}
                  className="form-control"
                  style={{ width: "45%" }}
                ></input>
              </div>
              <div className="col-md-6" style={{ width: "100%" }}>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={onChange}
                  className="form-control"
                ></input>
              </div>
              <div className="col-10" style={{ width: "100%" }}>
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  placeholder="Address"
                  value={address}
                  name="address"
                  onChange={onChange}
                  className="form-control"
                ></input>
              </div>
              <div style={{ display: "flex" }}>
                <div className="col-md-6" style={{ margin: "3px" }}>
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={onChange}
                    className="form-control"
                  ></input>
                </div>
                <div className="col-md-4" style={{ margin: "3px" }}>
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select
                    name="state"
                    value={state}
                    onChange={onChange}
                    className="form-select"
                  >
                    <option value="">-- Select a State --</option>
                    {states.map((state) => {
                      return (
                        <option key={state.id} value={state.name}>
                          {state.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-2" style={{ margin: "3px" }}>
                  <label htmlFor="zipCode" className="form-label">
                    Zip Code
                  </label>
                  <input
                    placeholder="Zip Code"
                    value={zipCode}
                    name="zipCode"
                    onChange={onChange}
                    className="form-control"
                  ></input>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <button
                  disabled={!firstName || !lastName || !email || !address}
                  className="btn btn-primary w-50"
                >
                  Edit
                </button>
                <br/>
                <button onClick={() => history.push("/user")}
                  className="btn btn-secondary w-50"
                >
                  Cancel
                </button>
              </div>

              <pre>{error ? JSON.stringify(error) : null}</pre>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    editUser: (user) => dispatch(editUser(user, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
