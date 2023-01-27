export default {
  async login(context, payload) {
    //http request
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo1sQShnIBEwoeccS1We2P05fnGf8p7pA',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      console.log('ResponseData bad: ', responseData);
      const error = new Error(
        response.message ||
          'Failed to authenticate signup. Check your login data.'
      );
      throw error;
    }
    console.log('ResponseData: ', responseData);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresin,
    });
  },

  async signup(context, payload) {
    //http request
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo1sQShnIBEwoeccS1We2P05fnGf8p7pA',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      console.log('ResponseData bad: ', responseData);
      const error = new Error(
        response.message ||
          'Failed to authenticate signup. Check your login data.'
      );
      throw error;
    }
    console.log('ResponseData: ', responseData);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresin,
    });
  },
};
