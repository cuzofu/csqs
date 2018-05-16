import { parse } from 'url';
import Mock from 'mockjs';
import Moment from 'moment';

const jsxz = ['新建', '扩建', '改建和技术改造', '迁建', '其他'];
const jsdwFr = [
  {
    name: '付志明',
    tel: '13562515158',
  },
  {
    name: '马寄波',
    tel: '13585486525',
  },
  {
    name: '吴开宇',
    tel: '13695848514',
  },
  {
    name: '吴彭祖',
    tel: '13899584845',
  },
  {
    name: '蒋梦安',
    tel: '13758485145',
  },
  {
    name: '苏傲柏',
    tel: '13354684515',
  },
  {
    name: '孟从雪',
    tel: '15684845155',
  },
  {
    name: '程兴学',
    tel: '15861585151',
  },
  {
    name: '姚温纶',
    tel: '18658848181',
  },
  {
    name: '郭尔槐',
    tel: '18858955154',
  },
  {
    name: '罗凝阳',
    tel: '17081815155',
  },
  {
    name: '肖奇迈',
    tel: '13151848516',
  },
  {
    name: '马夜卉',
    tel: '18568515856',
  },
  {
    name: '闫易槐',
    tel: '15865154586',
  },
  {
    name: '唐书萱',
    tel: '18658658563',
  },
  {
    name: '钱寒梅',
    tel: '13886515156',
  },
  {
    name: '王雪兰',
    tel: '13865486582',
  },
  {
    name: '曹凯捷',
    tel: '13969585625',
  },
];
const sgdwFr = [
  {
    name: '苏奇文',
    tel: '15841215425',
  },
  {
    name: '薛南露',
    tel: '13974521569',
  },
  {
    name: '胡智渊',
    tel: '13512156324',
  },
  {
    name: '付元柳',
    tel: '18741451426',
  },
  {
    name: '苏高洁',
    tel: '18698561452',
  },
  {
    name: '黄怜阳',
    tel: '18631514526',
  },
  {
    name: '姜沛山',
    tel: '18514526325',
  },
  {
    name: '任兴生',
    tel: '18635698741',
  },
  {
    name: '于明轩',
    tel: '15584548658',
  },
  {
    name: '曹修筠',
    tel: '18851514515',
  },
  {
    name: '宋寄蓉',
    tel: '15861561518',
  },
  {
    name: '付孤萍',
    tel: '15848818184',
  },
  {
    name: '马博达',
    tel: '15623151655',
  },
  {
    name: '陆博超',
    tel: '15541512151',
  },
  {
    name: '方芷波',
    tel: '13965846151',
  },
  {
    name: '韦秋灵',
    tel: '13515635215',
  },
  {
    name: '余乐贤',
    tel: '13356848699',
  },
  {
    name: '彭高澹',
    tel: '13847515856',
  },
];
const jldwFr = [
  {
    name: '丁新梅',
    tel: '15568561514',
  },
  {
    name: '孟俊力',
    tel: '17158451586',
  },
  {
    name: '陈依凝',
    tel: '17151525624',
  },
  {
    name: '郝书白',
    tel: '13154784515',
  },
  {
    name: '钟天华',
    tel: '13251545861',
  },
  {
    name: '邓痴旋',
    tel: '13365147851',
  },
  {
    name: '龙熠彤',
    tel: '15847856514',
  },
  {
    name: '杨思源',
    tel: '18547816851',
  },
  {
    name: '曾冷之',
    tel: '18874156251',
  },
  {
    name: '薛夏容',
    tel: '18651485958',
  },
  {
    name: '熊梦凡',
    tel: '18817451895',
  },
  {
    name: '姚晓蕾',
    tel: '18987515625',
  },
  {
    name: '罗靖儿',
    tel: '13847518985',
  },
  {
    name: '冯华晖',
    tel: '13987451471',
  },
  {
    name: '汪嘉瑞',
    tel: '13544578512',
  },
  {
    name: '金雨凝',
    tel: '13386216397',
  },
  {
    name: '董明旭',
    tel: '15833622231',
  },
  {
    name: '魏梦寒',
    tel: '17014231235',
  },
];
const kcdwFr = [
  {
    name: '姚星纬',
    tel: '15551342719',
  },
  {
    name: '严巧夏',
    tel: '17144520019',
  },
  {
    name: '蔡香春',
    tel: '17134011119',
  },
  {
    name: '姜紫文',
    tel: '13131101198',
  },
  {
    name: '覃冷荷',
    tel: '13209145878',
  },
  {
    name: '龚阳旭',
    tel: '13365147851',
  },
  {
    name: '周翰林',
    tel: '15802162556',
  },
  {
    name: '孟子昂',
    tel: '18507033350',
  },
  {
    name: '赵又亦',
    tel: '18804031088',
  },
  {
    name: '闫涵涤',
    tel: '18611982030',
  },
  {
    name: '马奇迈',
    tel: '18821994080',
  },
  {
    name: '陶山兰',
    tel: '18921984100',
  },
  {
    name: '姚心水',
    tel: '13871977110',
  },
  {
    name: '李惜天',
    tel: '13902000093',
  },
  {
    name: '邵奇思',
    tel: '13591997112',
  },
  {
    name: '陈俊美',
    tel: '13315021986',
  },
  {
    name: '孔平春',
    tel: '15850801199',
  },
  {
    name: '毛书竹',
    tel: '17012307921',
  },
];
const sjdwFr = [
  {
    name: '郝天睿',
    tel: '15530602198',
  },
  {
    name: '邱建木',
    tel: '17142635197',
  },
  {
    name: '侯敏才',
    tel: '17190124323',
  },
  {
    name: '何修竹',
    tel: '13107261996',
  },
  {
    name: '孙阳云',
    tel: '13241601197',
  },
  {
    name: '石飞荷',
    tel: '13319930923',
  },
  {
    name: '黄盼柳',
    tel: '15826200009',
  },
  {
    name: '郝立人',
    tel: '18543213350',
  },
  {
    name: '姚德运',
    tel: '18811231088',
  },
  {
    name: '徐翔飞',
    tel: '18611432130',
  },
  {
    name: '于修真',
    tel: '18833444080',
  },
  {
    name: '余雁山',
    tel: '18921984100',
  },
  {
    name: '赵易云',
    tel: '13871977110',
  },
  {
    name: '魏秋巧',
    tel: '13902000093',
  },
  {
    name: '邱凌蝶',
    tel: '13591997112',
  },
  {
    name: '邹雪萍',
    tel: '13315021986',
  },
  {
    name: '高秋巧',
    tel: '15850801199',
  },
  {
    name: '苏谷秋',
    tel: '17012307921',
  },
];
const jcdwFr = [
  {
    name: '汪星津',
    tel: '15530602198',
  },
  {
    name: '向巧夏',
    tel: '17142635197',
  },
  {
    name: '雷代桃',
    tel: '17190124323',
  },
  {
    name: '任宛菡',
    tel: '13107261996',
  },
  {
    name: '蒋黎昕',
    tel: '13241601197',
  },
  {
    name: '钟英毅',
    tel: '13319930923',
  },
  {
    name: '孟嘉熙',
    tel: '15826200009',
  },
  {
    name: '韩新霁',
    tel: '18543213350',
  },
  {
    name: '钟曼卉',
    tel: '18811231088',
  },
  {
    name: '郭鹏海',
    tel: '18611432130',
  },
  {
    name: '张季萌',
    tel: '18833444080',
  },
  {
    name: '严永长',
    tel: '18921984100',
  },
  {
    name: '严诗翠',
    tel: '13871977110',
  },
  {
    name: '谭元灵',
    tel: '13902000093',
  },
  {
    name: '薛国源',
    tel: '13591997112',
  },
  {
    name: '黄翠岚',
    tel: '13315021986',
  },
  {
    name: '曾浩宕',
    tel: '15850801199',
  },
  {
    name: '韩茂勋',
    tel: '17012307921',
  },
];
const cantonCode = [
  {
    code: '420501',
    name: '市辖区',
  },
  {
    code: '420502',
    name: '西陵区',
  },
  {
    code: '420503',
    name: '伍家岗区',
  },
  {
    code: '420504',
    name: '点军区',
  },
  {
    code: '420505',
    name: '猇亭区',
  },
  {
    code: '420506',
    name: '夷陵区',
  },
  {
    code: '420525',
    name: '远安县',
  },
  {
    code: '420526',
    name: '兴山县',
  },
  {
    code: '420527',
    name: '秭归县',
  },
  {
    code: '420528',
    name: '长阳县',
  },
  {
    code: '420529',
    name: '五峰县',
  },
  {
    code: '420581',
    name: '宜都市',
  },
  {
    code: '420582',
    name: '当阳市',
  },
  {
    code: '420583',
    name: '枝江市',
  },
];

