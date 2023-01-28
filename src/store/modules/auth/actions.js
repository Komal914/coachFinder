let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },

  async auth(context, payload) {
    //mode = signup or login
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo1sQShnIBEwoeccS1We2P05fnGf8p7pA';
    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo1sQShnIBEwoeccS1We2P05fnGf8p7pA';
    }
    //http request
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        response.message || 'Failed to authenticate. Check your login data.'
      );
      throw error;
    }

    //future time when user token will expire
    // const expiresIn = 5000; //....used to test app
    const expiresIn = +responseData.expiresIn * 1000; //miliseconds, + ensures it is a number
    const expirationDate = new Date().getTime() + expiresIn;

    //browser storage -> for auto login, we can dispatch an action to
    //login the user if these values are stored
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    //logout the user when token expires
    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  //allows the user to stay logged in and avoids restarting the app and losing data
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();
    //skip trylogin if the token is expired
    if (expiresIn < 0) {
      return;
    }
    //if token isn't expired, log them out when it is
    setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    //reset timer for auto logout
    clearTimeout(timer);
    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
