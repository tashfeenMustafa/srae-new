import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

class CustomersTableRow extends React.Component {
    signal = axios.CancelToken.source();

    constructor (props) {
        super (props);
        this.state = {
          isLoading: false,
          referredBy: [],
        };
    }

    componentDidMount () {
      this.onLoading();
    }

    componentWillUnmount () {
      this.signal.cancel('CustomersTableRow: API is being cancelled');
      console.log('Unmounting CustomersTableRow Component'); 
    }

    onLoading = async () => {
      try {
        this.setState({ isLoading: true });
        const { data } = await axios.get('/api/v1/referredby?parent_id=' + this.props.customer.parent_id, {
          cancelToken: this.signal.token,
        });
        this.setState({ referredBy: data.response, isLoading: true });
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
        let customer = this.props.customer;
        let getCustomerGroup = function (customerGroupID) {
          if (customerGroupID === 1) {
            return "Regular/General";
          }
          else if (customerGroupID === 2) {
            return "Veteran/Active Duty";
          }
          else if (customerGroupID === 3) {
            return "First Responder";
          }
          else if (customerGroupID === 4) {
            return "MemberPlus";
          }
        }
        let customerParentName = this.state.referredBy.length === 0 ? this.props.customer.parent_id : this.state.referredBy[0].firstname + ' ' + this.state.referredBy[0].lastname;
          
        return (
            <TableRow>
                <TableCell align="right">{ customer.customer_id }</TableCell>
                <TableCell align="right">{ getCustomerGroup(customer.customer_group_id) }</TableCell>
                <TableCell align="right">{ customer.firstname }</TableCell>
                <TableCell align="right">{ customer.lastname }</TableCell>
                <TableCell align="right">{ customer.email }</TableCell>
                <TableCell align="right">{ customer.telephone }</TableCell>
                <TableCell align="right">{ customerParentName }</TableCell>
                <TableCell align="right">{ customer.date_added }</TableCell>
                <TableCell align="right">
                  <Tooltip title={<span style={{ fontSize: "15px", color: "white" }}>Shows referral benefits, order benefits, and withdrawals of that customer.</span>}>
                    <Link to={'/transactions/?customer_id=' + customer.customer_id + '&customer_firstname=' + customer.customer_firstname + '&customer_lastname=' + customer.customer_lastname}>
                      <Button 
                        variant="contained" 
                        color="primary">
                          View Transactions
                      </Button>
                    </Link>
                  </Tooltip>
                </TableCell>
            </TableRow>
        );
    }
}

export default CustomersTableRow;