const engListDataSource = [];
for (let i = 0; i < 50; i += 1) {
  const random18 = Math.floor(Math.random() * 18);
  engListDataSource.push({
    key: i,
    disabled: false,
    name: `在建工程${i+1}`,
    investment: Math.floor(Math.random() * 10000) + 500,
    area: Math.floor(Math.random() * 10000) + 500,
    length: Math.floor(Math.random() * 10000) + 500,
    code: '42050016156165156156',
    jsxz: jsxz[Math.floor(Math.random() * 5)],
    address: `宜昌市高新区兰台路${i+1}号`,
    cantonCode: cantonCode[Math.floor(Math.random() * 14)].code,
    startDate: Mock.mock('@date("yyyy-MM-dd")'),
    bjrq: Mock.mock('@date("yyyy-MM-dd")'),
    kgnf: Mock.mock('@date("yyyy")'),
    jcnf: Mock.mock('@date("yyyy")'),
    jsdwName: `建设单位 ${i+1}`,
    jsdwCode: '4561651984916165198191',
    jsdwFr: jsdwFr[random18].name,
    jsdwTel: jsdwFr[random18].tel,
    sgdwName: `施工单位 ${i+1}`,
    sgdwFr: sgdwFr[random18].name,
    sgdwTel: sgdwFr[random18].tel,
    jldwName: `监理单位 ${i+1}`,
    jldwFr: jldwFr[random18].name,
    jldwTel: jldwFr[random18].tel,
    kcdwName: `勘察单位 ${i+1}`,
    kcdwFr: kcdwFr[random18].name,
    kcdwTel: kcdwFr[random18].tel,
    sjdwName: `设计单位 ${i+1}`,
    sjdwFr: sjdwFr[random18].name,
    sjdwTel: sjdwFr[random18].tel,
    jcdwName: `检测单位 ${i+1}`,
    jcdwFr: jcdwFr[random18].name,
    jcdwTel: jcdwFr[random18].tel,
  });
}

