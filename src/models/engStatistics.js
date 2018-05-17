import { fakeEngStatisticsData } from '../services/api';

export default {
  namespace: 'engStatistics',

  state: {
    engTypeZtbDate: [],
    engTypeSghtDate: [],
    engTypeSgxkDate: [],
    engDataByStage: [],
    engDataByDistrict: [],
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
      };
    },
    clear() {
      return {
        engTypeZtbDate: [],
        engTypeSghtDate: [],
        engTypeSgxkDate: [],
        engDataByStage: [],
        engDataByDistrict: [],
      };
    },
  },
}
