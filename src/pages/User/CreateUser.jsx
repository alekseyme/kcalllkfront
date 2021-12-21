import React from 'react';
import { Form, Input, Button, Checkbox, message, Select } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateUser = () => {
	const [managerList, setManagerList] = React.useState([]);
	const [projectManager, setProjectManager] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		axios
			.get('/managers')
			.then(({ data }) => {
				const newData = data.map((manager) => {
					return { label: manager.name, value: manager.id };
				});
				setManagerList(newData);
			})
			.catch(() => message.error('Ошибка подгрузки менеджеров'));
	}, []);

	const onFinish = (values) => {
		const newUser = { ...values, manager: projectManager };
		setIsLoading(true);
		axios
			.post('/users', newUser)
			.then(({ data }) => {
				message.success(data.message);
			})
			.catch(() => {
				message.error('Произошла ошибка');
			})
			.finally(() => setIsLoading(false));
	};

	const onChangeManagers = (checkedValues) => {
		setProjectManager(checkedValues);
	};

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Новый пользователь</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/users'}>Назад</Link>
				</Button>
			</div>
			<div className="box" style={{ marginTop: 20 }}>
				<Form
					name="basic"
					onFinish={onFinish}
					initialValues={{ isadmin: false }}
					autoComplete="off">
					<Form.Item
						label="Имя"
						name="name"
						rules={[{ required: true, message: 'Введите имя!' }]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="Логин"
						name="username"
						rules={[{ required: true, message: 'Введите логин!' }]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="Пароль"
						name="password"
						rules={[{ required: true, message: 'Введите пароль!' }]}>
						<Input.Password />
					</Form.Item>
					<Form.Item name="isadmin" valuePropName="checked">
						<Checkbox>Админ</Checkbox>
					</Form.Item>

					<Form.Item
						name="manager"
						label="Менеджер"
						rules={[{ required: true, message: 'Укажите менеджера!' }]}>
						<Select
							optionFilterProp="label"
							style={{ width: '100%' }}
							placeholder="Выбрать менеджера"
							onChange={onChangeManagers}
							options={managerList}></Select>
					</Form.Item>

					<Button
						className="btn-resource"
						type="primary"
						htmlType="submit"
						loading={isLoading}>
						Добавить пользователя
					</Button>
				</Form>
			</div>
		</>
	);
};

export default CreateUser;
