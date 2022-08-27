import axios from 'axios';
import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchOrders, getTotalOrders } from './store';
class LineGraphChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: '',
      dates: '',
    };
    this.createMap = this.createMap.bind(this);
  }
  createMap() {
    const arr = new Array(12).fill(0);
    for (let i = 0; i < this.state.dates.length; i++) {
      let date = this.state.dates[i];
      if (date) {
        arr[date - 1] += 1;
      }
    }
    return arr;
  }
  async componentDidMount() {
    this.props.getOrders();
    const dates = this.props.orders.map(
      (order) => moment(order.createdAt).month() + 1
    );
    this.setState({ orders: this.props.orders, dates: dates }, () => {
      console.log(
        'on mount orders',
        this.state.orders,
        'on mount dates',
        this.state.dates
      );
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.orders.length !== this.props.orders.length) {
      const dates = this.props.orders.map(
        (order) => moment(order.createdAt).month() + 1
      );
      this.setState({ orders: this.props.orders, dates: dates }, () => {
        console.log(
          'on update',
          this.state.orders,
          'on update',
          this.state.dates
        );
      });
    }
  }
  render() {
    const options = {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'March',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'Sept',
          'October',
          'Nov',
          'December',
        ],
      },
    };
    const series = [
      {
        name: 'Orders',
        data: this.createMap(),
      },
    ];

    return (
      <div>
        <div >
          <div>
            <h4> Orders by Month </h4>
            <Chart
              options={options}
              series={series}
              type="line"
              width="100%"
              height="1000px"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    orders: state.orders || {},
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
    getOrders: () => dispatch(getTotalOrders()),
  };
};

export default connect(mapState, mapDispatch)(LineGraphChart);
