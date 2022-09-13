import React from 'react';
import { Statistic, Row, Col, Card, Alert } from 'antd';
import { useSelector } from 'react-redux';

const Dashboard = () => {
	const { userInfo } = useSelector(({ projects }) => projects);

	const manager = userInfo.manager;

	const minutes = (() => {
		return Math.floor(Math.random() * 950) + 1;
	})();

	const onClose = (e) => {
		console.log(e, 'I was closed.');
	};

	return (
		<>
			{minutes < 300 && (
				<Alert
					style={{ marginTop: 22 }}
					message="Обращаем Ваше внимание!"
					description="У вас осталось не так много минут. Рекомендуем пополнить счёт"
					type="error"
					closable
					onClose={onClose}
				/>
			)}

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
							value={minutes}
							valueStyle={{ color: minutes > 300 ? '#3f8600' : '#cf1322' }}
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
						<Statistic title="Звонков вчера" value={81} />
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Dashboard;
