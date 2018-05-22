import React, { Component } from 'react';
import { connect } from 'dva';
import { DataSet } from '@antv/data-set';

import numeral from 'numeral';

import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';

import {
  Row,
  Col,
  Card,
  Icon,
  Radio,
  TreeSelect,
  Tooltip as AntTooltip,
} from 'antd';

import {
  ChartCard,
  Field,
  Pie,
} from '../../components/Charts';
import Trend from '../../components/Trend';

import styles from './Statistics.less';

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import ScrollTable from '../../components/ScrollTable';

@connect(({ orgStatistics, loading }) => ({
  orgStatistics,
  loading: loading.effects['orgStatistics/fetch'],
}))
export default class Statistics extends Component {
  state = {
    orgSite: 'all',
    eqLevelTreeValue: '107010101',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'orgStatistics/fetch',
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'orgStatistics/clear',
    });
  }

  handleChangeOrgSite = (e) => {
    this.setState({
      orgSite: e.target.value,
    });
  };

  handleChangeEqLevelTree = (val) => {
    this.setState({
      eqLevelTreeValue: val,
    });
  };

  render() {
    const { orgStatistics: { eqTypeData, orgAmountAll, orgAmountLocal, orgAmountForeign, eqLevelTableList }, loading } = this.props;
    const { orgSite } = this.state;

    const ds = new DataSet();
    const dvEqTypeData = ds.createView().source(eqTypeData);
    dvEqTypeData.transform({
      type: 'fold',
      fields: ['施工','招标代理','造价咨询','监理类','检测机构类','商品砼类', '劳务分包类', '勘察类', '设计类', '房地产开发类', '园林绿化类', '施工图审查类', '燃气特许经营类', '自来水特许经营类', '节能墙材类'], // 展开字段集
      key: '所在地', // key字段
      value: '企业数量', // value字段
    });

    let orgAmountPieData = [];
    let orgAmountPieSubTitle = '';
    switch (orgSite) {
      case 'all':
        orgAmountPieData = orgAmountAll;
        orgAmountPieSubTitle = '全部企业';
        break;
      case 'local':
        orgAmountPieData = orgAmountLocal;
        orgAmountPieSubTitle = '本地企业';
        break;
      case 'foreign':
        orgAmountPieData = orgAmountForeign;
        orgAmountPieSubTitle = '外地企业';
        break;
      default:
        orgAmountPieData = [];
        orgAmountPieSubTitle = '';
        break;
    }

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const singleColResponsiveProps = {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 24,
      style: { marginTop: 24 },
    };

    const doubleColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12,
      style: { marginTop: 24 },
    };

    const eqLevelTableColumns = [
      {
        title: '资质名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '总数量',
        dataIndex: 'all',
        key: 'all',
        width: '20%',
        needTotal: true,
      },
      {
        title: '本地数量',
        dataIndex: 'local',
        key: 'local',
        width: '20%',
        needTotal: true,
      },
      {
        title: '外地数量',
        dataIndex: 'foreign',
        key: 'foreign',
        width: '20%',
        needTotal: true,
      },
    ];

    return (
      <PageHeaderLayout title="企业统计">

        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              loading={loading}
              bordered={false}
              title="企业总数"
              action={
                <AntTooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </AntTooltip>
              }
              total={numeral(12423).format('0,0')}
              footer={<Field label="月新增企业数量" value={`${numeral(23).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend style={{ marginRight: 32 }}>本地<span className={styles.trendText}>55%</span>
              </Trend>
              <Trend>外地<span className={styles.trendText}>45%</span>
              </Trend>
            </ChartCard>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...singleColResponsiveProps}>
            <Card
              loading={loading}
              title="企业资质类型统计"
            >
              <div className={styles.tableList}>
                <ScrollTable
                  selectDisable
                  selectedRows={[]}
                  loading={loading}
                  data={eqLevelTableList}
                  columns={eqLevelTableColumns}
                  scroll={{y: 560}}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleStandardTableChange}
                />
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...singleColResponsiveProps}>
            <Card
              loading={loading}
              title="企业数量统计（按资质分）"
            >
              <div>
                <Chart height={400} data={dvEqTypeData} forceFit>
                  <Axis name="所在地" />
                  <Axis name="企业数量" />
                  <Legend />
                  <Tooltip crosshairs={{type : "y"}} />
                  <Geom type='interval' position="所在地*企业数量" color="name" adjust={[{type: 'dodge',marginRatio: 1/32}]} />
                </Chart>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...singleColResponsiveProps}>
            <Card
              loading={loading}
              bordered={false}
              title="各资质企业数量饼图"
              bodyStyle={{ padding: 24 }}
              style={{ minHeight: 509, minWidth: 300 }}
              extra={
                <div>
                  <div>
                    <Radio.Group value={orgSite} onChange={this.handleChangeOrgSite}>
                      <Radio.Button value="all">全部</Radio.Button>
                      <Radio.Button value="local">本地</Radio.Button>
                      <Radio.Button value="foreign">外地</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
            >
              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <h4 style={{ marginTop: 8, marginBottom: 32 }}>{orgAmountPieSubTitle}</h4>
                  <Pie
                    hasLegend
                    subTitle='企业数量'
                    total={
                      numeral(
                        orgAmountPieData.reduce((pre, now) => {
                          return now.y + pre;
                        }, 0)
                      ).format('0,0')
                    }
                    data={orgAmountPieData}
                    valueFormat={value => numeral(value).format('0,0')}
                    height={550}
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
