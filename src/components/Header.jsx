import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: theme.shadows[0],
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

class Header extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <ToolBar className={classes.toolBar}>
            <IconButton>
              <Add />
            </IconButton>
            <Link to="/">
              <Button>Home</Button>
            </Link>
            <Link to="/about">
              <Button>About</Button>
            </Link>
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    appBar: PropTypes.string,
    toolBar: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Header);
