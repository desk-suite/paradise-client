import React from 'react';
import styled from 'styled-components';
import { ipcRenderer, remote } from 'electron';
import { Layout, Avatar, Menu, Dropdown, Icon } from 'antd';
import { MdSettings, MdChatBubbleOutline } from 'react-icons/md';

export const Header = () => {
  const Base = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    height: 62px;
    width: fit-content;
    line-height: initial;
    user-select: none;
  `;
  const AppName = styled.span`
    font-family: 'Comfortaa';
    font-weight: 600;
    font-size: 16px;
  `;
  const AppVersion = styled.span`
    font-family: 'Comfortaa';
    font-weight: 200;
    font-size: 8px;
  `;
  const Info = styled.div`
    display: grid;
    grid-template-columns: 32px 32px 32px;
    column-gap: 16px;
  `;
  const [appVersion] = React.useState(remote.app.getVersion());

  const userMenu = (
    <Menu>
      <Menu.Item>Perfil</Menu.Item>
      <Menu.Item>Cerrar sesión</Menu.Item>
    </Menu>
  );
  const settingsMenu = (
    <Menu>
      <Menu.Item>Configuración</Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={() => {
          ipcRenderer.send('electron-update', { type: 'checkUpdates' });
        }}
      >
        Buscar actualizaciones
      </Menu.Item>
      <Menu.Item>Acerca</Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header style={{ background: '#f0f2f5' }}>
      <Base>
        <Title>
          <AppName>Paradise Client</AppName>
          <AppVersion>Versión: {appVersion}</AppVersion>
        </Title>
        <Info>
          <Dropdown
            overlay={settingsMenu}
            trigger={['click']}
            placement="bottomRight"
          >
            <Icon
              component={MdSettings}
              style={{
                padding: '4px',
                cursor: 'pointer',
                fontSize: '24px'
              }}
            />
          </Dropdown>
          <Dropdown
            overlay={userMenu}
            trigger={['click']}
            placement="bottomRight"
          >
            <Icon
              component={MdChatBubbleOutline}
              style={{
                padding: '4px',
                cursor: 'pointer',
                fontSize: '24px'
              }}
            />
          </Dropdown>
          <Dropdown
            overlay={userMenu}
            trigger={['click']}
            placement="bottomRight"
          >
            <Avatar style={{ cursor: 'pointer' }}>D</Avatar>
          </Dropdown>
        </Info>
      </Base>
    </Layout.Header>
  );
};
