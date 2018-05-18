import React, { Component } from 'react';
import { connect } from 'dva';
import { DataSet } from '@antv/data-set';

import {
  Row,
  Col,
  Icon,
  Card,
  Radio,
  Menu,
  Dropdown,
  DatePicker,
  Tabs,
} from 'antd';
import numeral from 'numeral';
import {
  Pie,
  GroupBar,
} from '../../components/Charts';

import styles from './Statistics.less';

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import StandardTable from '../../components/StandardTable';
import ScrollTable from '../../components/ScrollTable';
import { getTimeDistance } from '../../utils/utils';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const columnsStage = [
  {
    title: '工程类型',
    dataIndex: 'engType',
  },
  {
    title: '招投标工程',
    children: [
      {
        title: '数量',
        dataIndex: 'ztbEngAmount',
        align: 'center',
      },
      {
        title: '投资额（万元）',
        dataIndex: 'ztbEngInvestment',
        align: 'center',
      },
      {
        title: '面积（㎡）',
        dataIndex: 'ztbEngArea',
        align: 'center',
      },
      {
        title: '公里数（km）',
        dataIndex: 'ztbEngLength',
        align: 'center',
      },
    ],
  },
  {
    title: '施工合同工程',
    children: [
      {
        title: '数量',
        dataIndex: 'sghtEngAmount',
        align: 'center',
      },
      {
        title: '投资额（万元）',
        dataIndex: 'sghtEngInvestment',
        align: 'center',
      },
      {
        title: '面积（㎡）',
        dataIndex: 'sghtEngArea',
        align: 'center',
      },
      {
        title: '公里数（km）',
        dataIndex: 'sghtEngLength',
        align: 'center',
      },
    ],
  },
  {
    title: '施工许可工程',
    children: [
      {
        title: '数量',
        dataIndex: 'sgxkEngAmount',
        align: 'center',
      },
      {
        title: '投资额（万元）',
        dataIndex: 'sgxkEngInvestment',
        align: 'center',
      },
      {
        title: '面积（㎡）',
        dataIndex: 'sgxkEngArea',
        align: 'center',
      },
      {
        title: '公里数（km）',
        dataIndex: 'sgxkEngLength',
        align: 'center',
      },
    ],
  },
];

