import React, { Component } from "react";
import { connect } from "react-redux";
import { editUser } from "./store";

class UserAddress extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    };
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  save(ev) {
    ev.preventDefault();

    let address = [];

    if (!this.props.auth.secondaryAddress) {
      address.push(
        this.state.address.trim() +
          " " +
          this.state.city.trim() +
          " " +
          this.state.state +
          " " +
          this.state.zipCode.trim()
      );
    } else {
      address = [...this.props.auth.secondaryAddress];
      address.push(
        this.state.address.trim() +
          " " +
          this.state.city.trim() +
          " " +
          this.state.state +
          " " +
          this.state.zipCode.trim()
      );
    }

    const user = {
      id: this.props.auth.id,
      secondaryAddress: address,
    };

    this.props.editUser(user);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    const { address, city, state, zipCode } = this.state;
    const { states, auth, history } = this.props;
    const { save, onChange } = this;

    return (
      <main id="order-info" style={{height: '70vh'}}>
        <div id="order-info-div">
          <div id="shipping-info">
            <h3
              style={{
                margin: "40px",
                marginLeft: '10px'
              }}
            >
              Add an Address
            </h3>
            <form className="row g-3" onSubmit={save}>
              <div className="col-10" style={{ width: "100%" }}>
                <label htmlFor="address" className="form-label" style={{
                      marginRight: '93%'
                }}>
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
                  <label htmlFor="city" className="form-label" style={{
                      marginRight: '93%'
                }}>
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
                  <label htmlFor="state" className="form-label" style={{
                      marginRight: '93%'
                }}>
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
                  <label htmlFor="zipCode" className="form-label" style={{
                      marginRight: '93%',
                      whiteSpace: 'nowrap'
                }}>
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
                  className="btn btn-primary w-50"
                >
                  Save Address
                </button>
                <br/>
                <button
                  onClick={() => history.push("/user")}
                  className="btn btn-secondary w-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      //   <div id="user-address">
      //     {auth.id ? (
      //       <h2 className="user-name">
      //         Welcome, {auth.firstName} {auth.lastName}!
      //       </h2>
      //     ) : null}
      //     <form onSubmit={save}>
      //       <label htmlFor="address">Address</label>
      //       <input name="address" value={address} onChange={onChange} />
      //       <label htmlFor="city">City</label>
      //       <input name="city" value={city} onChange={onChange} />
      //       <label htmlFor="zipCode">Zip Code</label>
      //       <input name="zipCode" value={zipCode} onChange={onChange} />
      //       <label htmlFor="state">State</label>
      //       <select name="state" value={state} onChange={onChange}>
      //         <option value="">-- Select a State --</option>
      //         {states.map((state) => {
      //           return (
      //             <option key={state.id} value={state.name}>
      //               {state.name}
      //             </option>
      //           );
      //         })}
      //       </select>
      //       <button>Save Address</button>
      //       <button onClick={() => history.push("/user")}>Cancel</button>
      //     </form>
      //   </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAddress);
