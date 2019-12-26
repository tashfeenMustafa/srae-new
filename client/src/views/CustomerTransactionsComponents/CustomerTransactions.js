import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CustomerOrderBenefitTable from './CustomerOrderBenefitTable';
import CustomerReferralBenefitTable from './CustomerReferralBenefitTable';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 500,
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
}));

class CustomerTransactions extends React.Component {
    signal = axios.CancelToken.source();
    constructor (props) {
        super (props);
        this.state = {
            isLoading: false,
            customerData: {},
            customerTransactions: [],
            customerReferralBenefits: null,
            customerOrderBenefits: null
        };
    }

    componentDidMount () {
        console.log('CustomerTransactions: Component Did Mount');
        let query = this.props.location.search;
        let params = new URLSearchParams(query);
        let customerID = params.get('customer_id');
        this.onLoading(customerID);
    }

    componentWillUnmount () {
        this.signal.cancel('Customer Transactions: API is being cancelled');
        console.log('Unmounting Referral benefit table');
    }

    onLoading = async (customerID) => {
        try {
            this.setState({ customerData: this.props.location.state });
            console.log('onLoading: try block');
            this.setState({ isLoading: true });
            const { data } = await axios.get('/api/v1/customer_transaction?customer_id=' + customerID, {
                cancelToken: this.signal.token,
            });
            console.log(data);
            this.setState({ customerTransactions: data.response, isLoading: true });
            console.log(this.state);
            let orderBenefits = []; 
            let referralBenefits = [];
            if (typeof this.state.customerTransactions.length !== 0) {
                orderBenefits = this.state.customerTransactions.filter((customerTransaction) => {
                    if (customerTransaction.description.match(/Order ID:/)) {
                        return customerTransaction;
                    }
                });
                this.setState({ customerOrderBenefits: orderBenefits });
                console.log(this.state);
                referralBenefits = this.state.customerTransactions.filter((customerTransaction) => {
                    if (customerTransaction.description.match(/Customer ID:/)) {
                        return customerTransaction;
                    }
                });
                this.setState({ customerReferralBenefits: referralBenefits });
                console.log(this.state);
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
        console.log('CustomerTransactions: render function');
        let customerID = this.state.customerData.customerData ? this.state.customerData.customerData.customer_id : '';
        let customerName = this.state.customerData.customerData ? this.state.customerData.customerData.firstname + ' ' + this.state.customerData.customerData.lastname : '0';
        let orderBenefits = this.state.customerOrderBenefits;
        let referralBenefits = this.state.customerReferralBenefits;
        return (
            <div className={useStyles.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <div className={useStyles.root}>
                                <Typography variant="h2" gutterBottom>
                                    Customer Transaction of {customerName}
                                </Typography>
                                <Typography variant="h4" gutterBottom>
                                    Customer ID: {customerID}
                                </Typography>
                            </div>
                        </Paper>
                        <br />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper>
                            <div className={useStyles.root}>
                                <Typography variant="h4" gutterBottom>
                                    Customer Referral Benefits
                                </Typography>
                            </div>
                            {referralBenefits && referralBenefits.length !== 0 ?
                                <CustomerReferralBenefitTable referralBenefits={referralBenefits} />
                                : 'No Referral Benefits yet'
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper>
                            <div className={useStyles.root}>
                                <Typography variant="h4" gutterBottom>
                                    Customer Order Benefits
                                </Typography>
                            </div>
                            {orderBenefits && orderBenefits.length !== 0 ?
                                <CustomerOrderBenefitTable orderBenefits={orderBenefits} /> 
                                : 'No Order Benefits yet'
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CustomerTransactions;