import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Input } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Search.less';

@connect(({ employee, loading }) => ({
  employee,
  loading: loading.models.data,
}))
export default class Search extends Component {
  componentDidMount() {
  }

  handleFormSubmit = (val) => {
    const { dispatch } = this.props;
    console.log(val);
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      if (val && val !== '') {
        dispatch({
          type: 'employee/fetch',
          payload: {
            key: val,
          },
        });
      }
    }, 0);
  };

  render() {

    const { data } = this.props;

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const searchResult = data && data.info && <div>result</div>;

    return (
      <PageHeaderLayout
        title="个人信息查询"
        content={mainSearch}
      >
        {searchResult}
      </PageHeaderLayout>
    );
  }
}
