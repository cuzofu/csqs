import { queryOrgCredit, queryOrgCreditDetail } from '../services/api';

export default {
  namespace: 'creditOrgSearch',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    creditDetail: {
      data: [],
      loading: true,
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOrgCredit, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(queryOrgCreditDetail, payload);

      const detail = [];
      if (response && response instanceof Array) {
        response.map( item => detail.push(JSON.parse(item)));
      }
      yield put({
        type: 'saveDetail',
        payload: detail,
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
    saveDetail(state, action) {
      return {
        ...state,
        creditDetail: {
          data: action.payload,
          loading: false,
        },
      };
    },
    cleanCreditDetail(state) {
      return {
        ...state,
        creditDetail: {
          data: [],
          loading: true,
        },
      }
    },
  },
};
