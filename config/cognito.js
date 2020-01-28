
const settings = {
    REGION: 'eu-west-1',
    USER_POOL_ID: 'eu-west-1_TyooduV2g',
    CLIENT_ID: '1lfdrqalppb6c1nt2ieovi1ref',
    COGNITO_HOSTING_DOMAIN: 'identity-worldathletics-test.auth.eu-west-1.amazoncognito.com',
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

export const identityServiceProviderData = () => ({
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
    MessageAction: undefined,
    DesiredDeliveryMediums: ['EMAIL']
});
