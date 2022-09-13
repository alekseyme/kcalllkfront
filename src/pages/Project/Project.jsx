import React from 'react';
import axios from 'axios';
import { Table, Space } from 'antd';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';

const Project = () => {
	const [projectList, setProjectList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		axios
			.get('/projects')
			.then(({ data }) => {
				setProjectList(data);
			})
			.finally(() => setIsLoading(false));
	}, []);

	const columns = [
		{
			title: 'Проект',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Таблица',
			dataIndex: 'tablename',
			key: 'tablename',
		},
		{
			title: 'Шапка таблицы',
			dataIndex: 'table_header_client',
			key: 'table_header_client',
		},
		{
			title: '#',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/projects/${record.id}/edit`}>Ред</Link>
				</Space>
			),
		},
	];

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Список проектов</b>
			</div>
			<div className="box" style={{ marginTop: 20 }}>
				{isLoading ? (
					<Loader />
				) : (
					<Table
						style={{ width: '100%' }}
						rowKey={(record) => record.id}
						columns={columns}
						dataSource={projectList}
						pagination={{ hideOnSinglePage: true }}
					/>
				)}
			</div>
		</>
	);
};

export default Project;
