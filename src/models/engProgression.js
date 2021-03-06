import { fakeEngProgressionListData } from '../services/api';

export default {
  namespace: 'engProgression',

  state: {
    data: {
      list: [],
      pagination: {},
      loading: false,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fakeEngProgressionListData, payload);
      yield put({
        type: 'save',
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
  },
}
