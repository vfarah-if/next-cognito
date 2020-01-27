import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl, InputLabel, Input, FormHelperText, TextField, Button   } from '@material-ui/core';

class SignUpForm extends Component {            
    render() {
        const { handleSubmit } = this.props;
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <Field name="firstName" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="middleName">Middle Name</label>
                        <Field name="middleName" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <Field name="lastName" component="input" type="text" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" component="input" type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" component="input" type="password" />
                    </div>
                    <Button variant="outlined" type="submit" color="primary">Sign up</Button>
                </form>

                {/* <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                    <TextField id="standard-basic" label="Standard" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />                    
                    <TextField id="filled-password-input" label="Password" type="password" autoComplete="current-password" variant="filled"/>
                    <Button variant="contained" color="primary"  size="small" startIcon={<SaveIcon />}>Save</Button>
                </FormControl> */}
            </>            
        );
    }
}


SignUpForm = reduxForm({
    form: 'signup' 
  })(SignUpForm);
  
  export default SignUpForm;