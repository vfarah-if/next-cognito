
const settings = {
    REGION: 'eu-west-1',
    USER_POOL_ID: '<ADD YOURS>',
    CLIENT_ID: '<ADD YOURS>',
    COGNITO_HOSTING_DOMAIN: '<ADD YOURS>',
    COGNITO_LOGIN_REDIRECT_SIGNIN_URL: 'http://localhost:3000',
    COGNITO_LOGIN_REDIRECT_SIGNOUT_URL: 'http://localhost:3000',
    TOKEN_SCOPES: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
};

export const cognitoAuthData = () => ({
    ClientId: settings.CLIENT_ID,
    AppWebDomain: settings.COGNITO_HOSTING_DOMAIN,
    TokenScopesArray: settings.TOKEN_SCOPES,
    RedirectUriSignIn: settings.COGNITO_LOGIN_REDIRECT_SIGNIN_URL,
    RedirectUriSignOut: settings.COGNITO_LOGIN_REDIRECT_SIGNOUT_URL
});
export const COGNITO_ID_TOKEN_COOKIE_NAME = 'cognito-id-token';
export const EXPIRE_IN_HALF_A_DAY = 0.5;
export const EXPIRE_IN_THIRTY_MIN = 1 / 48;

export const serviceData = () => ({
    region: settings.REGION,
    accessKeyId: '<Yours>', // Should be a Cognito Admin
    secretAccessKey: '<Yours>' // Should be a Cognito Admin
});

export const signUpParams = () => ({
    ClientId: settings.CLIENT_ID,
    Password: undefined,
    Username: undefined,
    UserAttributes: [],
    ValidationData: [],
});

export const addUserToGroupParams = () => ({
    UserPoolId: settings.USER_POOL_ID,
    Username: undefined,
    GroupName: undefined
});

export const createUserParams = () => ({
    UserPoolId: settings.USER_POOL_ID,
    Username: undefined,
    UserAttributes: undefined,
    TemporaryPassword: undefined,
    ForceAliasCreation: false,
    MessageAction: 'SUPPRESS',
    DesiredDeliveryMediums: ['EMAIL']
});

export const adminInitiateAuthParams = () => ({
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    ClientId: settings.CLIENT_ID,
    UserPoolId: settings.USER_POOL_ID,
    AuthParameters: {
        USERNAME: undefined,
        PASSWORD: undefined
    }
});

export const adminRespondToAuthChallengeParams = () => ({
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ClientId: settings.CLIENT_ID,
    UserPoolId: settings.USER_POOL_ID,
    ChallengeResponses: {
        USERNAME: undefined,
        NEW_PASSWORD: undefined,
    },
    Session: undefined
});

export const emailSendParams = () => ({
    Destination: {
        BccAddresses: [],
        CcAddresses: [],
        ToAddresses: []
    },
    Message: {
        Body: {
            Html: {
                Charset: "UTF-8",
                Data: undefined,
            },
            Text: {
                Charset: "UTF-8",
                Data: undefined
            }
        },
        Subject: {
            Charset: "UTF-8",
            Data: undefined
        }
    },
    ReplyToAddresses: [], 
    ReturnPath: '',
    ReturnPathArn: '',
    Source: '<YOURSENDER>', // DO NOT CHECKIN
    SourceArn: '<YOURS>' // DO NOT CHECKIN
}
);
