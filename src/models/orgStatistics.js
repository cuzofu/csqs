import { fakeOrgStatisticsData } from '../services/api';

export default {
  namespace: 'orgStatistics',

  state: {
    eqTypeData: [],
    orgAmountAll: [],
    orgAmountLocal: [],
    orgAmountForeign: [],
    eqLevelTreeData: [],
    orgIncreaseDataLast12Month: [],
    eqLevelTableList: {
      list: [],
      pagination: false,
      loading: false,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fakeOrgStatisticsData, payload);
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
        eqTypeData: [],
        orgAmountAll: [],
        orgAmountLocal: [],
        orgAmountForeign: [],
        eqLevelTreeData: [],
        orgIncreaseDataLast12Month: [],
        eqLevelTableList: {
          list: [],
          pagination: false,
          loading: false,
        },
      };
    },
  },
}
