import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    console.log('here')
  }

  upload = e => {
    const { uploadTracks } = this.props;
    console.log('here2')
    uploadTracks(e.currentTarget.files)
  }

  render() {
    const { classes, isUploading, isDownloading, logOut } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <ToolBar className={classes.toolBar}>
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
            {(isUploading || isDownloading) && <CircularProgress className={classes.progress} color="secondary" size={28} />}
            <Link to="/">
              <Button>Home</Button>
            </Link>
            <Link to="/about">
              <Button>About</Button>
            </Link>
            <Button onClick={logOut}>Logout</Button>
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  uploadTracks: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  isDownloading: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    appBar: PropTypes.string,
    toolBar: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Header);
