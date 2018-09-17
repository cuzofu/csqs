import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  // /api/currentUser
  return request('/bins/8g76a', {
    // method: 'POST',
    method: 'GET',
    body: params,
  });
}
