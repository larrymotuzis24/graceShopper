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

    let address = []

    if(!this.props.auth.secondaryAddress){
        address.push(this.state.address.trim() + " " +
        this.state.city.trim() + " " +
        this.state.state + " " + 
        this.state.zipCode.trim())
    }else{
        address = [...this.props.auth.secondaryAddress]
        address.push(this.state.address.trim() + " " +
        this.state.city.trim() + " " +
        this.state.state + " " + 
        this.state.zipCode.trim())
    }
    
    const user = {
      id: this.props.auth.id,
      secondaryAddress: address
    };

    this.props.editUser(user)
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    const { address, city, state, zipCode } = this.state;
    const { states, auth, history } = this.props;
    const { save, onChange } = this;

    return (
      <div id="user-address">
        {auth.id ? (
          <h2 className="user-name">
            Welcome, {auth.firstName} {auth.lastName}!
          </h2>
        ) : null}
        <form onSubmit={save}>
          <label htmlFor="address">Address</label>
          <input name="address" value={address} onChange={onChange} />
          <label htmlFor="city">City</label>
          <input name="city" value={city} onChange={onChange} />
          <label htmlFor="zipCode">Zip Code</label>
          <input name="zipCode" value={zipCode} onChange={onChange} />
          <label htmlFor="state">State</label>
          <select name="state" value={state} onChange={onChange}>
            <option value="">-- Select a State --</option>
            {states.map((state) => {
              return (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              );
            })}
          </select>
          <button>Save Address</button>
          <button onClick={() => history.push("/user")}>Cancel</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch, {history}) => {
  return {
      editUser: (user) => dispatch(editUser(user, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddress);
