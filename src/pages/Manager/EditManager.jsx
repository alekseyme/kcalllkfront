import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import Loader from '../../components/Loader';

const EditManager = () => {
	const [isLoadingPage, setIsLoadingPage] = React.useState(true);
	const [isLoading, setIsLoading] = React.useState(false);
	const [initValues, setInitValues] = React.useState({});
	const { id } = useParams();

	React.useEffect(() => {
		axios
			.get(`/managers/${id}/edit`)
			.then(({ data }) => {
				setInitValues(data);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoadingPage(false);
			});
	}, [id]);

	const onFinish = (values) => {
		setIsLoading(true);
		const newManager = { ...values };
		axios
			.put(`/managers/${id}`, newManager)
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
				<b>Редактировать менеджера</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/managers'}>Назад</Link>
				</Button>
			</div>
			<div className="box" style={{ marginTop: 20 }}>
				{isLoadingPage ? (
					<Loader />
				) : (
					<>
						<Form
							name="basic"
							onFinish={onFinish}
							initialValues={initValues}
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
								Обновить менеджера
							</Button>
						</Form>
					</>
				)}
			</div>
		</>
	);
};

export default EditManager;
