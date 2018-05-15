import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form,
  Card,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Icon,
  Button,
  InputNumber,
} from 'antd';
import TagSelect from 'ant-design-pro/lib/TagSelect';

import StandardTable from 'components/StandardTable';
import StandardFormRow from 'components/StandardFormRow';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Search.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');
const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
    index: 1,
  },
  {
    title: '总投资',
    dataIndex: 'investment',
    key: 'investment',
    sorter: true,
    align: 'center',
    index: 2,
    needTotal: true,
    render: val => `${val}万元`,
  },
  {
    title: '面积',
    dataIndex: 'area',
    key: 'area',
    sorter: true,
    align: 'center',
    index: 3,
    needTotal: true,
    render: val => `${val}m²`,
  },
  {
    title: '公里数',
    dataIndex: 'length',
    key: 'length',
    sorter: true,
    align: 'center',
    index: 4,
    needTotal: true,
    render: val => `${val}km`,
  },
  {
    title: '项目代码',
    dataIndex: 'code',
    key: 'code',
    index: 5,
  },
  {
    title: '建设性质',
    dataIndex: 'jsxz',
    key: 'jsxz',
    sorter: true,
    align: 'center',
    index: 6,
  },
  {
    title: '项目地址',
    dataIndex: 'address',
    key: 'address',
    index: 7,
  },
  {
    title: '建设地区划',
    dataIndex: 'cantonCode',
    key: 'cantonCode',
    sorter: true,
    align: 'center',
    index: 8,
  },
  {
    title: '计划开工日期',
    dataIndex: 'startDate',
    key: 'startDate',
    sorter: true,
    align: 'center',
    index: 9,
  },
  {
    title: '报监日期',
    dataIndex: 'bjrq',
    key: 'bjrq',
    sorter: true,
    align: 'center',
    index: 10,
    render: val => `${val}`,
  },
  {
    title: '开工年份',
    dataIndex: 'kgnf',
    key: 'kgnf',
    sorter: true,
    align: 'center',
    index: 11,
    render: val => `${val}年`,
  },
  {
    title: '建成年份',
    dataIndex: 'jcnf',
    key: 'jcnf',
    sorter: true,
    align: 'center',
    index: 12,
    render: val => `${val}年`,
  },
  {
    title: '建设单位',
    key: 'jsdw',
    index: 13,
    children: [
      {
        title: '名称',
        dataIndex: 'jsdwName',
      },
      {
        title: '信用代码',
        dataIndex: 'jsdwCode',
      },
      {
        title: '法人',
        dataIndex: 'jsdwFr',
      },
      {
        title: '电话',
        dataIndex: 'jsdwTel',
      },
    ],
  },
  {
    title: '施工单位',
    key: 'sgdw',
    index: 14,
    children: [
      {
        title: '名称',
        dataIndex: 'sgdwName',
      },
      {
        title: '法人',
        dataIndex: 'sgdwFr',
      },
      {
        title: '电话',
        dataIndex: 'sgdwTel',
      },
    ],
  },
  {
    title: '监理单位',
    key: 'jldw',
    index: 15,
    children: [
      {
        title: '名称',
        dataIndex: 'jldwName',
      },
      {
        title: '法人',
        dataIndex: 'jldwFr',
      },
      {
        title: '电话',
        dataIndex: 'jldwTel',
      },
    ],
  },
  {
    title: '勘察设计',
    key: 'kcdw',
    index: 16,
    children: [
      {
        title: '名称',
        dataIndex: 'kcdwName',
      },
      {
        title: '法人',
        dataIndex: 'kcdwFr',
      },
      {
        title: '电话',
        dataIndex: 'kcdwTel',
      },
    ],
  },
  {
    title: '设计单位',
    key: 'sjdw',
    index: 17,
    children: [
      {
        title: '名称',
        dataIndex: 'sjdwName',
      },
      {
        title: '法人',
        dataIndex: 'sjdwFr',
      },
      {
        title: '电话',
        dataIndex: 'sjdwTel',
      },
    ],
  },
  {
    title: '检测单位',
    key: 'jcdw',
    index: 18,
    children: [
      {
        title: '名称',
        dataIndex: 'jcdwName',
      },
      {
        title: '法人',
        dataIndex: 'jcdwFr',
      },
      {
        title: '电话',
        dataIndex: 'jcdwTel',
      },
    ],
  },
];

@connect(({ eng, loading }) => ({
  eng,
  loading: loading.effects['eng/fetch'],
}))
@Form.create()
export default class Search extends Component {
  state = {
    expandForm: false,
    selectedRows: [],
    selectedColumns: [],
    formValues: {},
  };

