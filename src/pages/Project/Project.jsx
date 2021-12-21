import React from 'react';
import axios from 'axios';
import { Table, Space, Button, Tag, message } from 'antd';
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

	const onDeleteProject = (e, projectId) => {
		const thisButton = e.currentTarget;
		thisButton.innerText = 'Удаляю';

		axios
			.delete(`/projects/${projectId}`)
			.then(({ data }) => {
				const newProjectList = projectList.filter((project) => project.id !== projectId);
				setProjectList(newProjectList);
				message.success(data.message);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				thisButton.innerText = 'Удалить';
			});
	};

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
			dataIndex: 'base_header',
			key: 'base_header',
		},
		{
			title: 'Доступен для',
			dataIndex: 'users',
			key: 'users',
			render: (users) => {
				if (users.length) {
					return (
						<>
							{users.map((user) => (
								<Tag color="blue" key={user.id}>
									{user.name}
								</Tag>
							))}
						</>
					);
				}
			},
		},
		{
			title: 'Действия',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/projects/${record.id}/edit`}>Ред</Link>
					<Button type="link" onClick={(e) => onDeleteProject(e, record.id)}>
						Удалить
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Список проектов</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/projects/create'}>Добавить проект</Link>
				</Button>
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
