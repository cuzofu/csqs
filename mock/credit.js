import { parse } from 'url';

const calcualteCreditLevel = (score) => {
  if (score >= 80) {
    return 'A';
  } else if (score >= 65) {
    return 'B';
  } else {
    return 'C';
  }
};

const creditListDataSource = [];
for (let i = 0; i < 50; i += 1) {
  const creditScore = Math.floor(Math.random() * 100) + 50;
  creditListDataSource.push({
    key: i,
    disabled: false,
    name: `湖北升思科技股份有限公司 ${i+1}`,
    creditLevel: calcualteCreditLevel(creditScore),
    creditScore,
    badBehaviorAmount: Math.floor(Math.random() * 100),
    goodBehaviorAmount: Math.floor(Math.random() * 100),
  });
}

export function getOrgCredit(req, res) {

  let dataSource = [...creditListDataSource];

  const params = req.body;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.name) {
    dataSource = dataSource.filter(data =>
      data.name.indexOf(params.name) > -1
    );
  }

  if (params.creditLevel) {
    const creditLevel = params.creditLevel.split(',');
    let filterDataSource = [];
    creditLevel.forEach(level => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => data.creditLevel === level)
      );
    });
    dataSource = filterDataSource;
  }

  // 诚信分值
  if (params.creditScoreStart && params.creditScoreEnd) {
    if (params.creditScoreStart / 1 >= params.creditScoreEnd / 1) {
      dataSource = dataSource.filter(data =>
        data.creditScore <= params.creditScoreStart && data.creditScore >= params.creditScoreEnd
      );
    } else {
      dataSource = dataSource.filter(data =>
        data.creditScore >= params.creditScoreStart && data.creditScore <= params.creditScoreEnd
      );
    }
  } else if (params.creditScoreStart) {
    dataSource = dataSource.filter(data =>
      data.creditScore >= params.creditScoreStart
    );
  } else if (params.creditScoreEnd) {
    dataSource = dataSource.filter(data =>
      data.creditScore <= params.creditScoreEnd
    );
  }

  // 不良行为次数
  if (params.badBehaviorAmountStart && params.badBehaviorAmountEnd) {
    if (params.badBehaviorAmountStart/1 >= params.badBehaviorAmountEnd/1) {
      dataSource = dataSource.filter(data =>
        data.badBehaviorAmount <= params.badBehaviorAmountStart && data.badBehaviorAmount >= params.badBehaviorAmountEnd
      );
    } else {
      dataSource = dataSource.filter(data =>
        data.badBehaviorAmount >= params.badBehaviorAmountStart && data.badBehaviorAmount <= params.badBehaviorAmountEnd
      );
    }
  } else if (params.badBehaviorAmountStart) {
    dataSource = dataSource.filter(data =>
      data.badBehaviorAmount >= params.badBehaviorAmountStart
    );
  } else if (params.badBehaviorAmountEnd) {
    dataSource = dataSource.filter(data =>
      data.badBehaviorAmount <= params.badBehaviorAmountEnd
    );
  }

  // 良好行为次数
  if (params.goodBehaviorAmountStart && params.goodBehaviorAmountEnd) {
    if (params.goodBehaviorAmountStart/1 >= params.goodBehaviorAmountEnd/1) {
      dataSource = dataSource.filter(data =>
        data.goodBehaviorAmount <= params.goodBehaviorAmountStart && data.goodBehaviorAmount >= params.goodBehaviorAmountEnd
      );
    } else {
      dataSource = dataSource.filter(data =>
        data.goodBehaviorAmount >= params.goodBehaviorAmountStart && data.goodBehaviorAmount <= params.goodBehaviorAmountEnd
      );
    }
  } else if (params.goodBehaviorAmountStart) {
    dataSource = dataSource.filter(data =>
      data.goodBehaviorAmount >= params.goodBehaviorAmountStart
    );
  } else if (params.goodBehaviorAmountEnd) {
    dataSource = dataSource.filter(data =>
      data.goodBehaviorAmount <= params.goodBehaviorAmountEnd
    );
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function fakeStatisticsData(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const fakeBadBehaviorData = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3];
  const badBehaviorDataLastYear = [];
  const fakeGoodBehaviorData = [12, 15, 10, 2, 4, 8, 5, 1, 9, 9, 3, 15];
  const goodBehaviorDataLastYear = [];
  const district = ['西陵区', '伍家区', '点军区', '猇亭区', '夷陵区', '远安县', '兴山县', '秭归县', '长阳县', '五峰县', '宜都市', '当阳市', '枝江市'];
  const badBehaviorGroupByDistrict = [];
  const goodBehaviorGroupByDistrict = [];

  if (params.startTime && params.endTime) {
    for (let i = 0; i < fakeBadBehaviorData.length; i += 1) {
      badBehaviorDataLastYear.push({
        x: `2017年${i+1}月`,
        y: fakeBadBehaviorData[i],
      });
    }
    for (let i = 0; i < fakeGoodBehaviorData.length; i += 1) {
      goodBehaviorDataLastYear.push({
        x: `2017年${i+1}月`,
        y: fakeGoodBehaviorData[i],
      });
    }

    for (let i = 0; i < 12; i += 1) {
      badBehaviorGroupByDistrict.push({
        x: `${district[i]}`,
        y: Math.floor(Math.random() * 100) + 20,
      });
      goodBehaviorGroupByDistrict.push({
        x: `${district[i]}`,
        y: Math.floor(Math.random() * 100) + 20,
      });
    }
  }

  // 每月新增企业诚信行为曲线图
  const orgCreditDataLast12Month = [
    {
      month: '一月',
      '良好行为': 7,
      '不良行为': 3,
    },
    {
      month: '二月',
      '良好行为': 12,
      '不良行为': 6,
    },
    {
      month: '三月',
      '良好行为': 2,
      '不良行为': 2,
    },
    {
      month: '四月',
      '良好行为': 6,
      '不良行为': 2,
    },
    {
      month: '五月',
      '良好行为': 3,
      '不良行为': 2,
    },
    {
      month: '六月',
      '良好行为': 18,
      '不良行为': 16,
    },
    {
      month: '七月',
      '良好行为': 10,
      '不良行为': 4,
    },
    {
      month: '八月',
      '良好行为': 10,
      '不良行为': 4,
    },
    {
      month: '九月',
      '良好行为': 7,
      '不良行为': 4,
    },
    {
      month: '十月',
      '良好行为': 11,
      '不良行为': 23,
    },
    {
      month: '十一月',
      '良好行为': 7,
      '不良行为': 3,
    },
    {
      month: '十二月',
      '良好行为': 1,
      '不良行为': 6,
    },
  ];

  const result = {
    badBehaviorDataLastYear,
    goodBehaviorDataLastYear,
    badBehaviorGroupByDistrict,
    goodBehaviorGroupByDistrict,
    orgCreditDataLast12Month,
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getOrgCredit,
  fakeStatisticsData,
}
