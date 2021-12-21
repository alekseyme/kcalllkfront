import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateManager = () => {
	const [isLoading, setIsLoading] = React.useState(false);

	const onFinish = (values) => {
		setIsLoading(true);
		axios
			.post('/managers', values)
			.then(({ data }) => {
				message.success(data.message);
			})
			.catch(() => {
				message.error('Произошла ошибка');
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Новый менеджер</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/managers'}>Назад</Link>
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
						label="E-mail"
						name="email"
						rules={[{ required: true, message: 'Введите E-mail!' }]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="Телефон"
						name="phone"
						rules={[{ required: true, message: 'Введите Телефон!' }]}>
						<Input />
					</Form.Item>

					<Button
						className="btn-resource"
						type="primary"
						htmlType="submit"
						loading={isLoading}>
						Добавить менеджера
					</Button>
				</Form>
			</div>
		</>
	);
};

export default CreateManager;
