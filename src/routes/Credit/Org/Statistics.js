import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { DataSet } from '@antv/data-set';

import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';

import {
  Row,
  Col,
  Icon,
  Tooltip as AntTooltip,
  Card,
  Tabs,
  DatePicker,
  Form,
  Modal,
  Timeline,
  Spin,
  Select,
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

const ZzType = [
  {
    code: '4201',
    name: '施工',
  },
  {
    code: '4202',
    name: '招标代理',
  },
  {
    code: '4203',
    name: '造价咨询',
  },
  {
    code: '4204',
    name: '监理',
  },
  {
    code: '4205',
    name: '检测',
  },
  {
    code: '4206',
    name: '商品砼',
  },
  {
    code: '4207',
    name: '劳务分包',
  },
  {
    code: '4208',
    name: '勘察设计',
  },
  {
    code: '4209',
    name: '建设',
  },
  {
    code: '4211',
    name: '图审',
  },
  {
    code: '4214',
    name: '节能',
  },
  {
    code: '4216',
    name: '装饰装修',
  },
  {
    code: '4217',
    name: '起重设备',
  },
];

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
  badBehaviorByTypeLoading: loading.effects['creditOrgStatistics/fetchBadBehaviorByType'],
  behaviorMiniAreaLoading: loading.effects['creditOrgStatistics/fetchBehaviorMiniArea'],
}))
@Form.create()
export default class Statistics extends Component {
  state = {
    badBehaviorByTypeTimeInterval: getTimeDistance('month'),
    rangePickerValue: getTimeDistance('month'),
    modal: {
      title: '',
      visible: false,
      content: undefined,
    },
    // 企业资质类型
    zzType: {
      name: '施工',
      code: '4201',
    },
  };

  componentDidMount() {

    const {
      rangePickerValue,
      // 企业资质类型，默认4201
      zzType,
    } = this.state;
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
    this.props.dispatch({
      type: 'creditOrgStatistics/fetchBehaviorMiniArea',
      payload: {
        startTime,
        endTime,
      },
    });
    this.props.dispatch({
      type: 'creditOrgStatistics/fetchBadBehaviorByType',
      payload: {
        zzType: zzType.code,
        startTime,
        endTime,
      },
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'creditOrgStatistics/clear',
    });
  }

  onBadBehaviorBarClick = (ev) => {
    if (!ev || !ev.data || ev.data === undefined || !ev.data._origin) {
      return;
    }
    const t = this;
    const {_origin} = ev.data;

    const {
      badBehaviorByTypeTimeInterval,
    } = t.state;
    if (!badBehaviorByTypeTimeInterval[0] || !badBehaviorByTypeTimeInterval[1]) {
      return;
    }
    const startTime = badBehaviorByTypeTimeInterval[0].format("YYYY-MM-DD");
    const endTime = badBehaviorByTypeTimeInterval[1].format("YYYY-MM-DD");

    t.props.dispatch({
      type: 'creditOrgStatistics/clearBadBehaviorDataGroupByTypeDetail',
    });

    const modal = {
      ...t.state.modal,
      title: `${_origin.x}类不良行为详情`,
      visible: true,
      content: (
        <div className={styles.spinDiv}>
          <Spin />
        </div>
      ),
    };
    t.setState({
      modal,
    });

    t.fetchBadBehaviorDataGroupByTypeDetail({
      id: _origin.id,
      startTime,
      endTime,
    });

  };

  setModalVisible = (visible) => {
    const {modal} = this.state;
    this.setState({
      modal: {
        ...modal,
        visible,
      },
    });
  };

  badBehaviorClick = () => {
    const modal = {
      title: '不良行为详情',
      visible: true,
      content: (
        <div>
          <p>不良行为1...</p>
          <p>不良行为2...</p>
          <p>不良行为3...</p>
        </div>
      ),
    };
    this.setState({
      modal,
    });
  };

