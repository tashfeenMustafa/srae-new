import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

const styles = {
    tooltip: {
      color: "lightblue",
      backgroundColor: "green"
    }
};

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
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>Home page of the Admin App. The page only shows the Dashboard and the menu to access other pages in the app.</span>}>
            <Grid item xs={3}>
                <Link to={"/"}>
                    <Paper className={classes.paper}>
                        <DashboardIcon fontSize="large" />
                        <Typography variant="h6">
                            Dashboard
                        </Typography>
                    </Paper>
                </Link>
            </Grid>
        </Tooltip>
        <Tooltip title={<span style={{ fontSize: "15px", color: "white" }}>Shows all orders ordered by any customer including order details, customer details, total customer profit, total owner profit of the respective order, and a button to view that order's products.</span>}>
            <Grid item xs={3}>
                <Link to={"/orders"}>
                    <Paper className={classes.paper}>
                        <ShoppingCartIcon fontSize="large" />
                        <Typography variant="h6">
                            Orders
                        </Typography>
                    </Paper>
                </Link>
            </Grid>
        </Tooltip>
        <Tooltip title={<span style={{ fontSize: "15px", color: "white" }}>Shows all customers, customer details and view transactions button which shows referral benefits, order benefits, and withdrawal of order benefits by that customer.</span>}>
            <Grid item xs={3}>
                <Link to={"/customers"}>
                    <Paper className={classes.paper}>
                        <PeopleIcon fontSize="large" />
                        <Typography variant="h6">
                            Customers
                        </Typography>
                    </Paper>
                </Link>
            </Grid>
        </Tooltip>
        <Tooltip title={<span style={{ fontSize: "15px", color: "white" }}>Same as Customers page but only shows Paid Customers.</span>}>
            <Grid item xs={3}>
                <Link to={"/paid-customers"}>
                    <Paper className={classes.paper}>
                        <PeopleAltIcon fontSize="large" />
                        <Typography variant="h6">
                            Paid Customers
                        </Typography>
                    </Paper>
                </Link>
            </Grid>
        </Tooltip>
        <Tooltip title={<span style={{ fontSize: "15px", color: "white" }}>Shows all transactions happening in Sell4Vets app, which is order benefits, referral benefits between customers and withdrawals of order benefits by all customers.</span>}>
            <Grid item xs={3}>
                <Link to={"/sellforvets-alltransactions"}>
                    <Paper className={classes.paper}>
                        <AssignmentIcon fontSize="large" />
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