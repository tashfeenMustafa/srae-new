import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CustomersTable from './CustomersTable';

const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: 500,
    },
});

class Customers extends React.Component {
    render () {
        return (
            <Grid item xs={12} md={12} lg={12}>
                <Paper>
                    <div className={useStyles.root}>
                        <Typography variant="h2" gutterBottom>
                            Customers
                        </Typography>
                    </div>
                </Paper>
                <Paper>
                    <CustomersTable />
                </Paper>
            </Grid>
        );
    }
}

export default Customers;