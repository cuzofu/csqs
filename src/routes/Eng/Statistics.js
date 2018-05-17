import React, { Component } from 'react';
import { connect } from 'dva';

import {
  Row,
  Col,
  Icon,
  Card,
  Radio,
  Menu,
  Dropdown,
  DatePicker,
} from 'antd';
import numeral from 'numeral';
import {
  Pie,
} from '../../components/Charts';

import styles from './Statistics.less';

import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import StandardTable from '../../components/StandardTable';
import { getTimeDistance } from '../../utils/utils';

const { RangePicker } = DatePicker;

const columns = [
  {
    title: '工程类型',
    dataIndex: 'engType',
    key: 'engType',
    index: 1,
  },
  {
    title: '招投标',
    key: 'ztb',
    index: 2,
    children: [
      {
        title: '数量',
        dataIndex: 'ztbEngAmount',
        align: 'center',
      },
      {
        title: '投资额',
        dataIndex: 'ztbEngInvestment',
        align: 'center',
        render: val => `${val}万元`,
      },
      {
        title: '面积',
        dataIndex: 'ztbEngArea',
        align: 'center',
        render: val => `${val}m²`,
      },
      {
        title: '公里数',
        dataIndex: 'ztbEngLength',
        align: 'center',
        render: val => `${val}km`,
      },
    ],
  },
  {
    title: '施工合同',
    key: 'sght',
    index: 2,
    children: [
      {
        title: '数量',
        dataIndex: 'sghtEngAmount',
        align: 'center',
      },
      {
        title: '投资额',
        dataIndex: 'sghtEngInvestment',
        align: 'center',
        render: val => `${val}万元`,
      },
      {
        title: '面积',
        dataIndex: 'sghtEngArea',
        align: 'center',
        render: val => `${val}m²`,
      },
      {
        title: '公里数',
        dataIndex: 'sghtEngLength',
        align: 'center',
        render: val => `${val}km`,
      },
    ],
  },
  {
    title: '施工许可',
    key: 'sgxk',
    index: 2,
    children: [
      {
        title: '数量',
        dataIndex: 'sgxkEngAmount',
        align: 'center',
      },
      {
        title: '投资额',
        dataIndex: 'sgxkEngInvestment',
        align: 'center',
        render: val => `${val}万元`,
      },
      {
        title: '面积',
        dataIndex: 'sgxkEngArea',
        align: 'center',
        render: val => `${val}m²`,
      },
      {
        title: '公里数',
        dataIndex: 'sgxkEngLength',
        align: 'center',
        render: val => `${val}km`,
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
    const {
      engTypeZtbDate,
      engTypeSghtDate,
      engTypeSgxkDate,
      engDataByStage,
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

    return (
      <PageHeaderLayout title="工程统计">

        <Card>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={[]}
              loading={loading}
              data={engDataByStage}
              columns={columns}
            />
          </div>
        </Card>

        <Row gutter={24} style={{marginTop: '16px'}}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
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
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
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