const columnsDistrict = [
  {
    title: '工程类型',
    dataIndex: 'engType',
    align: 'center',
    fixed: 'left',
    width: 100,
  },
  {
    title: '市辖区',
    children: [
      {
        title: '数量',
        dataIndex: 'sxqEngAmount',
        align: 'center',
        width: 100,
      },
      {
        title: '投资额（万元）',
        dataIndex: 'sxqEngInvestment',
        align: 'center',
        width: 150,
      },
      {
        title: '面积（㎡）',
        dataIndex: 'sxqEngArea',
        align: 'center',
        width: 150,
      },
      {
        title: '公里数（km）',
        dataIndex: 'sxqEngLength',
        align: 'center',
        width: 150,
      },
    ],
  },
  {
    title: '西陵区',
    children: [
      {
        title: '数量',
        dataIndex: 'xlqEngAmount',
        align: 'center',
        width: 100,
      },
      {
        title: '投资额（万元）',
        dataIndex: 'xlqEngInvestment',
        align: 'center',
        width: 150,
      },
      {
        title: '面积（㎡）',
        dataIndex: 'xlqEngArea',
        align: 'center',
        width: 150,
      },
      {
        title: '公里数（km）',
        dataIndex: 'xlqEngLength',
        align: 'center',
        width: 150,
      },
    ],
  },
  {
    title: '伍家岗区',
    children: [
      {
        title: '数量',
        dataIndex: 'wjqEngAmount',
        align: 'center',
        width: 150,
      },
      {
        title: '投资额（万元）',
        dataIndex: 'wjqEngInvestment',
        align: 'center',
        width: 150,
      },
      {
        title: '面积（㎡）',
        dataIndex: 'wjqEngArea',
        align: 'center',
        width: 150,
      },
      {
        title: '公里数（km）',
        dataIndex: 'wjqEngLength',
        align: 'center',
        width: 150,
      },
    ],
  },
  {
    title: '猇亭区',
    children: [
      {
        title: '数量',
        dataIndex: 'xtqEngAmount',
        align: 'center',
        width: 100,
      },
      {
        title: '投资额（万元）',
        dataIndex: 'xtqEngInvestment',
        align: 'center',
        width: 150,
      },
      {
        title: '面积（㎡）',
        dataIndex: 'xtqEngArea',
        align: 'center',
        width: 150,
      },
      {
        title: '公里数（km）',
        dataIndex: 'xtqEngLength',
        align: 'center',
        width: 150,
      },
    ],
  },
  {
    title: '点军区',
    children: [
      {
        title: '数量',
        dataIndex: 'djqEngAmount',
        align: 'center',
        width: 100,
      },
      {
        title: '投资额（万元）',
        dataIndex: 'djqEngInvestment',
        align: 'center',
        width: 150,
      },
      {
        title: '面积（㎡）',
        dataIndex: 'djqEngArea',
        align: 'center',
        width: 150,
      },
      {
        title: '公里数（km）',
        dataIndex: 'djqEngLength',
        align: 'center',
        width: 150,
      },
    ],
  },
  {
    title: '夷陵区',
    children: [
      {
        title: '数量',
        dataIndex: 'ylqEngAmount',
        align: 'center',
        width: 100,
      },
      {
        title: '投资额（万元）',
        dataIndex: 'ylqEngInvestment',
        align: 'center',
        width: 150,
      },
      {
        title: '面积（㎡）',
        dataIndex: 'ylqEngArea',
        align: 'center',
        width: 150,
      },
      {
        title: '公里数（km）',
        dataIndex: 'ylqkEngLength',
        align: 'center',
        width: 150,
      },
    ],
  },
];

