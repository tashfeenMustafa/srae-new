import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function HomeButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Tooltip title={"Home page of the Admin App. The page only shows the Dashboard and the menu to access other pages in the app."}>
            <Grid item xs={3}>
                <Link to={"/"}>
                    <Paper className={classes.paper}>
                        <DashboardIcon />
                        <Typography variant="h6">
                            Dashboard
                        </Typography>
                    </Paper>
                </Link>
            </Grid>
        </Tooltip>
        <Tooltip title={"Shows all orders ordered by any customer including order details, customer details, total customer profit, total owner profit of the respective order, and a button to view that order's products."}>
            <Grid item xs={3}>
                <Link to={"/orders"}>
                    <Paper className={classes.paper}>
                        <ShoppingCartIcon />
                        <Typography variant="h6">
                            Orders
                        </Typography>
                    </Paper>
                </Link>
            </Grid>
        </Tooltip>
        <Tooltip title={"Shows all customers, customer details and view transactions button which shows referral benefits, order benefits, and withdrawal of order benefits by that customer."}>
            <Grid item xs={3}>
                <Link to={"/customers"}>
                    <Paper className={classes.paper}>
                        <PeopleIcon />
                        <Typography variant="h6">
                            Customers
                        </Typography>
                    </Paper>
                </Link>
            </Grid>
        </Tooltip>
        <Tooltip title={"Same as Customers page but only shows Paid Customers."}>
            <Grid item xs={3}>
                <Link to={"/paid-customers"}>
                    <Paper className={classes.paper}>
                        <PeopleAltIcon />
                        <Typography variant="h6">
                            Paid Customers
                        </Typography>
                    </Paper>
                </Link>
            </Grid>
        </Tooltip>
        <Tooltip title={"Shows all transactions happening in Sell4Vets app, which is order benefits, referral benefits between customers and withdrawals of order benefits by all customers."}>
            <Grid item xs={3}>
                <Link to={"/sellforvets-alltransactions"}>
                    <Paper className={classes.paper}>
                        <AssignmentIcon />
                        <Typography variant="h6">
                            All Transactions
                        </Typography>
                    </Paper>
                </Link>
            </Grid>
        </Tooltip>
      </Grid>
    </div>
  );
}