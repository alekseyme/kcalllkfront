import React from 'react';
import { Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { fetchActiveProject, setTableLoading } from '../redux/actions/projects';
import { useSelector, useDispatch } from 'react-redux';

const ProjectTable = () => {
	const dispatch = useDispatch();
	const {
		activeProject,
		tableLoading,
		tableColumns,
		tablePaginationConfig,
		tableData,
		searchParams,
	} = useSelector(({ projects }) => projects);

	const onChangeTablePage = (page, pageSize) => {
		dispatch(setTableLoading(true));
		const parameters = {
			project: activeProject.value,
			page: page,
			per_page: pageSize,
			from: searchParams ? searchParams.from : null,
			to: searchParams ? searchParams.to : null,
			phone: searchParams ? searchParams.phone : null,
			status: searchParams ? searchParams.status : null,
		};
		dispatch(fetchActiveProject(parameters));
	};

	return (
		<Table
			size="middle"
			className="project-table"
			rowKey={(record) => record.id}
			columns={tableColumns}
			dataSource={tableData}
			loading={{
				spinning: tableLoading,
				indicator: <LoadingOutlined style={{ fontSize: 28 }} spin />,
			}}
			pagination={{
				position: ['bottomCenter'],
				current: tablePaginationConfig.current_page,
				total: tablePaginationConfig.total,
				pageSize: tablePaginationConfig.per_page,
				onChange: onChangeTablePage,
				hideOnSinglePage: true,
			}}
		/>
	);
};

export default ProjectTable;
