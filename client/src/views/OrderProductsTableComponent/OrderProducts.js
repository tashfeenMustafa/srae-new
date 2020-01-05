import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import OrderProductsTable from './OrderProductsTable';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

class OrderProducts extends React.Component {
    signal = axios.CancelToken.source();

    constructor (props) {
        super (props);
        this.state = {
            orderProducts: [],
            customerDetails: {},
            productManufacturer: [],
            isLoading: false
        }
    }

    componentDidMount () {
        this.onLoading();
    }

    componentWillUnmount () {
        this.signal.cancel('API is being cancelled');
        console.log('Unmounting OrdersTable');
    }

    onLoading = async () => {        
        console.log(this.props.location)
        let query = this.props.location.search;
        let params = new URLSearchParams(query);
        let orderID = params.get('order_id');
        let customerID = params.get('customer_id');
        
        let { data } = await axios.get('/api/v1/orderproducts?order_id=' + orderID);
        this.setState({ orderProducts: data.response });
        data = await axios.get('/api/v1/customerdetails?customer_id=' + customerID);
        this.setState({ customerDetails: data.data.response[0] });
    }
    
    render () {
        let orderProducts = this.state.orderProducts;
        let customerDetails = this.state.customerDetails;
        let customerName = customerDetails ? this.state.customerDetails.firstname + ' ' + this.state.customerDetails.lastname : ' ';

        return (
            <Grid item xs={12} md={12} lg={12}>
                <Paper>
                    <div className={useStyles.root}>
                        <Typography variant="h2" gutterBottom>
                            Ordered Products By {customerName}
                        </Typography>
                    </div>
                </Paper>
                <Paper>
                    <OrderProductsTable orderProducts={orderProducts} />
                </Paper>
            </Grid>
        );
    }
}

export default OrderProducts;