class Api {
  constructor() {
    this.accessToken = undefined;
  }
  login() {
    return Promise.resolve({ data: { token: 'test' } });
  }

  getTokens() {}

  getUserTokens() {}

  setUserTokens() {}

  call() {
    // TODO: call axios API using access token
  }
}

export default new Api();
