import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import OrdersTable from './OrdersTable';


const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

function Orders () {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper>
        <div className={useStyles.root}>
            <Typography variant="h2" gutterBottom>
                Orders Table
            </Typography>
        </div>
      </Paper>
      <Paper>
        <OrdersTable />
      </Paper>
    </Grid>
  );
}

export default Orders;
