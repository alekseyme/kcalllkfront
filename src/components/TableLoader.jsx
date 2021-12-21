import React from 'react';
import { Skeleton } from 'antd';

const TableLoader = () => {
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Skeleton.Button style={{ width: 138 }} />
				<Skeleton.Button style={{ width: 220 }} />
			</div>
			<div style={{ marginTop: 22 }}>
				<Skeleton title={false} paragraph={{ rows: 6 }} />
			</div>
		</>
	);
};

export default TableLoader;
