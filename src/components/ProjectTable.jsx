import React from 'react';
import { Table, Typography, Divider, Popover, Space } from 'antd';
import { DownloadOutlined, LoadingOutlined, PlayCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import fileDownload from 'js-file-download';

import { fetchActiveProject, setTableLoading } from '../redux/actions/projects';
import { useSelector, useDispatch } from 'react-redux';

import AudioPlayer from './AudioPlayer';

const ProjectTable = () => {
	const dispatch = useDispatch();

	const [audioSavingId, setAudioSavingId] = React.useState(null);
	const [audioSource, setAudioSource] = React.useState(null);
	const [rowAudio, setRowAudio] = React.useState({});

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

	const downloadAudio = (record) => {
		setAudioSavingId(record.id);
		const correctTime = record.time.replace(/[^\d]/g, '_');
		axios({
			url: `/da/${record.request_id}`,
			method: 'POST',
			responseType: 'blob',
		})
			.then(({ data }) => {
				fileDownload(data, correctTime + '_' + record.number + '.mp3');
			})
			.finally(() => {
				setAudioSavingId(null);
			});
	};

	const playAudio = (record) => {
		if (rowAudio[record.id]) {
			if (rowAudio[record.id] === audioSource.url) {
				return;
			}
			setAudioSource({
				id: record.id,
				url: rowAudio[record.id],
			});
			return;
		}
		setAudioSource(null);
		axios({
			url: `/da/${record.request_id}`,
			method: 'POST',
			responseType: 'blob',
		}).then(({ data }) => {
			const url = URL.createObjectURL(data);
			setAudioSource({
				id: record.id,
				url: url,
			});

			const newArr = {
				...rowAudio,
				[record.id]: url,
			};
			setRowAudio(newArr);
		});
	};

	const columns = [
		...tableColumns,
		{
			title: '#',
			dataIndex: 'actions',
			width: 35, //def 122, mid 35
			render: (_, record) => (
				<Space split={<Divider type="vertical" />} size={1}>
					{record.request_id ? (
						<>
							<Popover
								content={
									audioSource && audioSource.url === rowAudio[audioSource.id] ? (
										<AudioPlayer src={audioSource} />
									) : (
										'загрузка'
									)
								}
								trigger="click">
								<Typography.Link onClick={() => playAudio(record)}>
									<PlayCircleOutlined
										style={{
											fontSize: 18,
											color:
												record.id === audioSource?.id ? '#52c41a' : false,
										}}
									/>
								</Typography.Link>
							</Popover>
							<Typography.Link onClick={() => downloadAudio(record)}>
								{record.id === audioSavingId ? (
									<LoadingOutlined style={{ fontSize: 18 }} />
								) : (
									<DownloadOutlined style={{ fontSize: 18 }} />
								)}
							</Typography.Link>
						</>
					) : null}
				</Space>
			),
		},
	];

	return (
		<Table
			size="middle"
			className="project-table"
			rowKey={(record) => record.id}
			columns={columns}
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
