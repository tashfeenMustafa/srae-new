import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PaidCustomersTable from './PaidCustomersTable';

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
});

class PaidCustomers extends React.Component {
    render () {
        return (
            <Grid item xs={12} md={12} lg={12}>
                <Paper>
                    <div className={useStyles.root}>
                        <Typography variant="h2" gutterBottom>
                            Paid Customers
                        </Typography>
                    </div>
                </Paper>
                <Paper>
                    <PaidCustomersTable />
                </Paper>
            </Grid>
        );
    }
}

export default PaidCustomers;