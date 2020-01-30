import * as React from 'react';
import { Link } from '../routes';
import ApplicationLayout from '../hoc/ApplicationLayout';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import IndexForm from '../forms/indexForm';
import SignUpForm from '../forms/signUpForm';
import { 
  signUpParams, 
  addUserToGroupParams, 
  createUserParams, 
  adminInitiateAuthParams,
  adminRespondToAuthChallengeParams,
  emailSendParams
} from '../config/cognito';

class Page extends React.Component {
  static async getInitialProps({ req }) {
    return {};
  }

  parseIdToken = (idToken) => {
    if (idToken) {
      const payload = idToken.split('.')[1];
      const ascii = (new Buffer(payload, 'base64')).toString('ascii');
      return JSON.stringify(ascii, null, 4);
    }
    return {};
  };

  login = () => {
    this.props.auth.inst.getSession();
  };

  logout = () => {
    this.props.auth.inst.signOut();
    this.props.logout();
  };

  createAttributes = (data) => {
    const userAttributes = new Array();
    for (const name in data) {
      var value = data[name];
      userAttributes.push({ Name: name, Value: value });
    }
    return userAttributes;
  }

  signup = (data) => {
    console.log(data);
    const { given_name, family_name, email, password } = data;
    if (given_name && family_name && email) {
      delete (data.password);
      const attributes = this.createAttributes(data);
      // this.signUpUser(email, password, attributes);
      this.createUser(email, password, attributes);
    } else {
      alert('Data is missing');
    }
  }

  createUser(email, password, attributes) {
    const params = createUserParams();
    params.Username = email;
    params.UserAttributes = attributes;
    params.TemporaryPassword = password;
    this.props.auth.identityServiceProvider.adminCreateUser(params,
      (err, result) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        alert('Succeeded to sign user and email should be sent with temp password');
        this.addUserToGroup(email, 'waw');
        this.addUserToGroup(email, 'fan');
        this.initiateAuthenticationWithAdminflow(email, password);
        console.log(result);
      });
  }

  initiateAuthenticationWithAdminflow(email, password) {
    const params = adminInitiateAuthParams();
    params.AuthParameters.USERNAME = email;
    params.AuthParameters.PASSWORD = password;
    this.props.auth.identityServiceProvider.adminInitiateAuth(params, (error, data) => {
      if (error) {
        alert(error.message || JSON.stringify(err));
        return;
      }
      console.log(data);
      if (data && data.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        const challengeParams = adminRespondToAuthChallengeParams();
        challengeParams.ChallengeResponses.USERNAME = email;
        challengeParams.ChallengeResponses.NEW_PASSWORD = password;
        challengeParams.Session = data.Session;
        this.props.auth.identityServiceProvider.adminRespondToAuthChallenge(challengeParams, (err, result) => {
          if (error) {
            alert(error.message || JSON.stringify(err));
            return;
          }
          console.log(result);
          this.updateEmailNotVerified(email);
          this.sendEmailToVerifyAccount(email);
          this.login();
        });
      }
    });
  }

  updateEmailNotVerified(email) {
    // TODO: make sure email still needs to be verified to make sure that there is no security issue
  }

  sendEmailToVerifyAccount(email) {
    // https://aws.amazon.com/blogs/mobile/implementing-passwordless-email-authentication-with-amazon-cognito/
    const params = emailSendParams();
    params.Destination.ToAddresses.push(email);    
    params.Message.Body.Html.Data = `This message body contains HTML formatting. It can, for example, contain links like this one: <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.`;
    params.Message.Body.Text.Data = `This is the message body in text format.`;
    params.Message.Subject.Data = `Link to verify you are who you say you are ...`;
    this.props.auth.emailServiceProvider.sendEmail(params, (err, data) => {
      debugger;
      if (err) {
        console.log(err, err.stack); 
        return ;
      } 
      console.log(data);           
    });
  }

  signUpUser(email, password, attributes) {
    const params = signUpParams();
    params.Username = email;
    params.Password = password;
    params.UserAttributes = attributes;
    params.ValidationData = attributes;
    // Relies on settings for allowing users to sign themselves up being assigned
    this.props.auth.identityServiceProvider.signUp(params,
      (err, result) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        alert('Succeeded to sign up user');
        this.addUserToGroup(email, 'waw');
        this.addUserToGroup(email, 'fan');
        console.log(result);
      });
  }

  addUserToGroup(username, groupName) {
    const params = addUserToGroupParams();
    params.Username = username;
    params.GroupName = groupName;
    this.props.auth.identityServiceProvider.adminAddUserToGroup(params, (error, data) => {
      if (error) {
        alert(err.message || JSON.stringify(err));
      }
      if (data) {
        console.log(`Successfully added '${username}' to '${groupName}'`);
      }
    });
  }

  render() {
    const { idToken } = this.props.auth;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              World Athletics Registration Flow POC
            </Typography>
          </Toolbar>
        </AppBar>

        {
          idToken ?
            <div>
              <Button variant="outlined" onClick={this.logout}>Sign out</Button>

              <Typography variant="title" gutterBottom>
                Token
              </Typography>
              {idToken}

              <Typography variant="title" gutterBottom>
                Token as JSON
              </Typography>
              {this.parseIdToken(idToken)}

              <Typography variant="title" gutterBottom>
                Form
              </Typography>

              <IndexForm
                idToken={idToken}
              />

            </div>
            :
            <div>
              <Button variant="outlined" onClick={this.login}>Sign in</Button>
              <div>
                <SignUpForm onSubmit={this.signup} />
              </div>
            </div>
        }

        <div>
          <Typography variant="headline" gutterBottom>
            Links
          </Typography>
          <div>
            <Link route='/blog/hello-world'>
              <a>Hello world</a>
            </Link>
            <span> / </span>
            <Link href="/ghpage">
              <a>to ghpage</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default ApplicationLayout(connect(mapStateToProps)(Page));
