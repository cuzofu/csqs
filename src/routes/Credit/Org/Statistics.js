import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Tooltip,
  Card,
  Tabs,
  DatePicker,
  Form,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  Field,
  MiniArea,
  Bar,
} from '../../../components/Charts';
import Trend from '../../../components/Trend';
import PageHeaderLayout from "../../../layouts/PageHeaderLayout";

import { getTimeDistance } from '../../../utils/utils'

import styles from './Statistics.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `升思科技${i}`,
    total: 20 - i,
  });
}

@connect(({ creditOrgStatistics, loading }) => ({
  creditOrgStatistics,
  loading: loading.effects['creditOrgStatistics/fetch'],
}))
@Form.create()
export default class Statistics extends Component {
  state = {
    rangePickerValue: getTimeDistance('month'),
  };

  componentDidMount() {

    const {rangePickerValue} = this.state;
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");
    this.props.dispatch({
      type: 'creditOrgStatistics/fetch',
      payload: {
        startTime,
        endTime,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'creditOrgStatistics/clear',
    });
  }

  handleRangePickerChange = rangePickerValue => {

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }

    this.setState({
      rangePickerValue,
    });

    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");
    this.props.dispatch({
      type: 'creditOrgStatistics/fetchDataGroupByDistrict',
      payload: {
        startTime,
        endTime,
      },
    });
  };

  selectDate = type => {
    const rangePickerValue = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    this.setState({
      rangePickerValue,
    });

    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");
    this.props.dispatch({
      type: 'creditOrgStatistics/fetchDataGroupByDistrict',
      payload: {
        startTime,
        endTime,
      },
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
      return styles.currentDate;
    }
  }

  render() {

    const { rangePickerValue } = this.state;
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const behaviorExtra = (
      <div className={styles.behaviorExtraWrap}>
        <div className={styles.behaviorExtra}>
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
        <RangePicker value={rangePickerValue} onChange={this.handleRangePickerChange} style={{ width: 256 }} />
      </div>
    );

    const { creditOrgStatistics, loading } = this.props;
    const {
      badBehaviorDataLastYear,
      goodBehaviorDataLastYear,
      badBehaviorGroupByDistrict,
      goodBehaviorGroupByDistrict,
    } = creditOrgStatistics;
    let totalBadBehaviorLastYear = 0;
    let totalGoodBehaviorLastYear = 0;
    badBehaviorDataLastYear.forEach( val => {
      totalBadBehaviorLastYear += val.y
    });
    goodBehaviorDataLastYear.forEach( val => {
      totalGoodBehaviorLastYear += val.y
    });

    return (
      <PageHeaderLayout title="诚信统计">
        <Fragment>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                loading={loading}
                bordered={false}
                title="纳入诚信企业数量"
                action={
                  <Tooltip title="指标说明：纳入诚信企业数量总数">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(560).format('0,0')}
                footer={<Field label="日均销售额" value={`￥${numeral(12423).format('0,0')}`} />}
                contentHeight={46}
              >
                <Trend flag="up" style={{ marginRight: 16 }}>
                  周同比<span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="down">
                  日环比<span className={styles.trendText}>11%</span>
                </Trend>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                loading={loading}
                bordered={false}
                title="不良行为次数"
                action={
                  <Tooltip title="指标说明：最近一年每月产生的不良行为次数">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(totalBadBehaviorLastYear).format('0,0')}
                footer={<Field label="本月产生次数" value={numeral(12).format('0,0')} />}
                contentHeight={46}
              >
                <MiniArea color="#975FE4" data={badBehaviorDataLastYear} />
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                loading={loading}
                bordered={false}
                title="良好行为次数"
                action={
                  <Tooltip title="指标说明：最近一年每月产生的良好行为次数">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(totalGoodBehaviorLastYear).format('0,0')}
                footer={<Field label="本月产生次数" value={numeral(21).format('0,0')} />}
                contentHeight={46}
              >
                <MiniArea color="#975FE4" data={goodBehaviorDataLastYear} />
              </ChartCard>
            </Col>
          </Row>
        </Fragment>
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.behaviorCard}>
            <Tabs loading={loading} tabBarExtraContent={behaviorExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="不良行为" key="badBehavior">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.behaviorBar}>
                      <Bar height={295} title="各县市区企业不良行为次数" data={badBehaviorGroupByDistrict} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.behaviorRank}>
                      <h4 className={styles.rankingTitle}>企业不良行为次数排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="良好行为" key="goodBehavior">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.behaviorBar}>
                      <Bar height={295} title="各县市区企业良好行为次数" data={goodBehaviorGroupByDistrict} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.behaviorRank}>
                      <h4 className={styles.rankingTitle}>企业良好行为次数排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
