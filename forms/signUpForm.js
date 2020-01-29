import React, { Component } from 'react';
import classNames from 'classnames';
import {
    FormControl, TextField, Button, Typography, Grid, Paper, FormLabel, FormGroup
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
    iconSmall: {
        fontSize: 20,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
});

class SignUpForm extends Component {  
    state = {
        given_name: undefined,
        middle_name: undefined,
        family_name: undefined,
        nickname: undefined,
        email: undefined,
        password: undefined
    };

    validate = () => {
        const { given_name, family_name, email, password } = this.state;
        if (given_name && family_name && email && password) {
            return true;
        }
        return false;
    }

    handleSubmit = event => {
        event.preventDefault(); 
        if( this.validate()){
            const { onSubmit } = this.props;
            const data = JSON.parse(JSON.stringify(this.state));        
            onSubmit(data);            
        }
    };

    render() {
        const { classes } = this.props;
        
        const handleChange = name => event => {
            console.log(name, event.target.value);
            this.setState({ [name]: event.target.value });
        };

        return (             
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Paper className={classes.control}>
                        <Grid container>
                            <Grid item>
                                <form className={classes.container} >
                                    <div className={classes.container}>
                                         <Typography variant="headline" gutterBottom>Register User</Typography>
                                        <FormGroup>                                            
                                            <TextField label="Given Name" className={classes.textField} margin="normal" required onChange={handleChange('given_name')}/>
                                            <TextField label="Middle Name" className={classes.textField} margin="normal" onChange={handleChange('middle_name')}/>
                                            <TextField label="Family Name" className={classes.textField} margin="normal" required onChange={handleChange('family_name')}/>
                                            <TextField label="Nick Name" className={classes.textField} margin="normal" onChange={handleChange('nickname')}/>
                                            <TextField label="Email" className={classes.textField} margin="normal" type="email" required onChange={handleChange('email')}/>                                            
                                            <TextField label="Password" className={classes.textField} margin="normal" required type="password" onChange={handleChange('password')}/>
                                       </FormGroup>                                      
                                    </div>                                             
                                </form>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <Button variant="contained" variant="contained" className={classes.button} onClick={this.handleSubmit} disabled={!this.validate()}>
                                        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />Save
                                    </Button>
                                </FormControl>                                                                                                                                                                                                   
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(SignUpForm);    