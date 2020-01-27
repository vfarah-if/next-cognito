import * as React from 'react';
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';
import {
  COGNITO_ID_TOKEN_COOKIE_NAME,
  cognitoAuthData,
  poolData
} from '../config/cognito';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchFromCookie from '../util/fetchFromCookie';
import { actions as authActions } from '../store/reducers/auth';
import getMuiThemeWithUA from '../util/getMuiThemeWithUA';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';
// import './tap_events';

const Layout = (Page) => {
  class Wrapped extends React.Component {
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
      const authData = cognitoAuthData();
      const authInst = new CognitoAuth(authData);
      
      // https://www.npmjs.com/package/amazon-cognito-identity-js to fgure out how to do the signup
      const userPool = new CognitoUserPool(poolData());
      const currentUser = userPool.getCurrentUser();
      console.log(currentUser);
      authInst.userhandler = {
        onSuccess: (result) => {
          const token = result.idToken.jwtToken;
          this.props.login(token);
        },
        onFailure: function (err) {
          alert('Error!');
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
      this.props.setUserPool(userPool);
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

  return Wrapped;
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
