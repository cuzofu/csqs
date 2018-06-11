import { stringify } from 'qs';
import request from '../utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryOrgCredit(params) {
  return request('/elastic_sskj/api/credit/org/search', {
    method: 'POST',
    body: params,
  })
}

export async function fakeStatisticsData(params) {
  return request(`/api/credit/org/statistics?${stringify(params)}`)
}

export async function fakeBadBehaviorDataLastYear(params) {
  return request(`/api/credit/org/statistics/badBehaviorDataLastYear?${stringify(params)}`)
}

export async function fakeBadBehaviorDataGroupByType(params) {
  // const { startTime, endTime } = params;
  return request(`/elastic_sskj/api/credit/org/behfltj?${stringify(params)}`); // /${startTime}/${endTime}
}

export async function fakeBadBehaviorRankData(params) {
  return request(`/api/credit/org/statistics/badBehaviorRankData?${stringify(params)}`);
}

export async function fakeEngListData(params) {
  return request(`/api/eng/search?${stringify(params)}`)
}

export async function fakeEngDtListData(params) {
  return request(`/api/dteng/search?${stringify(params)}`)
}

export async function fakeEngStatisticsData(params) {
  return request(`/api/eng/statistics?${stringify(params)}`)
}

export async function fakeEngProgressionListData(params) {
  return request(`/api/eng/progression?${stringify(params)}`)
}

export async function fakeOrgStatisticsData(params) {
  return request(`/api/org/statistics?${stringify(params)}`)
}
