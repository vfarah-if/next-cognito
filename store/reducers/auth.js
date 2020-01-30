import { createActions, handleActions } from 'redux-actions';
import { COGNITO_ID_TOKEN_COOKIE_NAME, EXPIRE_IN_THIRTY_MIN } from '../../config/cognito';

import Cookie from 'js-cookie';

const defaultState = {
  inst: null,
  signingIn: true,
  idToken: null,
  identityServiceProvider: null,
  emailServiceProvider: null,
};

export const actions = createActions({
  SET_AUTH_INST: (inst) => ({ inst }),  
  SET_IDENTITY_SERVICE_PROVIDER : (identityServiceProvider) => ({ identityServiceProvider }), 
  SET_EMAIL_SERVICE_PROVIDER: (emailServiceProvider) => ({ emailServiceProvider }),
  SET_SIGNING_IN: (signingIn) => ({ signingIn }),
  LOGIN: (idToken) => ({ idToken }),
  LOGOUT: () => { },
});

const reducer = handleActions({
  [actions.setAuthInst](state, { payload: { inst } }) {
    return { ...state, inst };
  },
  [actions.setIdentityServiceProvider](state, { payload: { identityServiceProvider } }) {
    return { ...state, identityServiceProvider };
  },  
  [actions.setEmailServiceProvider](state, { payload: { emailServiceProvider } }) {
    return { ...state, emailServiceProvider };
  },
  [actions.setSigningIn](state, { payload: { signingIn } }) {
    return { ...state, signingIn };
  },
  [actions.login](state, { payload: { idToken } }) {
    // set into cookie for Server Side Rendering
    Cookie.set(
      COGNITO_ID_TOKEN_COOKIE_NAME,
      idToken,
      {
        secure: true,
        expires: EXPIRE_IN_THIRTY_MIN,
      }
    );
    return { ...state, idToken, signingIn: false };
  },
  [actions.logout](state) {
    Cookie.remove(COGNITO_ID_TOKEN_COOKIE_NAME);
    return { ...state, idToken: null };
  },
}, defaultState);

export default reducer;
