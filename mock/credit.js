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

export function getOrgCredit(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  let dataSource = [...creditListDataSource];

  const params = parse(url, true).query;

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
