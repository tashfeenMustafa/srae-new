import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class OrdersTableRow extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      viewOrders: false
    }

    this.handleViewOrders = this.handleViewOrders.bind(this);
  }

  handleViewOrders() {
    this.setState((prevState) => ({
      viewOrders: !prevState.viewOrders
    }));
  }

  render () {
    let order = this.props.order;
    
    let getCustomerGroup = function (customerGroupID) {
      if (customerGroupID === 1) {
        return "Regular/General";
      }
      else if (customerGroupID === 2) {
        return "Veteran/Active Duty";
      }
      else if (customerGroupID === 3) {
        return "First Responder";
      }
      else if (customerGroupID === 4) {
        return "MemberPlus";
      }
    }
    
    return (
      <TableRow>
        <TableCell align="right"> { order.order_id } </TableCell>
        <TableCell align="right"> { order.customer_id } </TableCell>
        <TableCell align="right"> { getCustomerGroup(order.customer_group_id) } </TableCell>
        <TableCell align="right"> { order.firstname + ' ' + order.lastname } </TableCell>
        <TableCell align="right"> { order.email } </TableCell>
        <TableCell align="right"> { order.telephone } </TableCell>
        <TableCell align="right"> { order.payment_address_1 + ' ' + order.payment_address_2 + ' ' + order.payment_city + ' ' + order.payment_postcode + ' ' + order.payment_country + ' ' + order.payment_zone } </TableCell>
        <TableCell align="right"> { order.payment_method } </TableCell>
        <TableCell align="right"> { order.total } </TableCell>
        <TableCell align="right"> { order.total_owner_profit } </TableCell>
        <TableCell align="right"> { order.total_customer_profit } </TableCell>
        <TableCell align="right"> { order.date_added } </TableCell>
        <TableCell align="right">
          <Link to={'/orderproducts/?order_id=' + order.order_id + '&customer_id=' + order.customer_id}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={this.handleViewOrders}>
                View Orders
            </Button>
          </Link>
        </TableCell>
        
      </TableRow>
    );
  }
}

export default OrdersTableRow;
