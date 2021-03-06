import React, { Component } from 'react';
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
  Modal,
  Timeline,
} from 'antd';
import StandardTable from '../../../components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import StandardFormRow from '../../../components/StandardFormRow';

import styles from './Search.less';

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

@connect(({ creditOrgSearch, loading }) => ({
  creditOrgSearch,
  loading: loading.effects['creditOrgSearch/fetch'],
}))
@Form.create()
export default class Credit extends Component {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    modalVisible: false,
    modalTitle: '',
  };

  componentDidMount() {

    const { dispatch } = this.props;
    dispatch({
      type: 'creditOrgSearch/fetch',
      payload: {},
    });
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };

  showBadBehaviorAmountModal = (item, record) => {
    const {dispatch} = this.props;

    dispatch({
      type: 'creditOrgSearch/cleanCreditDetail',
    });
    dispatch({
      type: 'creditOrgSearch/fetchDetail',
      payload: {
        type: 'ST002',
        id: record.id,
      },
    });

    this.setState({
      modalTitle: '不良行为详情',
      modalVisible: true,
    });
    // dispatch(routerRedux.push('/exception/404'));
  };

  showGoodBehaviorAmountModal = (item, record) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'creditOrgSearch/fetchDetail',
      payload: {
        type: 'ST001',
        id: record.id,
      },
    });
    this.setState({
      modalTitle: '良好行为详情',
      modalVisible: true,
    })
  };

  clearCreditLevel = (e) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.setFieldsValue({
      creditLevel: [],
    });
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'creditOrgSearch/fetch',
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
      params.sort = `${sorter.field}`;
      params.direction = `${sorter.order}`;
    }

    dispatch({
      type: 'creditOrgSearch/fetch',
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
      type: 'creditOrgSearch/fetch',
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
        // creditLevel: fieldsValue.creditLevel,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'creditOrgSearch/fetch',
        payload: JSON.stringify({
          ...values,
        }),
      });
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="企业名称">
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
                  style={{ maxWidth: 286, width: '80%' }}
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
            <FormItem label="企业名称">
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
                  style={{ maxWidth: 286, width: '80%' }}
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
            <Col md={8} sm={24}>
              <FormItem label="起">
                {getFieldDecorator('creditScoreStart')(<InputNumber placeholder="请输入最小分值" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="止">
                {getFieldDecorator('creditScoreEnd')(<InputNumber placeholder="请输入最大分值" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
        </StandardFormRow>
        <StandardFormRow title="不良行为次数" grid last>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="起">
                {getFieldDecorator('badBehaviorAmountStart')(<InputNumber placeholder="请输入最少次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="止">
                {getFieldDecorator('badBehaviorAmountEnd')(<InputNumber placeholder="请输入最多次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
          </Row>
        </StandardFormRow>
        <StandardFormRow title="良好行为次数" grid last>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="起">
                {getFieldDecorator('goodBehaviorAmountStart')(<InputNumber placeholder="请输入最少次数" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
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
    const { creditOrgSearch: { data, creditDetail }, loading } = this.props;
    const { selectedRows, modalVisible, modalTitle } = this.state;
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
        align: 'center',
        render: (val, record) => <div style={{cursor: 'pointer', color: 'red'}} onClick={() => this.showBadBehaviorAmountModal(val, record)}>{val}</div>,
      },
      {
        title: '良好行为次数',
        dataIndex: 'goodBehaviorAmount',
        sorter: true,
        align: 'center',
        render: (val, record) => <div style={{cursor: 'pointer', color: 'green'}} onClick={() => this.showGoodBehaviorAmountModal(val, record)}>{val}</div>,
      },
    ];

    return (
      <PageHeaderLayout title="诚信查询">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectDisable
              selectedRows={selectedRows}
              loading={loading}
              data={!data ? {list: [], pagination: false} : data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          closable
          width={window.innerWidth / 3 * 2}
          title={modalTitle}
          visible={modalVisible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        >
          <div style={{maxHeight: '520px', overflow: 'auto'}}>
            <Timeline>
              {
                creditDetail.data && creditDetail.data.map(cd => {
                  return (
                    <Timeline.Item color="red" key={cd.ID}>
                      <p>名称：{cd.CIONAME}</p>
                      <p>工程：{cd.ENG}</p>
                      <p>行为：{cd.SF}</p>
                      <p>开始时间：{cd.BEGINDATE}</p>
                      <p>结束时间：{cd.ENDDATE}</p>
                      <p>应扣分：{cd.SFVAL}</p>
                      <p>实际扣分：{cd.RAL}</p>
                    </Timeline.Item>
                  )
                })
              }
            </Timeline>
          </div>
        </Modal>
      </PageHeaderLayout>
    );
  }
}
