import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
	const antIcon = <LoadingOutlined style={{ fontSize: 28 }} spin />;

	return (
		<div style={{ textAlign: 'center', marginTop: '2px' }}>
			<Spin indicator={antIcon} />
		</div>
	);
};

export default Loader;
