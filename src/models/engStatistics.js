import { fakeEngStatisticsData } from '../services/api';

export default {
  namespace: 'engStatistics',

  state: {
    engTypeZtbDate: [],
    engTypeSghtDate: [],
    engTypeSgxkDate: [],
    engDataByStageGroupBar: [],
    engIncreaseDataLast12Month: [],
    engDataByStage: {
      list: [],
      pagination: false,
      loading: false,
    },
    engDataByDistrict: {
      list: [],
      pagination: false,
      loading: false,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fakeEngStatisticsData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
        engDataByStage: payload.engDataByStage,
        engDataByDistrict: payload.engDataByDistrict,
      };
    },
    clear() {
      return {
        engTypeZtbDate: [],
        engTypeSghtDate: [],
        engTypeSgxkDate: [],
        engIncreaseDataLast12Month: [],
        engDataByStageGroupBar: [],
        engDataByStage: {
          list: [],
          pagination: false,
          loading: false,
        },
        engDataByDistrict: {
          list: [],
          pagination: false,
          loading: false,
        },
      };
    },
  },
}
