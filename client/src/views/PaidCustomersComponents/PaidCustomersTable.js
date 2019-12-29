import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PaidCustomersTableRow from './PaidCustomersTableRow';
import axios from 'axios';

function PaidCustomersTableHead() {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="right">Customer ID</TableCell>
          <TableCell align="right">Customer Group</TableCell>
          <TableCell align="right">First Name</TableCell>
          <TableCell align="right">Last Name</TableCell>
          <TableCell align="right">Customer Email</TableCell>
          <TableCell align="right">Customer Telephone</TableCell>
          <TableCell align="right">Referred By (Parent ID)</TableCell>
          <TableCell align="right">Date Added</TableCell>
          <TableCell align="right">View Customer Transactions</TableCell>
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
  

class PaidCustomersTable extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            customers: [],
        };
    }

    async componentDidMount () {
        const { data } = await axios.get('/api/v1/paidcustomers');
        this.setState ({ customers: data.response });
    }

    render () {
        const customers = this.state.customers;
        let rows = customers.map((customer) =>
            <PaidCustomersTableRow customer={customer} key={customer.customer_id} />
        );

        return (
            <div className={useStyles.root}>
                <Paper className={useStyles.paper}>
                    <Table className={useStyles.table} aria-label="order table">
                        <PaidCustomersTableHead />
                        <TableBody>
                            { rows }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default PaidCustomersTable;