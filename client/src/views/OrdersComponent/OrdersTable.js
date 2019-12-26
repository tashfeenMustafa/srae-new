import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OrdersTableRow from './OrdersTableRow';
import axios from 'axios';

function OrdersTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Order ID</TableCell>
        <TableCell>Customer ID</TableCell>
        <TableCell>Customer Group</TableCell>
        <TableCell>Customer Name</TableCell>
        <TableCell>Customer Email</TableCell>
        <TableCell>Customer Telephone</TableCell>
        <TableCell>Payment Address</TableCell>
        <TableCell>Payment Method</TableCell>
        <TableCell>Total Paid</TableCell>
        <TableCell>Total Owner Profit</TableCell>
        <TableCell>Total Customer Profit</TableCell>
        <TableCell>Date Added</TableCell>
        <TableCell>View Orders</TableCell>
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));

class OrdersTable extends React.Component {
  signal = axios.CancelToken.source();

  constructor (props) {
    super (props);
    this.state = {
      isLoading: false,
      orders: [],
    };
  }

  componentDidMount () {
    this.onLoading();
  }

  componentWillUnmount () {
    this.signal.cancel('API is being cancelled');
    console.log('Unmounting OrdersTable');
  }

  onLoading = async () => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios.get('/api/v1/orders', {
        cancelToken: this.signal.token,
      });
      this.setState ({ orders: data.response });
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

    const orders = this.state.orders;
    let rows = orders.map((order) =>
      <OrdersTableRow order={order} key={order.order_id} />
    );

    return (
      <div className={useStyles.root}>
        <Paper className={useStyles.paper}>
          <Table className={useStyles.table} aria-label="order table">
              <OrdersTableHead />
              <TableBody>
                { rows }
              </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

}

export default OrdersTable;
