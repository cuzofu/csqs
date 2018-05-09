import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  InputNumber,
} from 'antd';
import StandardTable from '../../components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardFormRow from 'components/StandardFormRow';

import styles from './Credit.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const creditLevelList = [
  {
    id: 'A',
    name: 'A级',
  },
  {
    id: 'B',
    name: 'B级',
  },
  {
    id: 'C',
    name: 'C级',
  },
];

@connect(({ credit, loading }) => ({
  credit,
  loading: loading.models.credit,
}))
@Form.create()
export default class Credit extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'credit/fetch',
    });
  }

  clearCreditLevel = () => {
    const { form } = this.props;
    form.setFieldsValue({
      creditLevel: [],
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
      type: 'credit/fetch',
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
      type: 'credit/fetch',
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
        creditLevel: fieldsValue.creditLevel.join(','),
      };

      this.setState({
        formValues: values,
      });

      console.log(values);
      dispatch({
        type: 'credit/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="工程名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="诚信等级">
              {getFieldDecorator('creditLevel', {
                initialValue: [],
              })(
                <Select
                  mode="multiple"
                  style={{ maxWidth: 286, width: '100%' }}
                  placeholder="选择诚信等级"
                >
                  {creditLevelList.map(level => (
                    <Option key={level.id} value={level.id}>
                      {level.name}
                    </Option>
                  ))}
                </Select>
              )}
              <a className={styles.clearCreditLevelTrigger} onClick={this.clearCreditLevel}>清除</a>
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
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="工程名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="诚信等级">
              {getFieldDecorator('creditLevel', {
                initialValue: [],
              })(
                <Select
                  mode="multiple"
                  style={{ maxWidth: 286, width: '100%' }}
                  placeholder="选择诚信等级"
                >
                  {creditLevelList.map(level => (
                    <Option key={level.id} value={level.id}>
                      {level.name}
                    </Option>
                  ))}
                </Select>
              )}
              <a className={styles.clearCreditLevelTrigger} onClick={this.clearCreditLevel}>清除</a>
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
        <StandardFormRow title="诚信分值" grid last>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={4} sm={24}>
              <FormItem label="起">
                {getFieldDecorator('creditScoreStart')(<InputNumber placeholder="请输入最小分值" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={4} sm={24}>
              <FormItem label="止">
                {getFieldDecorator('creditScoreEnd')(<InputNumber placeholder="请输入最大分值" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
        </StandardFormRow>
        <StandardFormRow title="不良行为次数" grid last>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={4} sm={24}>
              <FormItem label="起">
                {getFieldDecorator('badBehaviorAmountStart')(<InputNumber placeholder="请输入最少次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={4} sm={24}>
              <FormItem label="止">
                {getFieldDecorator('badBehaviorAmountEnd')(<InputNumber placeholder="请输入最多次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
        </StandardFormRow>
        <StandardFormRow title="良好行为次数" grid last>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={4} sm={24}>
              <FormItem label="起">
                {getFieldDecorator('goodBehaviorAmountStart')(<InputNumber placeholder="请输入最少次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={4} sm={24}>
              <FormItem label="止">
                {getFieldDecorator('goodBehaviorAmountEnd')(<InputNumber placeholder="请输入最多次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
        </StandardFormRow>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { credit: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    const columns = [
      {
        title: '企业名称',
        dataIndex: 'name',
      },
      {
        title: '诚信分值',
        dataIndex: 'creditScore',
        sorter: true,
        align: 'center',
      },
      {
        title: '诚信等级',
        dataIndex: 'creditLevel',
        sorter: true,
        align: 'center',
        render: val => `${val}级`,
      },
      {
        title: '不良行为次数',
        dataIndex: 'badBehaviorAmount',
        sorter: true,
        // mark to display a total number
        needTotal: true,
        align: 'center',
      },
      {
        title: '良好行为次数',
        dataIndex: 'goodBehaviorAmount',
        sorter: true,
        // mark to display a total number
        needTotal: true,
        align: 'center',
      },
    ];

    return (
      <PageHeaderLayout title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
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
