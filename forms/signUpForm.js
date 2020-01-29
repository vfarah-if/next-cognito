import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import {
    FormControl, InputLabel, Input, FormHelperText, TextField, Button, Typography, Box, Grid, Paper, FormLabel,
    RadioGroup, FormControlLabel, Radio, FormGroup, OutlinedInput, FilledInput
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class SignUpForm extends Component {
    state = {
        spacing: '16'
    };

    handleChange = event => {
        this.setState({ name: event.target.value });
      };

    render() {
        const { handleSubmit, classes, } = this.props;
        return (             
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Paper className={classes.control}>
                        <Grid container>
                            <Grid item>
                                <form onSubmit={handleSubmit}>
                                    <div className={classes.container}>
                                        <FormLabel component="legend">Register User</FormLabel>
                                        <FormGroup>
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormControlLabel
                                                    label="Given Name"
                                                    labelPlacement="start"
                                                    control={<Field name="given_name" component="input" type="text" />}
                                                />
                                            </FormControl>
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormControlLabel
                                                    label="Middle Name"
                                                    labelPlacement="start"
                                                    control={<Field name="middle_name" component="input" type="text" />}
                                                />
                                            </FormControl>
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormControlLabel
                                                    label="Family Name"
                                                    labelPlacement="start"
                                                    control={<Field name="family_name" component="input" type="text" />}
                                                />
                                            </FormControl>
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormControlLabel
                                                    label="Nick Name"
                                                    labelPlacement="start"
                                                    control={<Field name="nickname" component="input" type="text" />}
                                                />
                                            </FormControl>
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormControlLabel
                                                    label="Email"
                                                    labelPlacement="start"
                                                    control={<Field name="email" component="input" type="email" />}
                                                />
                                            </FormControl>
                                            <FormControl component="fieldset" className={classes.formControl}>
                                                <FormControlLabel
                                                    label="Password"
                                                    labelPlacement="start"
                                                    control={<Field name="password" component="input" type="password" />}
                                                />
                                            </FormControl>                                                
                                        </FormGroup>
                                    </div>                
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <Button variant="contained" variant="contained" className={classes.button} type="submit">
                                            <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />Save</Button>
                                    </FormControl>                                                                                                                    
                                </form>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}


SignUpForm = reduxForm({
    form: 'sig nup'
})(SignUpForm);

export default withStyles(styles)(SignUpForm);    