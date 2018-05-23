import { fakeStatisticsData } from '../services/api';

export default {
  namespace: 'creditOrgStatistics',

  state: {
    badBehaviorDataLastYear: [],
    goodBehaviorDataLastYear: [],
    badBehaviorGroupByDistrict: [],
    goodBehaviorGroupByDistrict: [],
    orgCreditDataLast12Month: [],
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
    *fetchDataGroupByDistrict({ payload }, { call, put }) {
      const response = yield call(fakeStatisticsData, payload);
      yield put({
        type: 'save',
        payload: {
          badBehaviorGroupByDistrict: response.badBehaviorGroupByDistrict,
          goodBehaviorGroupByDistrict: response.goodBehaviorGroupByDistrict,
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
        badBehaviorDataLastYear: [],
        goodBehaviorDataLastYear: [],
        badBehaviorGroupByDistrict: [],
        goodBehaviorGroupByDistrict: [],
        orgCreditDataLast12Month: [],
      };
    },
  },
};
