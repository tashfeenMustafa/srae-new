import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <div>
      
      <Link to={"/"}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          Dashboard
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={"/orders"}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View Orders
        </span>}>
          <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={"/customers"}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View All Customers
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={"/paid-customers"}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View Paid Customers
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Paid Customers" />
          </ListItem>
        </Tooltip>
      </Link>
      <Link to={"/sellforvets-alltransactions"}>
        <Tooltip className="tooltip" title={<span style={{ fontSize: "15px", color: "white" }}>
          View Sell4Vets Referral and Order Transactions
        </span>}>
          <ListItem button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Sell4Vets Transactions" />
          </ListItem>
          </Tooltip>
      </Link>
    </div>
);

/*export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);*/
