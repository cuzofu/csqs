import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form,
  Card,
  Row,
  Col,
  Input,
  Button,
  InputNumber,
  Divider,
  Icon,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from '../../components/StandardTable';
import StandardFormRow from '../../components/StandardFormRow';

import styles from './Search.less';

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '形象进度',
    dataIndex: 'progression',
    key: 'progression',
    sorter: true,
    align: 'center',
    width: '25%',
  },
  {
    title: '完成率',
    dataIndex: 'completionRate',
    key: 'completionRate',
    sorter: true,
    align: 'center',
    render: val => `${val}%`,
    width: '15%',
  },
  {
    title: '完成投资',
    dataIndex: 'completionInvestment',
    key: 'completionInvestment',
    sorter: true,
    align: 'center',
    needTotal: true,
    render: val => `${val}万元`,
    width: '15%',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: '10%',
    render: (text) => (
      <span>
        <a href="#">工程详情</a>
      </span>
    ),
  },
];

@connect(({ engProgression, loading }) => ({
  engProgression,
  loading: loading.effects['engProgression/fetch'],
}))
@Form.create()
export default class Progression extends Component {
  state = {
    formValues: {},
    selectedRows: [],
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'engProgression/fetch',
    });
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    dispatch({
      type: 'engProgression/fetch',
      payload: {},
    });

  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'engProgression/fetch',
        payload: values,
      });

    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'engProgression/fetch',
      payload: params,
    });

  };

  renderQueryItemForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="工程名称">
                {getFieldDecorator('name')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="形象进度">
                {getFieldDecorator('progression')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <span className={styles.submitButtons}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
              </span>
            </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <StandardFormRow title="完成投资" grid last>
                <Row gutter={{ md: 24, lg: 24, xl: 24 }}>
                  <Col md={12} sm={24}>
                    <FormItem label="起">
                      {getFieldDecorator('completionInvestmentStart')(<InputNumber min={0} placeholder="请输入最小投资额" style={{ width: '100%' }} />)}
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24}>
                    <FormItem label="止">
                      {getFieldDecorator('completionInvestmentEnd')(<InputNumber min={0} placeholder="请输入最大投资额" style={{ width: '100%' }} />)}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Col>
            <Col md={12} sm={24}>
              <StandardFormRow title="完成率" grid last>
                <Row gutter={{ md: 24, lg: 24, xl: 24 }}>
                  <Col md={12} sm={24}>
                    <FormItem label="起">
                      {getFieldDecorator('completionRateStart')(<InputNumber min={0} placeholder="请输入最小完成率" style={{ width: '100%' }} />)}
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24}>
                    <FormItem label="止">
                      {getFieldDecorator('completionRateEnd')(<InputNumber min={0} placeholder="请输入最大完成率" style={{ width: '100%' }} />)}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }

  render() {

    const { selectedRows } = this.state;
    const { engProgression: { data }, loading } = this.props;

    return (
      <PageHeaderLayout title="在建工程进度查询">
        <div className={styles.tableListForm}>{this.renderQueryItemForm()}</div>
        <Card style={{ marginTop: 24 }}>
          <div className={styles.tableList}>
            <StandardTable
              selectDisable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
