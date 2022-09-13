import React from 'react';
import { DatePicker, Form, Input, Button, Select, BackTop, message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';

//Redux
import {
	setActiveProject,
	setTableColumns,
	resetTableData,
	setSearchParams,
	fetchActiveProject,
	setProjectLoading,
	setProjectsList,
	setTableLoading,
} from '../../redux/actions/projects';
import { useSelector, useDispatch } from 'react-redux';

import TableLoader from '../../components/TableLoader';
import TableControls from '../../components/TableControls';
import ProjectTable from '../../components/ProjectTable';

const Main = () => {
	//Redux
	const dispatch = useDispatch();
	const {
		activeProject,
		projectLoading,
		projectsList,
		tableData,
		searchParams,
		projectStatuses,
		userInfo,
	} = useSelector(({ projects }) => projects);

	const [searchForm] = Form.useForm();

	const isOneProject = userInfo.projects === 1;

	//Подгрузка списка проектов, доступных для пользователя, в селект
	React.useEffect(() => {
		if (!projectsList) {
			axios.post('/userprojects').then(({ data }) => {
				const projects = data.map((project) => {
					return {
						id: project.id,
						value: project.tablename,
						label: project.name,
						table_header_client: project.table_header_client,
						table_row_client: project.table_row_client,
					};
				});
				dispatch(setProjectsList(projects));
				if (isOneProject) {
					onSelectProject(null, projects[0]);
				}
			});
		} // eslint-disable-next-line
	}, []);

	//Меняем активный проект, при смене в селекте
	React.useEffect(() => {
		if (activeProject && !tableData) {
			dispatch(fetchActiveProject(null, activeProject.value));
		} // eslint-disable-next-line
	}, [activeProject]);

	const fetchSearchData = (fieldsValue) => {
		if (!activeProject) {
			message.warning('Сначала выберите проект', 2);
			return;
		}
		if (!fieldsValue.from && !fieldsValue.to && !fieldsValue.phone && !fieldsValue.status) {
			message.warning('Заполните хотя бы один параметр поиска', 2);
			return;
		}

		const phone =
			fieldsValue.phone?.length > 10 ? fieldsValue.phone.slice(1) : fieldsValue.phone;

		const values = {
			...fieldsValue,
			phone: phone,
			from: fieldsValue['from'] ? fieldsValue['from'].format('YYYY-MM-DD') : null,
			to: fieldsValue['to'] ? fieldsValue['to'].format('YYYY-MM-DD') : null,
		};

		dispatch(setTableLoading(true));
		dispatch(
			setSearchParams({
				...searchParams,
				from: values.from,
				to: values.to,
				phone: values.phone,
				status: values.status,
			}),
		);
		const parameters = {
			project: activeProject.value,
			from: values.from,
			to: values.to,
			phone: values.phone,
			status: values.status,
		};
		dispatch(fetchActiveProject(parameters));
	};

	const resetSearch = async () => {
		await dispatch(setSearchParams(null));
		searchForm.resetFields();
	};

	const onSelectProject = (_, optionObj) => {
		dispatch(setProjectLoading(true));
		resetSearch();

		const headerArr = optionObj.table_header_client.split(',');
		const rowArr = optionObj.table_row_client.split(',');

		const tableCols = headerArr.map((col, i) => ({
			title: col,
			dataIndex: rowArr[i],
			width: '2px',
		}));

		dispatch(resetTableData());
		dispatch(setActiveProject(optionObj));
		dispatch(setTableColumns(tableCols));
	};

	return (
		<>
			<div className="controls box">
				<Form
					form={searchForm}
					onFinish={fetchSearchData}
					autoComplete="off"
					initialValues={{
						from:
							searchParams && searchParams.from
								? moment(searchParams.from, 'YYYY-MM-DD')
								: null,
						to:
							searchParams && searchParams.to
								? moment(searchParams.to, 'YYYY-MM-DD')
								: null,
						phone: searchParams ? searchParams.phone : null,
						status: searchParams ? searchParams.status : null,
					}}
					layout="inline">
					<Form.Item name="from">
						<DatePicker placeholder="С" />
					</Form.Item>
					<Form.Item name="to">
						<DatePicker placeholder="По" />
					</Form.Item>
					<Form.Item name="phone">
						<Input
							placeholder="Телефон"
							prefix={
								<PhoneOutlined
									style={{ color: 'rgba(0, 0, 0, 0.25)' }}
									rotate={90}
								/>
							}
							allowClear
						/>
					</Form.Item>
					<Form.Item name="status">
						<Select
							placeholder="Статус"
							style={{ width: 202 }}
							options={projectStatuses || null}
							allowClear
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Поиск
						</Button>
					</Form.Item>
					{searchParams && (
						<Form.Item>
							<Button
								onClick={() => {
									dispatch(setTableLoading(true));
									resetSearch();
									dispatch(fetchActiveProject(null, activeProject.value));
								}}>
								Сбросить
							</Button>
						</Form.Item>
					)}
				</Form>
				{!isOneProject && (
					<Select
						value={activeProject ? activeProject.label : null}
						showSearch
						style={{ width: 202, marginLeft: 8 }}
						placeholder="Выбрать проект"
						optionFilterProp="label"
						onChange={onSelectProject}
						options={projectsList}
						filterOption={(input, option) =>
							option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}></Select>
				)}
			</div>
			<div className="box">
				{projectLoading ? (
					<TableLoader />
				) : tableData ? (
					<>
						<TableControls />
						<ProjectTable />
					</>
				) : !isOneProject ? (
					<h1 style={{ textAlign: 'center', marginBottom: 0 }}>Выберите проект</h1>
				) : (
					<TableLoader />
				)}
			</div>
			<BackTop />
		</>
	);
};

export default Main;
