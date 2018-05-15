import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '企业诚信',
    icon: 'form',
    path: 'credit/org',
    authority: 'admin',
    children: [
      {
        name: '诚信查询',
        path: 'search',
      },
      {
        name: '诚信统计',
        path: 'statistics',
      },
    ],
  },
  {
    name: '建筑工程',
    icon: 'form',
    path: 'eng',
    authority: 'admin',
    children: [
      {
        name: '在建工程',
        path: 'search',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
