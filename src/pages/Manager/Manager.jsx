import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Space, Button, message } from 'antd';
import Loader from '../../components/Loader';

const Manager = () => {
	const [managerList, setManagerList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		axios
			.get('/managers')
			.then(({ data }) => {
				setManagerList(data);
			})
			.finally(() => setIsLoading(false));
	}, []);

	const onDeleteManager = (e, managerId) => {
		const thisButton = e.currentTarget;
		thisButton.innerText = 'Удаляю';

		axios
			.delete(`/managers/${managerId}`)
			.then(({ data }) => {
				const newManagerList = managerList.filter((manager) => manager.id !== managerId);
				setManagerList(newManagerList);
				message.success(data.message);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				thisButton.innerText = 'Удалить';
			});
	};

	const columns = [
		{
			title: 'Менеджер',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'E-mail',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Действия',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/managers/${record.id}/edit`}>Ред</Link>
					<Button type="link" onClick={(e) => onDeleteManager(e, record.id)}>
						Удалить
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Список менеджеров</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/managers/create'}>Добавить менеджера</Link>
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
						dataSource={managerList}
						pagination={{ hideOnSinglePage: true }}
					/>
				)}
			</div>
		</>
	);
};

export default Manager;
