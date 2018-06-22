import {
  getStatisticsData,
  getBadBehaviorMiniBar,
  getGoodBehaviorMiniBar,
  getBadBehaviorDataGroupByType,
  getBadBehaviorRankData,
  getBadBehaviorDataGroupByTypeDetail,
} from '../services/api';

export default {
  namespace: 'creditOrgStatistics',

  state: {
    badBehaviorDataLastYear: {
      data: [],
    },
    badBehaviorMiniArea: [],
    goodBehaviorMiniArea: [],
    goodBehaviorDataLastYear: [],
    badBehaviorGroupByDistrict: [],
    goodBehaviorGroupByDistrict: [],
    orgCreditDataLast12Month: [],
    badBehaviorGroupByType: [],
    badBehaviorDataGroupByTypeDetail: [],
    badBehaviorByType: {
      barData: [],
      rankData: [],
      loading: false,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const statisticsData = yield call(getStatisticsData, payload);
      yield put({
        type: 'save',
        payload: {
          ...statisticsData,
        },
      });
    },
    *fetchBehaviorMiniArea({ payload }, { call, put }) {
      const badBehaviorMiniArea = yield call(getBadBehaviorMiniBar, payload);
      const goodBehaviorMiniArea = yield call(getGoodBehaviorMiniBar, payload);
      yield put({
        type: 'saveBehaviorMiniArea',
        payload: {
          badBehaviorMiniArea,
          goodBehaviorMiniArea,
        },
      });
    },
    *fetchDataGroupByDistrict({ payload }, { call, put }) {
      const response = yield call(getStatisticsData, payload);
      yield put({
        type: 'saveDataGroupByDistrict',
        payload: {
          badBehaviorGroupByDistrict: response.badBehaviorGroupByDistrict,
          goodBehaviorGroupByDistrict: response.goodBehaviorGroupByDistrict,
        },
      });
    },

    // 根据不同企业资质统计不良行为
    *fetchBadBehaviorByType({ payload }, { call, put }) {
      const badBehaviorGroupByType = yield call(getBadBehaviorDataGroupByType, payload);
      const badBehaviorRankData = yield call(getBadBehaviorRankData, payload);
      yield put({
        type: 'saveBadBehaviorByType',
        payload: {
          badBehaviorByType: {
            barData: badBehaviorGroupByType,
            rankData: badBehaviorRankData !== undefined ? badBehaviorRankData : [],
            loading: false,
          },
        },
      });
    },

    // 不良行为统计数据详情
    *fetchBadBehaviorDataGroupByTypeDetail({ payload }, { call, put }) {
      const response = yield call(getBadBehaviorDataGroupByTypeDetail, payload);
      const detail = [];
      if (response && response instanceof Array) {
        response.map( item => detail.push(JSON.parse(item)));
      }
      yield put({
        type: 'saveBadBehaviorDataGroupByTypeDetail',
        payload: detail,
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
    saveDataGroupByDistrict(state, { payload }) {
      return {
        ...state,
        badBehaviorGroupByDistrict: payload.badBehaviorGroupByDistrict,
        goodBehaviorGroupByDistrict: payload.goodBehaviorGroupByDistrict,
      };
    },
    saveBehaviorMiniArea(state, { payload }) {
      return {
        ...state,
        badBehaviorMiniArea: payload.badBehaviorMiniArea,
        goodBehaviorMiniArea: payload.goodBehaviorMiniArea,
      };
    },
    saveBadBehaviorByType(state, { payload }) {
      return {
        ...state,
        badBehaviorByType: payload.badBehaviorByType,
      };
    },
    saveBadBehaviorDataGroupByTypeDetail(state, { payload }) {
      return {
        ...state,
        badBehaviorDataGroupByTypeDetail: payload.detail,
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
        badBehaviorDataGroupByTypeDetail: [],
        badBehaviorByType: {
          barData: [],
          rankData: [],
        },
      };
    },
    clearBadBehaviorDataGroupByTypeDetail(state) {
      return {
        ...state,
        badBehaviorDataGroupByTypeDetail: [],
      }
    },
  },
};
