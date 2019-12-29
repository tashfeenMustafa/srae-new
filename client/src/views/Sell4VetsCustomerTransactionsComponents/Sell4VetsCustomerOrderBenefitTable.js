import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

class CustomerOrderBenefitTable extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    let orderBenefits = this.props.orderBenefits;
    let getTotal = (orderBenefits) => {
      let totalAmountArray = orderBenefits.map((benefits) => {
        return benefits.amount;
      });
      let sum = 0;
      totalAmountArray.forEach((item) => {
        sum += item;
      });
      console.log(sum);
      return sum;
    };

    return (
      <TableContainer component={Paper}>
        <Table className={useStyles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Transaction ID</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount ($)</TableCell>
              <TableCell align="right">Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderBenefits.map(benefits => (
              <TableRow key={benefits.customer_transaction_id}>
                <TableCell>{benefits.customer_transaction_id}</TableCell>
                <TableCell>{benefits.customer_id}</TableCell>
                <TableCell component="th" scope="row">
                  {benefits.description}
                </TableCell>
                <TableCell align="right">{benefits.amount}</TableCell>
                <TableCell align="right">{benefits.date_added}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Total($):</TableCell>
              <TableCell>{getTotal(orderBenefits)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CustomerOrderBenefitTable;