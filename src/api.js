class Api {
  constructor() {
    this.accessToken = undefined;
  }
  login() {
    return Promise.resolve({ data: { token: 'test' } });
  }

  getTokens() {
    return Promise.resolve({
      data: [
        { tokenId: '0', name: 'btc', price: '10000$' },
        { tokenId: '1', name: 'eth', price: '100$' },
        { tokenId: '2', name: 'ltc', price: '200$' },
        { tokenId: '3', name: 'sc', price: '0.1$' },
        { tokenId: '4', name: 'dgb', price: '0.2$' },
        { tokenId: '5', name: 'etc', price: '2$' },
      ],
    });
  }

  getUserTokens() {
    return Promise.resolve({ data: [] });
  }

  setUserTokens(list) {
    return Promise.resolve({ data: list });
  }

  call() {
    // TODO: call axios API using access token
  }
}

export default new Api();
