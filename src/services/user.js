import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request('/api/currentUser', {
    method: 'POST',
    body: params,
  });
}
