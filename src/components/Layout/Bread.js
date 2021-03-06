import React, { PropTypes } from 'react';
import { Breadcrumb, Icon } from 'antd';
import styles from './layout.less';
import menu from '../../utils/menu';
import format from '../../utils/format';
import { routes } from '../../router';


const pathSet = [];
const getPathSet = function (menuArray, parentPath) {
  parentPath = parentPath || '/';
  menuArray.map((item) => {
    pathSet[(parentPath + item.key).replace(/\//g, '-').hyphenToHump()] = {
      path: parentPath + item.key,
      name: item.name,
      icon: item.icon || '',
      clickable: item.clickable === undefined,
    };
    if (item.child) {
      getPathSet(item.child, `${parentPath + item.key}/`);
    }
  });
};
getPathSet(menu);

function Bread({ location }) {
  const pathNames = [];
  location.pathname.substr(1).split('/').map((item, key) => {
    if (key > 0) {
      pathNames.push((`${pathNames[key - 1]}-${item}`).hyphenToHump());
    } else {
      pathNames.push((`-${item}`).hyphenToHump());
    }
  });
  const breads = pathNames.map((item, key) => {
    if (!(item in pathSet)) {
      item = 'infor';
    }
    return (
      <Breadcrumb.Item key={key} {...((pathNames.length - 1 === key) || !pathSet[item].clickable) ? '' : { href: `#${pathSet[item].path}` }}>
        {pathSet[item].icon
          ? <Icon type={pathSet[item].icon} />
          : ''}
        <span>{pathSet[item].name}</span>
      </Breadcrumb.Item>
    );
  });

  return (
    <div className={styles.bread}>
      <Breadcrumb >
        <Breadcrumb.Item href="#/"><Icon type="home" />
          <span>主页</span>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  );
}

Bread.propTypes = {
  location: PropTypes.object,
};

export default Bread;
