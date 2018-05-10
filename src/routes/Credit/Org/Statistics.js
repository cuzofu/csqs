import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
  Row,
} from 'antd';

import PageHeaderLayout from "../../../layouts/PageHeaderLayout";

@connect(({ statistics, loading }) => ({
  statistics,
  loading: loading.effects['statistics/fetch'],
}))
export default class Statistics extends Component {

  render() {
    return (
      <PageHeaderLayout title="诚信统计">
        <Fragment>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="总销售额"
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={() => <Yuan>126560</Yuan>}
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
                bordered={false}
                title="访问量"
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(8846).format('0,0')}
                footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
                contentHeight={46}
              >
                <MiniArea color="#975FE4" data={visitData} />
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="支付笔数"
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(6560).format('0,0')}
                footer={<Field label="转化率" value="60%" />}
                contentHeight={46}
              >
                <MiniBar data={visitData} />
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title="运营活动效果"
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total="78%"
                footer={
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    <Trend flag="up" style={{ marginRight: 16 }}>
                      周同比<span className={styles.trendText}>12%</span>
                    </Trend>
                    <Trend flag="down">
                      日环比<span className={styles.trendText}>11%</span>
                    </Trend>
                  </div>
                }
                contentHeight={46}
              >
                <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
              </ChartCard>
            </Col>
          </Row>
        </Fragment>
      </PageHeaderLayout>
    );
  }
}
