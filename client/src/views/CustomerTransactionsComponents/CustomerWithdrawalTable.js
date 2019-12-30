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

class CustomerWithdrawalTable extends React.Component {
  render () {
    let withdrawalData = this.props.withdrawalData;
    let getTotal = (withdrawalData) => {
        let totalAmountArray = withdrawalData.map((withdrawal) => {
          return withdrawal.amount;
        });
        let sum = 0;
        totalAmountArray.forEach((item) => {
          sum += item;
        });
        return sum;
      };
  
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
            {withdrawalData.map(withdrawal => (
              <TableRow key={withdrawal.customer_transaction_id}>
                <TableCell component="th" scope="row">
                  {withdrawal.description}
                </TableCell>
                <TableCell align="right">{withdrawal.amount}</TableCell>
                <TableCell align="right">{withdrawal.date_added}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Total($):</TableCell>
              <TableCell>{getTotal(withdrawalData)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CustomerWithdrawalTable;