  goodBehaviorClick = () => {
    const modal = {
      title: '良好行为详情',
      visible: true,
      content: (
        <div>
          <p>良好行为1...</p>
          <p>良好行为2...</p>
          <p>良好行为3...</p>
          <p>良好行为4...</p>
        </div>
      ),
    };
    this.setState({
      modal,
    });
  };

  fetchBadBehaviorDataGroupByTypeDetail = (params) => {

    const t = this;
    t.props.dispatch({
      type: 'creditOrgStatistics/fetchBadBehaviorDataGroupByTypeDetail',
      payload: params,
    }).then(() => {
      const { creditOrgStatistics: { badBehaviorDataGroupByTypeDetail }} = t.props;
      const modalContent = (
        <div style={{maxHeight: '520px', overflow: 'auto'}}>
          <Timeline style={{marginTop: '10px'}}>
            {
              badBehaviorDataGroupByTypeDetail && badBehaviorDataGroupByTypeDetail.map(cd => {
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
      );
      t.setState({
        modal: {
          ...t.state.modal,
          content: modalContent,
        },
      });
    });
  };

  handleBadBehaviorTimeIntervalChange = timeInterval => {

    if (!timeInterval[0] || !timeInterval[1]) {
      return;
    }

    this.setState({
      badBehaviorByTypeTimeInterval: timeInterval,
    });

    const { zzType } = this.state;
    const startTime = timeInterval[0].format("YYYY-MM-DD");
    const endTime = timeInterval[1].format("YYYY-MM-DD");
    this.props.dispatch({
      type: 'creditOrgStatistics/fetchBadBehaviorByType',
      payload: {
        zzType: zzType.code,
        startTime,
        endTime,
      },
    });
  };

  handleRangePickerChange = rangePickerValue => {

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }

    this.setState({
      rangePickerValue,
    });

    const { zzType } = this.state;
    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");
    this.props.dispatch({
      type: 'creditOrgStatistics/fetchDataGroupByDistrict',
      payload: {
        zzType,
        startTime,
        endTime,
      },
    });
  };

  selectDateBadBehaviorTimeInterval = type => {
    const timeInterval = getTimeDistance(type);
    if (!timeInterval[0] || !timeInterval[1]) {
      return;
    }

    this.setState({
      badBehaviorByTypeTimeInterval: timeInterval,
    });

    const { zzType } = this.state;
    const startTime = timeInterval[0].format("YYYY-MM-DD");
    const endTime = timeInterval[1].format("YYYY-MM-DD");
    this.props.dispatch({
      type: 'creditOrgStatistics/fetchBadBehaviorByType',
      payload: {
        zzType: zzType.code,
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

    const { zzType } = this.state;
    const startTime = rangePickerValue[0].format("YYYY-MM-DD");
    const endTime = rangePickerValue[1].format("YYYY-MM-DD");
    this.props.dispatch({
      type: 'creditOrgStatistics/fetchDataGroupByDistrict',
      payload: {
        // 资质类型(例：4201)
        zzType: zzType.code,
        startTime,
        endTime,
      },
    });
  };

  isActiveBadBehaviorTimeInterval = type => {
    const { badBehaviorByTypeTimeInterval } = this.state;
    const value = getTimeDistance(type);
    if (!badBehaviorByTypeTimeInterval[0] || !badBehaviorByTypeTimeInterval[1]) {
      return;
    }
    if (badBehaviorByTypeTimeInterval[0].isSame(value[0], 'day') && badBehaviorByTypeTimeInterval[1].isSame(value[1], 'day')) {
      return styles.currentDate;
    }
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

  handleZzTypeChange = (evl) => {
    if (!evl) {
      return;
    }

    const tab = ZzType.filter( i => i.code === evl);
    if (!tab || tab.length === 0) {
      return;
    }
    this.setState({
      zzType: {
        ...tab[0],
      },
    });

    const t = this;
    const {
      badBehaviorByTypeTimeInterval,
    } = t.state;
    if (!badBehaviorByTypeTimeInterval[0] || !badBehaviorByTypeTimeInterval[1]) {
      return;
    }
    const startTime = badBehaviorByTypeTimeInterval[0].format("YYYY-MM-DD");
    const endTime = badBehaviorByTypeTimeInterval[1].format("YYYY-MM-DD");

    this.props.dispatch({
      type: 'creditOrgStatistics/fetchBadBehaviorByType',
      payload: {
        // 资质类型(例：4201)
        zzType: evl,
        startTime,
        endTime,
      },
    });

  };

  render() {

    const {
      badBehaviorByTypeTimeInterval,
      rangePickerValue,
      zzType,
    } = this.state;
    const badBehaviorByTypeExtra = (
      <div className={styles.behaviorExtraWrap}>
        <div className={styles.behaviorExtra}>
          <Select defaultValue={zzType.code} style={{ width: 120 }} onChange={this.handleZzTypeChange}>
            {
              ZzType.map(type => (
                <Select.Option key={type.code} value={type.code}>{type.name}</Select.Option>
              ))
            }
          </Select>
          <a className={this.isActiveBadBehaviorTimeInterval('today')} onClick={() => this.selectDateBadBehaviorTimeInterval('today')}>
            今日
          </a>
          <a className={this.isActiveBadBehaviorTimeInterval('week')} onClick={() => this.selectDateBadBehaviorTimeInterval('week')}>
            本周
          </a>
          <a className={this.isActiveBadBehaviorTimeInterval('month')} onClick={() => this.selectDateBadBehaviorTimeInterval('month')}>
            本月
          </a>
          <a className={this.isActiveBadBehaviorTimeInterval('year')} onClick={() => this.selectDateBadBehaviorTimeInterval('year')}>
            全年
          </a>
        </div>
        <RangePicker value={badBehaviorByTypeTimeInterval} onChange={this.handleBadBehaviorTimeIntervalChange} style={{ width: 256 }} />
      </div>
    );

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

    const {
      creditOrgStatistics: {
        badBehaviorGroupByDistrict,
        goodBehaviorGroupByDistrict,
        orgCreditDataLast12Month,
        badBehaviorByType,

        badBehaviorMiniArea,
        goodBehaviorMiniArea,
      },
      loading,
      badBehaviorByTypeLoading,
      behaviorMiniAreaLoading,
    } = this.props;

    const badBehaviorByTypeBarData = [];
    if (badBehaviorByType && badBehaviorByType.barData && badBehaviorByType.barData.list) {
      badBehaviorByType.barData.list.forEach( data => {
        badBehaviorByTypeBarData.push({
          ...data,
          x: data.type,
          y: data.data,
        });
      });
    }
    let totalBadBehaviorLastYear = 0;
    let totalGoodBehaviorLastYear = 0;
    if (!behaviorMiniAreaLoading) {
      badBehaviorMiniArea.forEach( val => {
        totalBadBehaviorLastYear += val.y
      });
      goodBehaviorMiniArea.forEach( val => {
        totalGoodBehaviorLastYear += val.y
      });
    }

    const ds = new DataSet();
    const dvOrgCreditDataLast12Month = ds.createView().source(orgCreditDataLast12Month);
    dvOrgCreditDataLast12Month.transform({
      type: 'fold',
      fields: ['良好行为', '不良行为'], // 展开字段集
      key: '诚信行为', // key字段
      value: '次数', // value字段
    });

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
    };

    const singleColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 24,
    };

    return (
      <PageHeaderLayout title="诚信统计">
        <Modal
          closable
          width={window.innerWidth / 3 * 2}
          title={this.state.modal.title}
          visible={this.state.modal.visible}
          onOk={() => this.setModalVisible(false)}
          onCancel={() => this.setModalVisible(false)}
        >
          {this.state.modal.content}
        </Modal>
        <Fragment>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                loading={loading}
                bordered={false}
                title="纳入诚信企业数量"
                action={
                  <AntTooltip title="指标说明：纳入诚信企业数量总数">
                    <Icon type="info-circle-o" />
                  </AntTooltip>
                }
                total={numeral(560).format('0,0')}
                footer={<Field label="日增数量" value={`${numeral(12).format('0,0')}`} />}
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
                onClick={() => this.badBehaviorClick(true)}
                loading={behaviorMiniAreaLoading}
                bordered={false}
                title="不良行为次数"
                action={
                  <AntTooltip title="指标说明：最近一年每月产生的不良行为次数">
                    <Icon type="info-circle-o" />
                  </AntTooltip>
                }
                total={numeral(totalBadBehaviorLastYear).format('0,0')}
                footer={<Field label="本月产生次数" value={numeral(12).format('0,0')} />}
                contentHeight={46}
              >
                <MiniArea color="#975FE4" data={badBehaviorMiniArea} />
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                onClick={() => this.goodBehaviorClick(true)}
                loading={behaviorMiniAreaLoading}
                bordered={false}
                title="良好行为次数"
                action={
                  <AntTooltip title="指标说明：最近一年每月产生的良好行为次数">
                    <Icon type="info-circle-o" />
                  </AntTooltip>
                }
                total={numeral(totalGoodBehaviorLastYear).format('0,0')}
                footer={<Field label="本月产生次数" value={numeral(21).format('0,0')} />}
                contentHeight={46}
              >
                <MiniArea color="#975FE4" data={goodBehaviorMiniArea} />
              </ChartCard>
            </Col>
          </Row>
        </Fragment>

        <Card loading={loading} bordered={false} className={styles.spacing}>
          <Spin spinning={badBehaviorByTypeLoading}>
            <div className={styles.behaviorCard}>
              <Tabs tabBarExtraContent={badBehaviorByTypeExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
                <TabPane tab={`不良行为分类统计(${zzType.name})`} key="badBehaviorGroupByType">
                  <Row>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                      <div className={styles.behaviorBar}>
                        <Bar
                          height={295}
                          data={badBehaviorByTypeBarData}
                          onPlotClick={(ev) => this.onBadBehaviorBarClick(ev)}
                        />
                      </div>
                    </Col>
                    <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                      <div className={styles.behaviorRank}>
                        <h4 className={styles.rankingTitle}>不良行为排名</h4>
                        <ul className={styles.rankingList}>
                          {
                            badBehaviorByType.rankData.map((item, i) => {
                              if (i < 5) {
                                return (
                                  <li key={item.id}>
                                    <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                                    <span>{item.name}</span>
                                    <span>{`${numeral(item.data).format('0,0')}次`}</span>
                                  </li>
                                )
                              }
                            })
                          }
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </Spin>
        </Card>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }} className={styles.spacing}>
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

        <Card loading={loading} className={styles.spacing}>
          <Row gutter={24}>
            <Col {...singleColResponsiveProps}>
              <div>
                <h2>最近12个月每月新增诚信行为记录数量曲线图</h2>
                <Chart height={400} data={dvOrgCreditDataLast12Month} onPlotClick={(ev) => {console.log(ev.data && ev.data._origin)}} forceFit>
                  <Axis name="month" />
                  <Axis name="次数" label={{formatter: val => `${val}次`}} />
                  <Legend />
                  <Tooltip crosshairs={{type : "y"}} />
                  <Geom type="line" position="month*次数" size={2} color="诚信行为" shape="smooth" />
                  <Geom type='point' position="month*次数" size={4} color="诚信行为" shape="circle" style={{ stroke: '#fff', lineWidth: 1}} />
                </Chart>
              </div>
            </Col>
          </Row>
        </Card>

      </PageHeaderLayout>
    );
  }
}
