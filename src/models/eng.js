import { fakeEngListData, fakeEngDtListData } from '../services/api';

export default {
  namespace: 'eng',

  state: {
    data: {
      list: [],
      pagination: {},
      loading: false,
    },
    dtData: {
      list: [],
      pagination: {},
      loading: false,
      engId: undefined,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fakeEngListData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDt({ payload }, { call, put }) {
      const response = yield call(fakeEngDtListData, payload);
      yield put({
        type: 'saveDt',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveDt(state, action) {
      return {
        ...state,
        dtData: action.payload,
      }
    },
  },
}
