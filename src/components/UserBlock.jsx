import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import Logout from './Logout';

const UserBlock = ({ onLogout }) => {
	const userName = localStorage.getItem('auth_name');

	const menu = (
		<Menu>
			{/* <Menu.Item key="settings">Настройки</Menu.Item> */}
			{/* <Menu.Divider /> */}
			<Logout onLogout={onLogout} />
		</Menu>
	);

	return (
		<>
			{userName ? <span style={{ marginRight: 8, fontWeight: 600 }}>{userName}</span> : null}

			<Dropdown overlay={menu} trigger={['click']}>
				<Avatar
					style={{
						color: '#f56a00',
						backgroundColor: '#fde3cf',
					}}>
					{userName ? userName[0] : '-'}
				</Avatar>
			</Dropdown>
		</>
	);
};

export default UserBlock;
