import {
  fakeStatisticsData,
  fakeBadBehaviorDataLastYear,
  fakeBadBehaviorDataGroupByType,
  fakeBadBehaviorRankData,
} from '../services/api';

export default {
  namespace: 'creditOrgStatistics',

  state: {
    badBehaviorDataLastYear: {
      data: [],
      loading: false,
    },
    goodBehaviorDataLastYear: [],
    badBehaviorGroupByDistrict: [],
    goodBehaviorGroupByDistrict: [],
    orgCreditDataLast12Month: [],
    badBehaviorGroupByType: [],
    badBehaviorRankData: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const statisticsData = yield call(fakeStatisticsData, payload);
      const badBehaviorDataLastYear = yield call(fakeBadBehaviorDataLastYear, payload);
      const badBehaviorGroupByType = yield call(fakeBadBehaviorDataGroupByType, payload);
      const badBehaviorRankData = yield call(fakeBadBehaviorRankData, payload);
      yield put({
        type: 'save',
        payload: {
          ...statisticsData,
          badBehaviorDataLastYear: {
            data: badBehaviorDataLastYear,
            loading: true,
          },
          badBehaviorGroupByType,
          badBehaviorRankData,
        },
      });
    },
    *fetchDataGroupByDistrict({ payload }, { call, put }) {
      const response = yield call(fakeStatisticsData, payload);
      const badBehaviorGroupByType = yield call(fakeBadBehaviorDataGroupByType, payload);
      yield put({
        type: 'save',
        payload: {
          badBehaviorGroupByDistrict: response.badBehaviorGroupByDistrict,
          goodBehaviorGroupByDistrict: response.goodBehaviorGroupByDistrict,
          badBehaviorGroupByType,
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
        badBehaviorDataLastYear: {
          data: [],
          loading: false,
        },
        goodBehaviorDataLastYear: [],
        badBehaviorGroupByDistrict: [],
        goodBehaviorGroupByDistrict: [],
        orgCreditDataLast12Month: [],
        badBehaviorGroupByType: [],
        badBehaviorRankData: [],
      };
    },
  },
};
