import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Sell4VetsCustomerOrderBenefitTable from './Sell4VetsCustomerOrderBenefitTable';
import Sell4VetsCustomerReferralBenefitTable from './Sell4VetsCustomerReferralBenefitTable';
import Sell4VetsCustomerWithdrawalTable from './Sell4VetsCustomerWithdrawalTable';
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

class Sell4VetsCustomerTransactions extends React.Component {
    signal = axios.CancelToken.source();
    constructor (props) {
        super (props);
        this.state = {
            isLoading: false,
            customerTransactions: [],
            customerReferralBenefits: null,
            customerOrderBenefits: null,
            customerWithdrawalData: null
        };
    }

    componentDidMount () {
        console.log('Sell4VetsCustomerTransactions: Component Did Mount');
        this.onLoading();
    }

    componentWillUnmount () {
        this.signal.cancel('Sell4VetsCustomer Transactions: API is being cancelled');
        console.log('Unmounting Referral benefit table');
    }

    onLoading = async () => {
        try {
            console.log('onLoading: try block');
            this.setState({ isLoading: true });
            const { data } = await axios.get('/api/v1/customer_transaction_sell4vets', {
                cancelToken: this.signal.token,
            });
            console.log(data);
            this.setState({ customerTransactions: data.response, isLoading: true });
            console.log(this.state);
            let orderBenefits = []; 
            let referralBenefits = [];
            let withdrawalData = [];
            if (this.state.customerTransactions.length !== 0) {
                orderBenefits = this.state.customerTransactions.filter((customerTransaction) => {
                    if (customerTransaction.description.match(/Order ID:/)) {
                        return customerTransaction;
                    }
                });
                this.setState({
                    customerOrderBenefits: orderBenefits
                });
                console.log(this.state);
                referralBenefits = this.state.customerTransactions.filter((customerTransaction) => {
                    if (customerTransaction.description.match(/Customer ID:/)) {
                        return customerTransaction;
                    }
                });
                this.setState({ customerReferralBenefits: referralBenefits });
                console.log(this.state);
                withdrawalData = this.state.customerTransactions.filter((customerTransaction) => {
                    if (customerTransaction.description.match(/Withdrawal Amount/)) {
                        return customerTransaction;
                    }
                });
                this.setState({ customerWithdrawalData: withdrawalData });
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
        let orderBenefits = this.state.customerOrderBenefits;
        let referralBenefits = this.state.customerReferralBenefits;
        let withdrawalData = this.state.customerWithdrawalData;
        return (
            <div className={useStyles.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper>
                            <div className={useStyles.root}>
                                <Typography variant="h2" gutterBottom>
                                    All Sell4Vets Transactions
                                </Typography>
                            </div>
                        </Paper>
                        <br />
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper>
                            <div className={useStyles.root}>
                                <Typography variant="h4" gutterBottom>
                                    Sell4Vets Customer Referral Benefits
                                </Typography>
                            </div>
                            {referralBenefits && referralBenefits.length !== 0 ?
                                <Sell4VetsCustomerReferralBenefitTable referralBenefits={referralBenefits} />
                                : 'No Referral Benefits yet'
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper>
                            <div className={useStyles.root}>
                                <Typography variant="h4" gutterBottom>
                                   Sell4Vets Customer Order Benefits
                                </Typography>
                            </div>
                            {orderBenefits && orderBenefits.length !== 0 ?
                                <Sell4VetsCustomerOrderBenefitTable orderBenefits={orderBenefits} /> 
                                : 'No Order Benefits yet'
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6}>
                        <Paper>
                            <div className={useStyles.root}>
                                <Typography variant="h4" gutterBottom>
                                    Sell4Vets Customer Withdrawal from Order Benefits
                                </Typography>
                            </div>
                            {withdrawalData && withdrawalData.length !== 0 ?
                                <Sell4VetsCustomerWithdrawalTable withdrawalData={withdrawalData} /> 
                                : 'No Withdrawals yet'
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Sell4VetsCustomerTransactions;