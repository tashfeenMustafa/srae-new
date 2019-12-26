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
  render () {
    let orderBenefits = this.props.orderBenefits;
    return (
      <TableContainer component={Paper}>
        <Table className={useStyles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount ($)</TableCell>
              <TableCell align="right">Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderBenefits.map(benefits => (
              <TableRow key={benefits.customer_transaction_id}>
                <TableCell align="right">{benefits.date_added}</TableCell>
                <TableCell component="th" scope="row">
                  {benefits.description}
                </TableCell>
                <TableCell align="right">{benefits.amount}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Total($):</TableCell>
              <TableCell></TableCell>
              <TableCell>$$$</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CustomerOrderBenefitTable;