import React, { Component } from 'react';
import {
  Form,
  Card,
} from 'antd';

import StandardTable from 'components/StandardTable';
import StandardFormRow from 'components/StandardFormRow';
import TagSelect from 'components/TagSelect';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Search.less';

const FormItem = Form.Item;

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
  },
  {
    title: '面积',
    dataIndex: 'area',
    key: 'area',
    sorter: true,
    align: 'center',
    index: 3,
  },
  {
    title: '公里数',
    dataIndex: 'length',
    key: 'length',
    sorter: true,
    align: 'center',
    index: 4,
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
  },
  {
    title: '开工年份',
    dataIndex: 'kgnf',
    key: 'kgnf',
    sorter: true,
    align: 'center',
    index: 11,
  },
  {
    title: '建成年份',
    dataIndex: 'jcnf',
    key: 'jcnf',
    sorter: true,
    align: 'center',
    index: 12,
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
    key: 'kcsj',
    index: 16,
    children: [
      {
        title: '名称',
        dataIndex: 'kcsjName',
      },
      {
        title: '法人',
        dataIndex: 'kcsjFr',
      },
      {
        title: '电话',
        dataIndex: 'kcsjTel',
      },
    ],
  },
  {
    title: '检测单位',
    key: 'jcdw',
    index: 17,
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

@Form.create()
export default class Search extends Component {
  state = {
    selectedRows: [],
    selectedColumns: [],
    formValues: {},
  };

  componentDidMount() {
    const {form} = this.props;
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
        'kgnf',
        'jcnf',
        'jsdw',
        'sgdw',
        'jldw',
        'kcsj',
        'jcdw',
      ],
    });
    this.handleColumnsFormSubmit();
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

  render() {

    const { loading, form } = this.props;
    const { selectedColumns, selectedRows } = this.state;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderLayout title="在建工程">
        <Card bordered={false}>
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
                    <TagSelect.Option value="kcsj">勘察设计</TagSelect.Option>
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
              data={[]}
              columns={selectedColumns}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
