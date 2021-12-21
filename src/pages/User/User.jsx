import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Space, Button, Tag, message } from 'antd';
import Loader from '../../components/Loader';

const User = () => {
	const [userList, setUserList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		axios
			.get('/users')
			.then(({ data }) => {
				setUserList(data);
			})
			.finally(() => setIsLoading(false));
	}, []);

	const onDeleteUser = (e, userId) => {
		const thisButton = e.currentTarget;
		thisButton.innerText = 'Удаляю';

		axios
			.delete(`/users/${userId}`)
			.then(({ data }) => {
				const newUserList = userList.filter((user) => user.id !== userId);
				setUserList(newUserList);
				message.success(data.message);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				thisButton.innerText = 'Удалить';
			});
	};

	const onResetPassword = (userId) => {
		const newPwd = prompt('Введите новый пароль');

		if (newPwd) {
			console.log(userId, newPwd);

			axios
				.patch(`/user/changepwd`, { userid: userId, password: newPwd })
				.then(({ data }) => {
					message.success(data.message);
				})
				.catch(() => message.error('Ошибка при смене пароля'));
		}
	};

	const columns = [
		{
			title: 'Пользователь',
			dataIndex: 'name',
			key: 'name',
			render: (_, record) => {
				return (
					<>
						{record.isadmin ? (
							<>
								{record.name} <Tag>admin</Tag>
							</>
						) : (
							record.name
						)}
					</>
				);
			},
		},
		{
			title: 'Логин',
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: 'Менеджер',
			dataIndex: 'manager',
			key: 'manager',
			render: (manager) => <>{manager?.name}</>,
		},
		{
			title: 'Действия',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/users/${record.id}/edit`}>Ред</Link>
					<Button type="link" onClick={(e) => onDeleteUser(e, record.id)}>
						Удалить
					</Button>
					<Button type="link" onClick={() => onResetPassword(record.id)}>
						Сброс пароля
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Список пользователей</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/users/create'}>Добавить пользователя</Link>
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
						dataSource={userList}
						pagination={{ hideOnSinglePage: true }}
					/>
				)}
			</div>
		</>
	);
};

export default User;
