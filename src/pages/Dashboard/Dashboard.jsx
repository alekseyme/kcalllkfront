import React from 'react';
import { Statistic, Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';

const Dashboard = () => {
	const { userInfo } = useSelector(({ projects }) => projects);

	const manager = userInfo.manager;

	return (
		<>
			<Row gutter={22} style={{ marginTop: 22 }}>
				<Col span={6}>
					<Card>
						<Statistic
							title="Ваш менеджер"
							value={manager?.name || 'Менеджер не назначен'}
						/>
						{manager && (
							<>
								{manager.email}, доб. {manager.phone}
							</>
						)}
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic
							title="Остаток минут по тарифу"
							value={432}
							valueStyle={{ color: '#3f8600' }}
							suffix="/ 1000"
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic title="Звонков сегодня" value={34} />
					</Card>
				</Col>
				<Col span={6}>
					<Card>
						<Statistic title="Звонков сегодня" value={34} />
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Dashboard;