export function getEngList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  let dataSource = [...engListDataSource];

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

  if (params.address) {
    dataSource = dataSource.filter(data =>
      data.address.indexOf(params.address) > -1
    );
  }

  if (params.jsdwName) {
    dataSource = dataSource.filter(data =>
      data.jsdwName.indexOf(params.jsdwName) > -1
    );
  }

  if (params.sgdwName) {
    dataSource = dataSource.filter(data =>
      data.sgdwName.indexOf(params.sgdwName) > -1
    );
  }

  if (params.jldwName) {
    dataSource = dataSource.filter(data =>
      data.jldwName.indexOf(params.jldwName) > -1
    );
  }

  if (params.kcdwName) {
    dataSource = dataSource.filter(data =>
      data.kcdwName.indexOf(params.kcdwName) > -1
    );
  }

  if (params.sjdwName) {
    dataSource = dataSource.filter(data =>
      data.sjdwName.indexOf(params.sjdwName) > -1
    );
  }

  if (params.jcdwName) {
    dataSource = dataSource.filter(data =>
      data.jcdwName.indexOf(params.jcdwName) > -1
    );
  }

  // 总投资
  if (params.investmentStart && params.investmentEnd) {
    const investmentStart = params.investmentStart / 1;
    const investmentEnd = params.investmentEnd / 1;
    if (investmentStart >= investmentEnd) {
      dataSource = dataSource.filter(data =>
        data.investment <= investmentStart && data.investment >= investmentEnd
      );
    } else {
      dataSource = dataSource.filter(data => {
        return data.investment >= investmentStart && data.investment <= investmentEnd
      });
    }
  } else if (params.investmentStart) {
    dataSource = dataSource.filter(data =>
      data.investment >= (params.investmentStart / 1)
    );
  } else if (params.investmentEnd) {
    dataSource = dataSource.filter(data =>
      data.investment <= (params.investmentEnd / 1)
    );
  }

  // 面积
  if (params.areaStart && params.areaEnd) {
    const areaStart = params.areaStart / 1;
    const areaEnd = params.areaEnd / 1;
    if (areaStart >= areaEnd) {
      dataSource = dataSource.filter(data =>
        data.area <= areaStart && data.area >= areaEnd
      );
    } else {
      dataSource = dataSource.filter(data => {
        return data.area >= areaStart && data.area <= areaEnd
      });
    }
  } else if (params.areaStart) {
    dataSource = dataSource.filter(data =>
      data.area >= (params.areaStart / 1)
    );
  } else if (params.areaEnd) {
    dataSource = dataSource.filter(data =>
      data.area <= (params.areaEnd / 1)
    );
  }

  // 公里数
  if (params.lengthStart && params.lengthEnd) {
    const lengthStart = params.lengthStart / 1;
    const lengthEnd = params.lengthEnd / 1;
    if (lengthStart >= lengthEnd) {
      dataSource = dataSource.filter(data =>
        data.length <= lengthStart && data.length >= lengthEnd
      );
    } else {
      dataSource = dataSource.filter(data => {
        return data.length >= lengthStart && data.length <= lengthEnd
      });
    }
  } else if (params.lengthStart) {
    dataSource = dataSource.filter(data =>
      data.length >= (params.lengthStart / 1)
    );
  } else if (params.lengthEnd) {
    dataSource = dataSource.filter(data =>
      data.length <= (params.lengthEnd / 1)
    );
  }

  if (params.jsxz) {
    const jsxzList = params.jsxz.split(',');
    let filterDataSource = [];
    jsxzList.forEach(val => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => data.jsxz === val)
      );
    });
    dataSource = filterDataSource;
  }

  // 项目代码
  if (params.code) {
    dataSource = dataSource.filter(data =>
      data.code.indexOf(params.code) > -1
    );
  }

  // 地区区划
  if (params.cantonCode) {
    const cantonCodeList = params.cantonCode.split(',');
    let filterDataSource = [];
    cantonCodeList.forEach(val => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => data.cantonCode === val)
      );
    });
    dataSource = filterDataSource;
  }

  // 开工年份
  if (params.kgnf) {
    dataSource = dataSource.filter(data =>
      data.kgnf === params.kgnf
    );
  }

  // 建成年份
  if (params.jcnf) {
    dataSource = dataSource.filter(data =>
      data.jcnf === params.jcnf
    );
  }

  // 开工日期
  if (params.startDate) {
    const startDateList = params.startDate.split(',');
    const min = startDateList[0];
    const max = startDateList[1];
    dataSource = dataSource.filter(data => {
      const kgrq = Moment(data.startDate).unix();
      if (min <= max) {
        return kgrq >= min && kgrq <= max
      } else {
        return kgrq <= min && kgrq >= max
      }
    });
  }

  // 报监日期
  if (params.bjrq) {
    const bjrqList = params.bjrq.split(',');
    const min = bjrqList[0];
    const max = bjrqList[1];
    dataSource = dataSource.filter(data => {
      const bjrq = Moment(data.bjrq).unix();
      if (min <= max) {
        return bjrq >= min && bjrq <= max
      } else {
        return bjrq <= min && bjrq >= max
      }
    });
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

export default {
  getEngList,
}
