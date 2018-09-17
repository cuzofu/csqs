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
    badBehaviorByTypeBarData: [],
    badBehaviorByTypeRankData: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const statisticsData = yield call(getStatisticsData, payload);
      if (statisticsData) {
        yield put({
          type: 'save',
          payload: {
            ...statisticsData,
          },
        });
      }
    },
    *fetchGoodBehaviorMiniArea({ payload }, { call, put }) {
      const goodBehaviorMiniArea = yield call(getGoodBehaviorMiniBar, payload);
      if (goodBehaviorMiniArea) {
        yield put({
          type: 'save',
          payload: {
            goodBehaviorMiniArea,
          },
        });
      }
    },
    *fetchBadBehaviorMiniArea({ payload }, { call, put }) {
      const badBehaviorMiniArea = yield call(getBadBehaviorMiniBar, payload);
      if (badBehaviorMiniArea) {
        yield put({
          type: 'save',
          payload: {
            badBehaviorMiniArea,
          },
        });
      }
    },
    *fetchDataGroupByDistrict({ payload }, { call, put }) {
      const response = yield call(getStatisticsData, payload);
      if (response) {
        yield put({
          type: 'save',
          payload: {
            badBehaviorGroupByDistrict: response.badBehaviorGroupByDistrict,
            goodBehaviorGroupByDistrict: response.goodBehaviorGroupByDistrict,
          },
        });
      }
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

    // 不良行为企业资质统计数据
    *fetchBadBehaviorBarData({ payload }, { call, put }) {
      const badBehaviorByTypeBarData = yield call(getBadBehaviorDataGroupByType, payload);
      console.log(badBehaviorByTypeBarData);
      if (badBehaviorByTypeBarData) {
        yield put({
          type: 'saveBadBehaviorByTypeBarData',
          payload: {
            badBehaviorByTypeBarData,
          },
        });
      }
    },

    // 不良行为排名数据
    *fetchBadBehaviorRankData({ payload }, { call, put }) {
      const badBehaviorByTypeRankData = yield call(getBadBehaviorRankData, payload);
      console.log(badBehaviorByTypeRankData);
      if (badBehaviorByTypeRankData) {
        yield put({
          type: 'saveBadBehaviorByTypeRankData',
          payload: {
            badBehaviorByTypeRankData,
          },
        });
      }
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
        payload: {
          detail,
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
    saveBadBehaviorByTypeBarData(state, { payload }) {
      return {
        ...state,
        badBehaviorByTypeBarData: payload.badBehaviorByTypeBarData.list.map( data => {
          return {
            ...data,
            x: data.type,
            y: data.data,
          }
        }),
      };
    },
    saveBadBehaviorByTypeRankData(state, { payload }) {
      return {
        ...state,
        badBehaviorByTypeRankData: payload.badBehaviorByTypeRankData,
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