  componentDidMount() {
    const {form, dispatch} = this.props;
    form.setFieldsValue({
      category: [
        'name',
        'investment',
        'area',
        'length',
        'code',
        'jsxz',
        'address',
        'cantonCode',
        'startDate',
        'bjrq',
        'jsdw',
        'sgdw',
      ],
    });
    this.handleColumnsFormSubmit();
    dispatch({
      type: 'eng/fetch',
    });
  }

  handleColumnsFormSubmit = () => {
    const { form } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;

        const values = {
          ...fieldsValue,
        };

        const selectedCategory = values.category;
        const selectedColumns = [];
        selectedCategory.forEach(category => {
          columns.forEach(col => {
            if (col.key === category) {
              selectedColumns.push(col);
            }
          })
        });

        const colSort = (key) => {
          return (o1, o2) => {
            if (o1[key] < o2[key]) {
              return -1;
            } else if (o1[key] > o2[key]) {
              return 1;
            } else {
              return 0;
            }
          }
        };

        this.setState({
          formValues: values,
          selectedColumns: selectedColumns.sort(colSort('index')),
        });

      });
    }, 0);
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
      type: 'eng/fetch',
      payload: params,
    });

  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    dispatch({
      type: 'eng/fetch',
      payload: {},
    });

  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
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

      console.log(values);
      dispatch({
        type: 'eng/fetch',
        payload: values,
      });

    });
  };

  renderQueryItemSimpleForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSearch} layout="inline">
          <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="工程名称">
                {getFieldDecorator('name')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="项目地址">
                {getFieldDecorator('address')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
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
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }

  renderQueryItemAdvancedForm() {
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
              <FormItem label="项目地址">
                {getFieldDecorator('address')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
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
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </span>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="建设单位">
                {getFieldDecorator('jsdwName')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="施工单位">
                {getFieldDecorator('sgdwName')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="监理单位">
                {getFieldDecorator('jldwName')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="勘察单位">
                {getFieldDecorator('kcdwName')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="设计单位">
                {getFieldDecorator('sjdwName')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="检测单位">
                {getFieldDecorator('jcdwName')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
            <Col md={6} sm={24}>
              <FormItem label="总投资">
                {getFieldDecorator('investment')(<InputNumber placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="面积">
                {getFieldDecorator('area')(<InputNumber placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="公里数">
                {getFieldDecorator('length')(<InputNumber placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="建设性质">
                {getFieldDecorator('jsxz')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={6} sm={24}>
              <FormItem label="项目代码">
                {getFieldDecorator('code')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="地区区划">
                {getFieldDecorator('cantonCode')(<InputNumber placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="开工年份">
                {getFieldDecorator('kgnf')(<InputNumber placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="建成年份">
                {getFieldDecorator('jcnf')(<InputNumber placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem label="开工日期">
                {getFieldDecorator('startDate')(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem label="报监日期">
                {getFieldDecorator('bjrq')(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }

  renderQueryItemForm() {
    return this.state.expandForm ? this.renderQueryItemAdvancedForm() : this.renderQueryItemSimpleForm();
  }

  render() {

    const { eng: { data }, loading, form } = this.props;
    const { selectedColumns, selectedRows } = this.state;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderLayout title="在建工程">
        <div className={styles.tableListForm}>{this.renderQueryItemForm()}</div>
        <Card style={{ marginTop: 24 }} bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="统计项目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect onChange={this.handleColumnsFormSubmit} expandable>
                    <TagSelect.Option value="name">项目名称</TagSelect.Option>
                    <TagSelect.Option value="investment">总投资</TagSelect.Option>
                    <TagSelect.Option value="area">面积</TagSelect.Option>
                    <TagSelect.Option value="length">公里数</TagSelect.Option>
                    <TagSelect.Option value="code">项目代码</TagSelect.Option>
                    <TagSelect.Option value="jsxz">建设性质</TagSelect.Option>
                    <TagSelect.Option value="address">项目地址</TagSelect.Option>
                    <TagSelect.Option value="cantonCode">建设地区划</TagSelect.Option>
                    <TagSelect.Option value="startDate">计划开工日期</TagSelect.Option>
                    <TagSelect.Option value="bjrq">报监日期</TagSelect.Option>
                    <TagSelect.Option value="kgnf">开工年份</TagSelect.Option>
                    <TagSelect.Option value="jcnf">建成年份</TagSelect.Option>
                    <TagSelect.Option value="jsdw">建设单位</TagSelect.Option>
                    <TagSelect.Option value="sgdw">施工单位</TagSelect.Option>
                    <TagSelect.Option value="jldw">监理单位</TagSelect.Option>
                    <TagSelect.Option value="kcdw">勘察单位</TagSelect.Option>
                    <TagSelect.Option value="sjdw">设计单位</TagSelect.Option>
                    <TagSelect.Option value="jcdw">检测单位</TagSelect.Option>
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
          </Form>
        </Card>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={selectedColumns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
