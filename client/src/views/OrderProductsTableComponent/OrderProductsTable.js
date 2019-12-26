import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OrderProductsTableRow from './OrderProductsTableRow';

function OrderProductsTableHead () {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="right">Order Product ID</TableCell>
                <TableCell align="right">Order ID</TableCell>
                <TableCell align="right">Product ID</TableCell>
                <TableCell align="right">Product Name</TableCell>
                <TableCell align="right">Product Model</TableCell>
                <TableCell align="right">Product Quantity</TableCell>
                <TableCell align="right">Product Manufacturer</TableCell>
                <TableCell align="right">Total Paid</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">Base Price</TableCell>
                <TableCell align="right">Owner Profit</TableCell>
                <TableCell align="right">Customer Profit</TableCell>
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

class OrderProductsTable extends React.Component {

    render () {
        const orderProducts = this.props.orderProducts;
        let rows = orderProducts.map((orderProduct) =>
            <OrderProductsTableRow orderProduct={orderProduct} key={orderProduct.order_product_id} />
        );

        return (
        <div className={useStyles.root}>
            <Paper className={useStyles.paper}>
                <Table className={useStyles.table} aria-label="order product table">
                    <OrderProductsTableHead />
                    <TableBody>
                        { rows }
                    </TableBody>
                </Table>
            </Paper>
        </div>
        );
    }
}

export default OrderProductsTable;