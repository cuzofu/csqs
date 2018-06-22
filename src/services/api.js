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

export async function queryOrgCreditDetail(params) {
  return request(`/elastic_sskj/api/credit/org/behmx/${params.type}/${params.id}`);
}

// 不良行为分类统计数据
export async function getBadBehaviorDataGroupByType(params) {
  const url = `/elastic_sskj/api/credit/org/behfltj/${params.zzType}/${params.startTime}/${params.endTime}`;
  return request(url);
}

export async function getBadBehaviorRankData(params) {
  const url = `/elastic_sskj/api/credit/org/behRanking/${params.zzType}/${params.startTime}/${params.endTime}`;
  return request(url);
}

// 不良行为分类统计数据详情
export async function getBadBehaviorDataGroupByTypeDetail(params) {
  const url = `/elastic_sskj/api/credit/org/behDetail/${params.id}/${params.startTime}/${params.endTime}`;
  return request(url);
}

export async function getStatisticsData(params) {
  return request(`/api/credit/org/statistics?${stringify(params)}`)
}

export async function getBadBehaviorMiniBar(params) {
  return request(`/api/credit/org/statistics/badBehaviorMiniBar?${stringify(params)}`)
}

export async function getGoodBehaviorMiniBar(params) {
  return request(`/api/credit/org/statistics/goodBehaviorMiniBar?${stringify(params)}`)
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
