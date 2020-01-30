import * as React from 'react';
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';
import {
  COGNITO_ID_TOKEN_COOKIE_NAME,
  cognitoAuthData,
  serviceData
} from '../config/cognito';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchFromCookie from '../util/fetchFromCookie';
import { actions as authActions } from '../store/reducers/auth';
import getMuiThemeWithUA from '../util/getMuiThemeWithUA';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
import SES from 'aws-sdk/clients/ses';

const Layout = (Page) => {
  // getInitialProps is the most important function for storing properties server side
  class WithAuthentication extends React.Component {
    static async getInitialProps(ctx) {
      const { req } = ctx;
      const childProps = Page.getInitialProps ? Page.getInitialProps(ctx) : {};
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

      const props = Object.assign({}, childProps, { userAgent });

      // pick token from cookie
      const cookies = await fetchFromCookie(req);
      const token = cookies(COGNITO_ID_TOKEN_COOKIE_NAME);
      if (token) {
        ctx.store.dispatch(authActions.login(token));
      }

      return props;
    }

    componentDidMount() {
      // Responsible for creating the cognito session
      const authData = cognitoAuthData();
      const authInst = new CognitoAuth(authData);
      // Responsible for creating user groups and signing / creating users depending on which flow you are interested in
      const identityServiceProvider = new CognitoIdentityServiceProvider(serviceData());
      // sms service
      const emailServiceProvider = new SES(serviceData());

      authInst.userhandler = {
        onSuccess: (result) => {
          // Store token in redux to be shared
          const token = result.idToken.jwtToken;
          this.props.login(token);
        },
        onFailure: function (err) {
          const alreadyLoggedIn = 'invalid_grant';
          if (error !== alreadyLoggedIn) {
            alert(err);
          }
        },
      };
      authInst.useCodeGrantFlow();
      authInst.parseCognitoWebResponse(window.location.href);

      // check whether this user was already signed in
      // to prevent opening sign-in window suddenly when the user is not signed in
      if (authInst.getCachedSession().isValid()) {
        authInst.getSession();
      }

      // sign-in check was done
      this.props.setSigningIn(false);
      this.props.setAuthInst(authInst);
      this.props.setIdentityServiceProvider(identityServiceProvider);
      this.props.setEmailServiceProvider(emailServiceProvider);
    }

    render() {
      const muiTheme = getMuiThemeWithUA(this.props.userAgent);
      return (
        <div>
          <MuiThemeProvider muiTheme={muiTheme}>
            {
              this.props.auth.signingIn ?
                <div>loading...</div> :
                <Page {...this.props} />
            }
          </MuiThemeProvider>
        </div>
      );
    }
  }

  return WithAuthentication;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...authActions }, dispatch);
};

export default (Page) => connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout(Page));
