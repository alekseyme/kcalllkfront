import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Button, message, Select } from 'antd';
import axios from 'axios';
import Loader from '../../components/Loader';

const EditProject = () => {
	const [userList, setUsertList] = React.useState([]);
	const [projectUser, setProjectUser] = React.useState([]);
	const [isLoadingPage, setIsLoadingPage] = React.useState(true);
	const [isLoading, setIsLoading] = React.useState(false);
	const [initValues, setInitvalues] = React.useState({});
	const { id } = useParams();

	React.useEffect(() => {
		axios
			.get('/users')
			.then(({ data }) => {
				const newData = data.map((user) => {
					return { label: user.name, value: user.id, isadmin: user.isadmin };
				});
				setUsertList(newData);
			})
			.finally(() => console.log('users fetched at edit page'));
	}, []);

	// let history = useHistory();

	React.useEffect(() => {
		axios
			.get(`/projects/${id}/edit`)
			.then(({ data }) => {
				setInitvalues(data);
				if (data.users.length > 0) {
					const projectUser = data.users.map((user) => user.id);
					setProjectUser(projectUser);
				}
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoadingPage(false);
			});
	}, [id]);

	const onFinish = (values) => {
		setIsLoading(true);
		const newProject = { ...values, users: projectUser };
		axios
			.put(`/projects/${id}`, newProject)
			.then(({ data }) => {
				message.success(data.message);
				// history.push('/projects');
			})
			.catch(() => {
				message.error('Произошла ошибка');
			})
			.finally(() => setIsLoading(false));
	};

	const onChangeUsers = (value) => {
		setProjectUser(value);
	};

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Редактировать проект</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/projects'}>Назад</Link>
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
							<Form.Item label="Пользователи">
								<Select
									mode="multiple"
									optionFilterProp="label"
									style={{ width: '100%' }}
									placeholder="Выбрать пользователей"
									defaultValue={projectUser}
									onChange={onChangeUsers}
									options={userList.filter(
										(user) => user.isadmin !== 1,
									)}></Select>
							</Form.Item>

							<Button
								className="btn-resource"
								type="primary"
								htmlType="submit"
								loading={isLoading}>
								Обновить проект
							</Button>
						</Form>
					</>
				)}
			</div>
		</>
	);
};

export default EditProject;
