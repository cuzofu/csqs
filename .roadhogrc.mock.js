import { getNotices } from './mock/notices';
import {
  getOrgCredit,
  fakeStatisticsData,
  fakeBadBehaviorDataLastYear,
  fakeBadBehaviorDataGroupByType,
  fakeBadBehaviorRankData
} from './mock/credit';
import { getEngList, getEngDtList, getEngAmountData, getEngProgressionList } from './mock/eng';
import { getOrgStatisticsData } from './mock/org';
import { delay } from 'roadhog-api-doc';

import { getAuthority } from './src/utils/authority';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'POST /api/currentUser': (req, res) => {
    const userName = req.body;
    if (userName === 'admin') {
      res.send({
        name: 'Admin',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        notifyCount: 0,
      });
    } else if (userName === 'user') {
      res.send({
        name: 'User',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000002',
        notifyCount: 1,
      });
    } else if (userName === 'guest') {
      res.send({
        name: 'Guest',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: undefined,
        notifyCount: 0,
      });
    }
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  // 企业诚信查询
  'POST /elastic_sskj/api/credit/org/search': getOrgCredit,
  'GET /api/credit/org/statistics': fakeStatisticsData,
  'GET /api/credit/org/statistics/badBehaviorDataLastYear': fakeBadBehaviorDataLastYear,
  // 'GET /api/credit/org/statistics/badBehaviorDataGroupByType': fakeBadBehaviorDataGroupByType,
  'GET /api/credit/org/statistics/badBehaviorRankData': fakeBadBehaviorRankData,
  'GET /elastic_sskj/api/credit/org/behfltj': fakeBadBehaviorDataGroupByType,
  'GET /api/eng/search': getEngList,
  'GET /api/dteng/search': getEngDtList,
  'GET /api/eng/statistics': getEngAmountData,
  'GET /api/eng/progression': getEngProgressionList,
  'GET /api/org/statistics': getOrgStatisticsData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/notices': getNotices,
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};

export default (noProxy ? {
  "POST /elastic_sskj/*": "http://192.168.0.204:8180/",
  "GET /elastic_sskj/*": "http://192.168.0.204:8180/",
} : delay(proxy, 1000));
