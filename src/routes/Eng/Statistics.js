import React, { Component } from 'react';
import { connect } from 'dva';
import { DataSet } from '@antv/data-set';

import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';

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
        dataIndex: 'ylqEngLength',
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
    statisticsType: 'amount',
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

  handleChangeStatisticsType = (e) => {
    this.setState({
      statisticsType: e.target.value,
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

    const { engAmountType, statisticsType, engAmountDatePickerValue } = this.state;
    const { engStatistics, loading } = this.props;
    const {
      engTypeZtbDate,
      engTypeSghtDate,
      engTypeSgxkDate,
      engDataByStage,
      engDataByDistrict,
      engDataByStageGroupBar,
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

    const ds = new DataSet();
    const dvStageAmount = ds.createView().source(engDataByStageGroupBar.amount ? engDataByStageGroupBar.amount : []);
    dvStageAmount.transform({
      type: 'fold',
      fields: ['公共建筑','市政工程','绿化工程','住宅工程','工业厂房','构筑物'], // 展开字段集
      key: '工程类别', // key字段
      value: '工程数量', // value字段
    });
    const dvStageInvestment = ds.createView().source(engDataByStageGroupBar.investment ? engDataByStageGroupBar.investment : []);
    dvStageInvestment.transform({
      type: 'fold',
      fields: ['公共建筑','市政工程','绿化工程','住宅工程','工业厂房','构筑物'], // 展开字段集
      key: '工程类别', // key字段
      value: '投资额', // value字段
    });
    const dvStageArea = ds.createView().source(engDataByStageGroupBar.area ? engDataByStageGroupBar.area : []);
    dvStageArea.transform({
      type: 'fold',
      fields: ['公共建筑','市政工程','绿化工程','住宅工程','工业厂房','构筑物'], // 展开字段集
      key: '工程类别', // key字段
      value: '面积', // value字段
    });
    const dvStageLength = ds.createView().source(engDataByStageGroupBar.length ? engDataByStageGroupBar.length : []);
    dvStageLength.transform({
      type: 'fold',
      fields: ['公共建筑','市政工程','绿化工程','住宅工程','工业厂房','构筑物'], // 展开字段集
      key: '工程类别', // key字段
      value: '公里数', // value字段
    });

    const originPieData = engDataByDistrict.list.filter(item => item.engType === '公共建筑');
    let pieDataByDistrict = [];
    let pieDataByDistrictTitle = '';
    switch (statisticsType) {
      case 'amount':
        pieDataByDistrictTitle = "工程数量";
        pieDataByDistrict = originPieData && originPieData.length > 0 ? [
          {
            x: '市辖区',
            y: originPieData[0].sxqEngAmount,
          },
          {
            x: '西陵区',
            y: originPieData[0].xlqEngAmount,
          },
          {
            x: '伍家岗区',
            y: originPieData[0].wjqEngAmount,
          },
          {
            x: '猇亭区',
            y: originPieData[0].xtqEngAmount,
          },
          {
            x: '点军区',
            y: originPieData[0].djqEngAmount,
          },
          {
            x: '夷陵区',
            y: originPieData[0].ylqEngAmount,
          },
        ] : [];
        break;
      case 'investment':
        pieDataByDistrictTitle = "投资额（万元）";
        pieDataByDistrict = originPieData && originPieData.length > 0 ? [
          {
            x: '市辖区',
            y: originPieData[0].sxqEngInvestment,
          },
          {
            x: '西陵区',
            y: originPieData[0].xlqEngInvestment,
          },
          {
            x: '伍家岗区',
            y: originPieData[0].wjqEngInvestment,
          },
          {
            x: '猇亭区',
            y: originPieData[0].xtqEngInvestment,
          },
          {
            x: '点军区',
            y: originPieData[0].djqEngInvestment,
          },
          {
            x: '夷陵区',
            y: originPieData[0].ylqEngInvestment,
          },
        ] : [];
        break;
      case 'area':
        pieDataByDistrictTitle = "面积（㎡）";
        pieDataByDistrict = originPieData && originPieData.length > 0 ? [
          {
            x: '市辖区',
            y: originPieData[0].sxqEngArea,
          },
          {
            x: '西陵区',
            y: originPieData[0].xlqEngArea,
          },
          {
            x: '伍家岗区',
            y: originPieData[0].wjqEngArea,
          },
          {
            x: '猇亭区',
            y: originPieData[0].xtqEngArea,
          },
          {
            x: '点军区',
            y: originPieData[0].djqEngArea,
          },
          {
            x: '夷陵区',
            y: originPieData[0].ylqEngArea,
          },
        ] : [];
        break;
      case 'length':
        pieDataByDistrictTitle = "公里数（km）";
        pieDataByDistrict = originPieData && originPieData.length > 0 ? [
          {
            x: '市辖区',
            y: originPieData[0].sxqEngLength,
          },
          {
            x: '西陵区',
            y: originPieData[0].xlqEngLength,
          },
          {
            x: '伍家岗区',
            y: originPieData[0].wjqEngLength,
          },
          {
            x: '猇亭区',
            y: originPieData[0].xtqEngLength,
          },
          {
            x: '点军区',
            y: originPieData[0].djqEngLength,
          },
          {
            x: '夷陵区',
            y: originPieData[0].ylqEngLength,
          },
        ] : [];
        break;
      default:
        pieDataByDistrict = [];
        pieDataByDistrictTitle = "";
        break;
    }

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
              <TabPane tab="工程数量" key="amount">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.zztBar}>
                      <Chart height={400} data={dvStageAmount} forceFit>
                        <Axis name="工程类别" />
                        <Axis name="工程数量" />
                        <Legend />
                        <Tooltip crosshairs={{type : "y"}} />
                        <Geom type='interval' position="工程类别*工程数量" color="name" adjust={[{type: 'dodge',marginRatio: 1/32}]} />
                      </Chart>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="投资额" key="investment">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.zztBar}>
                      <Chart height={400} data={dvStageInvestment} forceFit>
                        <Axis name="工程类别" />
                        <Axis name="投资额" />
                        <Legend />
                        <Tooltip crosshairs={{type : "y"}} />
                        <Geom type='interval' position="工程类别*投资额" color="name" adjust={[{type: 'dodge',marginRatio: 1/32}]} />
                      </Chart>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="面积" key="area">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.zztBar}>
                      <Chart height={400} data={dvStageArea} forceFit>
                        <Axis name="工程类别" />
                        <Axis name="面积" />
                        <Legend />
                        <Tooltip crosshairs={{type : "y"}} />
                        <Geom type='interval' position="工程类别*面积" color="name" adjust={[{type: 'dodge',marginRatio: 1/32}]} />
                      </Chart>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="公里数" key="length">
                <Row>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className={styles.zztBar}>
                      <Chart height={400} data={dvStageLength} forceFit>
                        <Axis name="工程类别" />
                        <Axis name="公里数" />
                        <Legend />
                        <Tooltip crosshairs={{type : "y"}} />
                        <Geom type='interval' position="工程类别*公里数" color="name" adjust={[{type: 'dodge',marginRatio: 1/32}]} />
                      </Chart>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
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

        <Row gutter={24} style={{marginTop: '16px'}}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.engAmountCard}
              bordered={false}
              title="各类型工程数量饼图"
              bodyStyle={{ padding: 24 }}
              style={{ minHeight: 509, minWidth: 300 }}
              extra={
                <div className={styles.engAmountCardExtra}>
                  <span className={styles.iconGroup}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item>数量</Menu.Item>
                          <Menu.Item>投资额</Menu.Item>
                          <Menu.Item>面积</Menu.Item>
                          <Menu.Item>公里数</Menu.Item>
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

          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.engAmountCard}
              bordered={false}
              title="各区工程数据饼图"
              bodyStyle={{ padding: 24 }}
              style={{ minHeight: 509, minWidth: 300 }}
              extra={
                <div className={styles.engAmountCardExtra}>
                  <span className={styles.iconGroup}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item>数量</Menu.Item>
                          <Menu.Item>投资额</Menu.Item>
                          <Menu.Item>面积</Menu.Item>
                          <Menu.Item>公里数</Menu.Item>
                        </Menu>
                      }
                      placement="bottomRight"
                    >
                      <Icon type="ellipsis" />
                    </Dropdown>
                  </span>
                  <div className={styles.engTypeRadio}>
                    <Radio.Group value={statisticsType} onChange={this.handleChangeStatisticsType}>
                      <Radio.Button value="amount">工程数量</Radio.Button>
                      <Radio.Button value="investment">投资额</Radio.Button>
                      <Radio.Button value="area">面积</Radio.Button>
                      <Radio.Button value="length">长度</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
            >
              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <h4 style={{ marginTop: 8, marginBottom: 32 }}>按区划统计</h4>
                  <Pie
                    hasLegend
                    subTitle={pieDataByDistrictTitle}
                    total={
                      numeral(
                        pieDataByDistrict.reduce((pre, now) => {
                          return now.y + pre;
                        }, 0)
                      ).format('0,0')
                    }
                    data={pieDataByDistrict}
                    valueFormat={value => numeral(value).format('0,0')}
                    height={248}
                    lineWidth={4}
                    tooltip
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
