import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as PlayerActions from '../actions/player';
import * as UserActions from '../actions/user';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    boxShadow: theme.shadows[0],
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  addButton: {
  }
});

class Header extends React.PureComponent {
  triggerInput = () => {
    this.fileInput.click();
  }

  upload = e => {
    const { actions } = this.props;
    actions.uploadTracks(e.currentTarget.files)
  }

  handleLogOut = e => {
    const { actions, history } = this.props;
    actions.logOut();
    history.push('/login');
  }

  render() {
    const { classes, isUploading, isDownloading, isAuthorized } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <ToolBar className={classes.toolBar}>
            {isAuthorized &&
              <React.Fragment>
                <IconButton>
                  <Add onClick={this.triggerInput} color="secondary" className={classes.addButton} />
                  <input
                    style={{ display: 'none' }}
                    id="song-input"
                    ref={(input) => { this.fileInput = input; }}
                    onChange={this.upload}
                    type="file"
                    multiple
                    accept="audio/mp3"
                  />
                </IconButton>
                <div className={classes.grow} />
              </React.Fragment>
            }
            {(isUploading || isDownloading) && <CircularProgress className={classes.progress} color="secondary" size={28} />}
            {isAuthorized &&
              <Link to="/">
                <Button>Home</Button>
              </Link>
            }
            <Link to="/about">
              <Button>About</Button>
            </Link>
            {isAuthorized ? (
              <Button onClick={this.handleLogOut}>Logout</Button>
            ) : (
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              )}
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.shape({
    uploadTracks: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
  }).isRequired,
  isUploading: PropTypes.bool.isRequired,
  isDownloading: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    appBar: PropTypes.string,
    toolBar: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  isUploading: state.load.isUploading,
  isDownloading: state.load.isDownloading,
  isAuthorized: state.user.isAuthorized,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...PlayerActions, ...UserActions }, dispatch),
})

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
