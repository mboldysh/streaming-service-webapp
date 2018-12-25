import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as UserActions from '../actions/user';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Header from './Header';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textField: {
        width: 300,
    },
});

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            isButtonDisabled: true,
            isError: false
        }
    }

    handleLoginChange = event => {
        if (event.target.value.length > 0) {
            this.setState({
                isButtonDisabled: false,
                isError: false
            })
        } else {
            this.setState({
                isButtonDisabled: true,
                isError: true
            })
        }
        this.setState({
            login: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const { actions, history } = this.props;
        actions.logIn(this.state.login)
        history.push('/')
    }

    render() {
        const { classes } = this.props;
        const { isButtonDisabled, isError } = this.state;
        return (
            <div>
                <Header />
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '80vh' }}
                >
                    <Grid item xs={3}>

                        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                            <TextField
                                id="standard-with-placeholder"
                                name="login"
                                label="Enter user name"
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleLoginChange}
                                error={isError}
                            />
                            <Button color="primary" variant="raised" type="submit" disabled={isButtonDisabled}>
                                Log In
                            </Button>
                        </form>
                    </Grid>

                </Grid>

            </div>
        );
    }
}

Login.propTypes = {
    actions: PropTypes.shape({
        logIn: PropTypes.func.isRequired,
    }).isRequired,
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...UserActions }, dispatch),
});

export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(Login);
