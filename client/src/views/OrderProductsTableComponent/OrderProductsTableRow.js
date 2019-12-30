import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

class OrderProductsTableRow extends React.Component {
  signal = axios.CancelToken.source();

  constructor (props) {
    super (props);
    this.state = {
      isLoading: false,
      manufacturerID: [],
      manufacturerName: [{
        name: ''
      }],
    };
  }

  componentDidMount () {
    this.onLoading();
  }

  componentWillUnmount () {
    this.signal.cancel('API is being cancelled');
    console.log('unmounting OrderProductsTableRow');
  }

  onLoading = async () => {
    try {
      this.setState({ isLoading: true });
      let productID = this.props.orderProduct.product_id;

      let { data } = await axios.get ('/api/v1/getmanufacturerid?product_id=' + productID, {
        cancelToken: this.signal.token,
      });
      this.setState({ manufacturerID: data.response, isLoading: true });
      
      let manufacturerID = this.state.manufacturerID[0] ? this.state.manufacturerID[0].manufacturer_id : 'No Manufacturer ID';
      
      if (manufacturerID !== 'No Manufacturer ID') {
        data = await axios.get('/api/v1/getmanufacturername?manufacturer_id=' + manufacturerID, {
          cancelToken: this.signal.token,
        });
        this.setState({ manufacturerName: data.data.response, isLoading: true });
      }
    }
    catch (err) {
      if (axios.isCancel(err)) {
        console.log('Error: ', err.message);
      }
      else {
        this.setState({ isLoading: false });
      }
    }
  }

  render () {
    let orderProduct = this.props.orderProduct;
    let manufacturerName;

    if (orderProduct.name === 'Military Membership') {
      manufacturerName = 'No Manufacturer for this product';
    }
    else {
      manufacturerName = this.state.manufacturerName[0].name;
    }

    return (
      <TableRow>
        <TableCell align="right"> { orderProduct.order_product_id } </TableCell>
        <TableCell align="right"> { orderProduct.order_id } </TableCell>
        <TableCell align="right"> { orderProduct.product_id } </TableCell>
        <TableCell align="right"> { orderProduct.name } </TableCell>
        <TableCell align="right"> { orderProduct.model } </TableCell>
        <TableCell align="right"> { orderProduct.quantity } </TableCell>
        <TableCell align="right"> { manufacturerName } </TableCell>
        <TableCell align="right"> { orderProduct.price } </TableCell>
        <TableCell align="right"> { orderProduct.total } </TableCell>
        <TableCell align="right"> { orderProduct.base_price } </TableCell>
        <TableCell align="right"> { orderProduct.owner_profit } </TableCell>
        <TableCell align="right"> { orderProduct.customer_profit } </TableCell>     
      </TableRow>
    );
  }
}

export default OrderProductsTableRow;