@connect(({ engStatistics, loading }) => ({
  engStatistics,
  loading: loading.effects['engStatistics/fetch'],
}))
export default class Statistics extends Component {
  state = {
    engAmountType: 'ztb',
    engAmountDatePickerValue: getTimeDistance('month'),
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'engStatistics/fetch',
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'engStatistics/clear',
    });
  }

  handleChangeEngType = (e) => {
    this.setState({
      engAmountType: e.target.value,
    });
  };

  handleEngAmountDatePickerChange = engAmountDatePickerValue => {

    if (!engAmountDatePickerValue[0] || !engAmountDatePickerValue[1]) {
      return;
    }

    this.setState({
      engAmountDatePickerValue,
    });

  };

  isActive(type) {
    const { engAmountDatePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!engAmountDatePickerValue[0] || !engAmountDatePickerValue[1]) {
      return;
    }
    if (engAmountDatePickerValue[0].isSame(value[0], 'day') && engAmountDatePickerValue[1].isSame(value[1], 'day')) {
      return styles.currentDate;
    }
  }

  selectDate = type => {
    const engAmountDatePickerValue = getTimeDistance(type);
    if (!engAmountDatePickerValue[0] || !engAmountDatePickerValue[1]) {
      return;
    }
    this.setState({
      engAmountDatePickerValue,
    });
  };

  render() {

    const { engAmountType, engAmountDatePickerValue } = this.state;
    const { engStatistics, loading } = this.props;
    console.log(engStatistics);
    const {
      engTypeZtbDate,
      engTypeSghtDate,
      engTypeSgxkDate,
      engDataByStage,
      engDataByDistrict,
      engGroupBarData,
    } = engStatistics;

    let engAmountPieData;
    let engAmountPieSubTitle;
    switch(engAmountType) {
      case 'ztb':
        engAmountPieData = engTypeZtbDate;
        engAmountPieSubTitle = '招投标';
        break;
      case 'sght':
        engAmountPieData = engTypeSghtDate;
        engAmountPieSubTitle = '施工合同';
        break;
      case 'sgxk':
        engAmountPieData = engTypeSgxkDate;
        engAmountPieSubTitle = '施工许可';
        break;
      default:
        engAmountPieData = [];
        engAmountPieSubTitle = '';
        break;
    }

    console.log(engGroupBarData);
    const dv = new DataSet().createView().source(engGroupBarData);
    dv.transform({
      type: 'fold',
      fields: ['公共建筑','市政工程','绿化工程','住宅工程','工业厂房','构筑物'], // 展开字段集
      key: 'x', // key字段
      value: 'y', // value字段
    });
    console.log(dv);

    return (
      <PageHeaderLayout title="工程统计">

        <Card
          title="工程分阶段统计表格"
          extra={
            <div className={styles.datePickerExtraWrap}>
              <div className={styles.datePickerExtra}>
                <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                  今日
                </a>
                <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                  本周
                </a>
                <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                  本月
                </a>
                <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                  全年
                </a>
              </div>
              <RangePicker value={engAmountDatePickerValue} onChange={this.handleRangePickerChange} style={{ width: 256 }} />
            </div>
          }
        >
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={[]}
              loading={loading}
              data={engDataByStage}
              columns={columnsStage}
            />
          </div>
        </Card>

        <Card
          style={{marginTop: 16}}
          title="工程分区域统计表格"
          extra={
            <div className={styles.datePickerExtraWrap}>
              <div className={styles.datePickerExtra}>
                <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                  今日
                </a>
                <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                  本周
                </a>
                <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                  本月
                </a>
                <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                  全年
                </a>
              </div>
              <RangePicker value={engAmountDatePickerValue} onChange={this.handleRangePickerChange} style={{ width: 256 }} />
            </div>
          }
        >
          <div className={styles.tableList}>
            <ScrollTable
              selectedRows={[]}
              loading={loading}
              data={engDataByDistrict}
              columns={columnsDistrict}
              scroll={{x: 3400}}
            />
          </div>
        </Card>

        <Card loading={loading} bodyStyle={{ padding: 0 }} style={{marginTop: 16}}>
          <div className={styles.zztCard}>
            <Tabs
              tabBarExtraContent={
                <div className={styles.datePickerExtraWrap}>
                  <div className={styles.datePickerExtra}>
                    <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
                      今日
                    </a>
                    <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                      本周
                    </a>
                    <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                      本月
                    </a>
                    <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                      全年
                    </a>
                  </div>
                  <RangePicker value={engAmountDatePickerValue} onChange={this.handleRangePickerChange} style={{ width: 256 }} />
                </div>
              }
              size="large"
              tabBarStyle={{ marginBottom: 16 }}
            >
              <TabPane tab="阶段" key="stage">
                <Row>
                  <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.zztBar}>
                      <GroupBar height={295} title="按阶段统计" data={dv} />
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <Row gutter={24} style={{marginTop: '16px'}}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.engAmountCard}
              bordered={false}
              title="工程类型数量占比"
              bodyStyle={{ padding: 24 }}
              style={{ minHeight: 509, minWidth: 300 }}
              extra={
                <div className={styles.engAmountCardExtra}>
                  <span className={styles.iconGroup}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item>操作一</Menu.Item>
                          <Menu.Item>操作二</Menu.Item>
                        </Menu>
                      }
                      placement="bottomRight"
                    >
                      <Icon type="ellipsis" />
                    </Dropdown>
                  </span>
                  <div className={styles.engTypeRadio}>
                    <Radio.Group value={engAmountType} onChange={this.handleChangeEngType}>
                      <Radio.Button value="ztb">招投标</Radio.Button>
                      <Radio.Button value="sght">施工合同</Radio.Button>
                      <Radio.Button value="sgxk">施工许可</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
            >
              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <h4 style={{ marginTop: 8, marginBottom: 32 }}>{engAmountPieSubTitle}</h4>
                  <Pie
                    hasLegend
                    subTitle='工程数量'
                    total={
                      numeral(
                        engAmountPieData.reduce((pre, now) => {
                          return now.y + pre;
                        }, 0)
                      ).format('0,0')
                    }
                    data={engAmountPieData}
                    valueFormat={value => numeral(value).format('0,0')}
                    height={248}
                    lineWidth={4}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
