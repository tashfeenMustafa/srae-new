import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class PageHeader extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaperProps}>
          
        </Paper>
      </Grid>
    );
  }
}

export default Typography;
