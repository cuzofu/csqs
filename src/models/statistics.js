import { fakeStatisticsData } from '../services/api';

export default {
  namespace: 'statistics',

  state: {
    allCreditOrg: [],
    badBehavior: [],
    goodBehavior: [],
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fakeStatisticsData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchAllCreditOrg({ payload }, { call, put }) {
      const response = yield call(fakeStatisticsData, payload);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        allCreditOrg: [],
        badBehavior: [],
        goodBehavior: [],
      };
    },
  },
};
