import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { MdDashboard, MdRoomService, MdShoppingCart } from 'react-icons/md';

export const AppMenu = withRouter(props => {
  const handleSelect = ({ key }) => {
    props.history.push(`/${key}`);
  };
  return (
    <Layout.Sider theme="light" trigger={null} collapsible collapsed>
      <Menu
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        style={{ height: '100%' }}
        onSelect={handleSelect}
      >
        <Menu.ItemGroup>
          <Menu.Item key="dashboard">
            <Icon component={MdDashboard} />
            <span>Dashboard</span>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup>
          <Menu.Item key="hotel">
            <Icon component={MdRoomService} />
            <span>Hotel</span>
          </Menu.Item>
          <Menu.Item key="pos">
            <Icon component={MdShoppingCart} />
            <span>Punto de ventas</span>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Layout.Sider>
  );
});
