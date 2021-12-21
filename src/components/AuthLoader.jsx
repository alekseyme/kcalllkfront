import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const AuthLoader = () => {
	const antIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
			}}>
			<Spin size="large" indicator={antIcon} />
		</div>
	);
};

export default AuthLoader;
