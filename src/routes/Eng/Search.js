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

import ScrollTable from '../../components/ScrollTable';
import StandardFormRow from '../../components/StandardFormRow';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Search.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const jsxz = ['新建', '扩建', '改建和技术改造', '迁建', '其他'];

const districtCodeList = [
  {
    code: '420501',
    name: '市辖区',
  },
  {
    code: '420502',
    name: '西陵区',
  },
  {
    code: '420503',
    name: '伍家岗区',
  },
  {
    code: '420504',
    name: '点军区',
  },
  {
    code: '420505',
    name: '猇亭区',
  },
  {
    code: '420506',
    name: '夷陵区',
  },
  {
    code: '420525',
    name: '远安县',
  },
  {
    code: '420526',
    name: '兴山县',
  },
  {
    code: '420527',
    name: '秭归县',
  },
  {
    code: '420528',
    name: '长阳县',
  },
  {
    code: '420529',
    name: '五峰县',
  },
  {
    code: '420581',
    name: '宜都市',
  },
  {
    code: '420582',
    name: '当阳市',
  },
  {
    code: '420583',
    name: '枝江市',
  },
];

const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
    index: 1,
    width: 400,
    fixed: 'left',
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
    width: 150,
  },
  {
    title: '面积',
    dataIndex: 'area',
    key: 'area',
    sorter: true,
    align: 'center',
    index: 3,
    needTotal: true,
    render: val => `${val}㎡`,
    width: 150,
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
    width: 150,
  },
  {
    title: '项目代码',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
    index: 5,
    width: 250,
  },
  {
    title: '建设性质',
    dataIndex: 'jsxz',
    key: 'jsxz',
    sorter: true,
    align: 'center',
    index: 6,
    width: 150,
  },
  {
    title: '项目地址',
    dataIndex: 'address',
    key: 'address',
    index: 7,
    width: 300,
  },
  {
    title: '建设地区划',
    dataIndex: 'cantonCode',
    key: 'cantonCode',
    sorter: true,
    align: 'center',
    index: 8,
    render: val => {
      let rtn = '';
      districtCodeList.forEach( canton => {
        if (val === canton.code) {
          rtn = canton.name;
        }
      });
      return rtn;
    },
    width: 150,
  },
  {
    title: '计划开工日期',
    dataIndex: 'startDate',
    key: 'startDate',
    sorter: true,
    align: 'center',
    index: 9,
    width: 200,
  },
  {
    title: '报监日期',
    dataIndex: 'bjrq',
    key: 'bjrq',
    sorter: true,
    align: 'center',
    index: 10,
    render: val => `${val}`,
    width: 200,
  },
  {
    title: '开工年份',
    dataIndex: 'kgnf',
    key: 'kgnf',
    sorter: true,
    align: 'center',
    index: 11,
    render: val => `${val}年`,
    width: 200,
  },
  {
    title: '建成年份',
    dataIndex: 'jcnf',
    key: 'jcnf',
    sorter: true,
    align: 'center',
    index: 12,
    render: val => `${val}年`,
    width: 200,
  },
  {
    title: '建设单位',
    key: 'jsdw',
    index: 13,
    width: 650,
    children: [
      {
        title: '名称',
        dataIndex: 'jsdwName',
        align: 'center',
        width: 300,
      },
      {
        title: '信用代码',
        dataIndex: 'jsdwCode',
        align: 'center',
        width: 250,
      },
      {
        title: '法人',
        dataIndex: 'jsdwFr',
        align: 'center',
        width: 100,
      },
      {
        title: '电话',
        dataIndex: 'jsdwTel',
        align: 'center',
        width: 150,
      },
    ],
  },
  {
    title: '施工单位',
    key: 'sgdw',
    index: 14,
    width: 450,
    children: [
      {
        title: '名称',
        dataIndex: 'sgdwName',
        align: 'center',
        width: 200,
      },
      {
        title: '法人',
        dataIndex: 'sgdwFr',
        align: 'center',
        width: 100,
      },
      {
        title: '电话',
        dataIndex: 'sgdwTel',
        align: 'center',
        width: 150,
      },
    ],
  },
  {
    title: '监理单位',
    key: 'jldw',
    index: 15,
    width: 450,
    children: [
      {
        title: '名称',
        dataIndex: 'jldwName',
        align: 'center',
        width: 200,
      },
      {
        title: '法人',
        dataIndex: 'jldwFr',
        align: 'center',
        width: 100,
      },
      {
        title: '电话',
        dataIndex: 'jldwTel',
        align: 'center',
        width: 150,
      },
    ],
  },
  {
    title: '勘察设计',
    key: 'kcdw',
    index: 16,
    width: 450,
    children: [
      {
        title: '名称',
        dataIndex: 'kcdwName',
        align: 'center',
        width: 200,
      },
      {
        title: '法人',
        dataIndex: 'kcdwFr',
        align: 'center',
        width: 100,
      },
      {
        title: '电话',
        dataIndex: 'kcdwTel',
        align: 'center',
        width: 150,
      },
    ],
  },
  {
    title: '设计单位',
    key: 'sjdw',
    index: 17,
    width: 450,
    children: [
      {
        title: '名称',
        dataIndex: 'sjdwName',
        align: 'center',
        width: 200,
      },
      {
        title: '法人',
        dataIndex: 'sjdwFr',
        align: 'center',
        width: 100,
      },
      {
        title: '电话',
        dataIndex: 'sjdwTel',
        align: 'center',
        width: 150,
      },
    ],
  },
  {
    title: '检测单位',
    key: 'jcdw',
    index: 18,
    width: 450,
    children: [
      {
        title: '名称',
        dataIndex: 'jcdwName',
        align: 'center',
        width: 200,
      },
      {
        title: '法人',
        dataIndex: 'jcdwFr',
        align: 'center',
        width: 100,
      },
      {
        title: '电话',
        dataIndex: 'jcdwTel',
        align: 'center',
        width: 150,
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
    tableScrollX: 0,
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

        const tableScrollX = selectedColumns.reduce((pre, next) => {
          return next.width + pre;
        }, 0);

        this.setState({
          formValues: values,
          selectedColumns: selectedColumns.sort(colSort('index')),
          tableScrollX,
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

  clearJsxzSelectOption = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.setFieldsValue({
      jsxz: [],
    });
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

    });

  };

  clearCantonSelectOption = (e) => {
    e.preventDefault();
    const { form } = this.props;
    form.setFieldsValue({
      cantonCode: [],
    });
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

    });

  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      let kgrq;
      if (fieldsValue.startDate && fieldsValue.startDate[0] && fieldsValue.startDate[1]) {
        const dateStart = fieldsValue.startDate[0];
        dateStart.hour(0);
        dateStart.minute(0);
        dateStart.second(0);
        dateStart.millisecond(0);
        const dateEnd = fieldsValue.startDate[1];
        dateEnd.hour(0);
        dateEnd.minute(0);
        dateEnd.second(0);
        dateEnd.millisecond(0);
        kgrq = [dateStart.unix(), dateEnd.unix()];
      }
      let bjrq;
      if (fieldsValue.bjrq && fieldsValue.bjrq[0] && fieldsValue.bjrq[1]) {
        const dateStart = fieldsValue.bjrq[0];
        dateStart.hour(0);
        dateStart.minute(0);
        dateStart.second(0);
        dateStart.millisecond(0);
        const dateEnd = fieldsValue.bjrq[1];
        dateEnd.hour(0);
        dateEnd.minute(0);
        dateEnd.second(0);
        dateEnd.millisecond(0);
        bjrq = [dateStart.unix(), dateEnd.unix()];
      }

      const values = {
        ...fieldsValue,
        jsxz: fieldsValue.jsxz && fieldsValue.jsxz.join(','),
        cantonCode: fieldsValue.cantonCode && fieldsValue.cantonCode.join(','),
        startDate: kgrq && kgrq.join(','),
        bjrq: bjrq && bjrq.join(','),
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
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <StandardFormRow title="总投资" grid last>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={12} sm={24}>
                    <FormItem label="起">
                      {getFieldDecorator('investmentStart')(<InputNumber min={0} placeholder="请输入最小投资额" style={{ width: '100%' }} />)}
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24}>
                    <FormItem label="止">
                      {getFieldDecorator('investmentEnd')(<InputNumber min={0} placeholder="请输入最大投资额" style={{ width: '100%' }} />)}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Col>
            <Col md={12} sm={24}>
              <StandardFormRow title="面积" grid last>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={12} sm={24}>
                    <FormItem label="起">
                      {getFieldDecorator('areaStart')(<InputNumber min={0} placeholder="请输入最小面积" style={{ width: '100%' }} />)}
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24}>
                    <FormItem label="止">
                      {getFieldDecorator('areaEnd')(<InputNumber min={0} placeholder="请输入最大面积" style={{ width: '100%' }} />)}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Col>
          </Row>
          <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <StandardFormRow title="公里数" grid last>
                <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
                  <Col md={12} sm={24}>
                    <FormItem label="起">
                      {getFieldDecorator('lengthStart')(<InputNumber min={0} placeholder="请输入最小公里数" style={{ width: '100%' }} />)}
                    </FormItem>
                  </Col>
                  <Col md={12} sm={24}>
                    <FormItem label="止">
                      {getFieldDecorator('lengthEnd')(<InputNumber min={0} placeholder="请输入最大公里数" style={{ width: '100%' }} />)}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Col>
            <Col md={12} sm={24}>
              <FormItem label="建设性质">
                {getFieldDecorator('jsxz', {
                  initialValue: [],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '80%' }}
                    placeholder="选择建设性质"
                  >
                    {jsxz.map((val) => (
                      <Option key={val} value={val}>{val}</Option>
                    ))}
                  </Select>
                )}
                <a className={styles.clearSelectOptionTrigger} onClick={this.clearJsxzSelectOption}>清除</a>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
            <Col md={6} sm={24}>
              <FormItem label="项目代码">
                {getFieldDecorator('code')(<Input placeholder="请输入" style={{ width: '100%' }} />)}
              </FormItem>
            </Col>
            <Col md={6} sm={24}>
              <FormItem label="地区区划">
                {getFieldDecorator('cantonCode', {
                  initialValue: [],
                })(
                  <Select
                    mode="multiple"
                    style={{ width: '80%' }}
                    placeholder="选择地区区划"
                  >
                    {districtCodeList.map((canton) => (
                      <Option key={canton.code} value={canton.code}>{canton.name}</Option>
                    ))}
                  </Select>
                )}
                <a className={styles.clearSelectOptionTrigger} onClick={this.clearCantonSelectOption}>清除</a>
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
                {getFieldDecorator('bjrq')(<RangePicker onChange={this.onBjrqChange} style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
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
    const { selectedColumns, selectedRows, tableScrollX } = this.state;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderLayout title="在建工程">
        <div className={styles.tableListForm}>{this.renderQueryItemForm()}</div>
        <Card style={{ marginTop: 24 }}>
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
          <div className={styles.tableList}>
            <ScrollTable
              selectDisable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={selectedColumns}
              scroll={{x: tableScrollX, y: 560}}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
