import React from 'react';
import { Layout, Menu } from 'antd';
import { Switch, Route, Link, Redirect, useLocation } from 'react-router-dom';
import {
	Main,
	Dashboard,
	Project,
	EditProject,
	EditUser,
	CreateUser,
	User,
	EditManager,
	CreateManager,
	Manager,
	StatisticPage,
} from './index';
import {
	DesktopOutlined,
	ProjectOutlined,
	UserOutlined,
	UnorderedListOutlined,
	ContactsOutlined,
	BarChartOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

import UserBlock from '../components/UserBlock';

import logo from '../assets/img/logo.svg';
import brandLogo from '../assets/img/brand_logo.svg';

const { Header, Content, Sider } = Layout;

const Home = ({ onSuccessLogout }) => {
	let location = useLocation();
	const [collapsed, setCollapsed] = React.useState(true);

	const { userInfo } = useSelector(({ projects }) => projects);

	const isAdmin = userInfo.isadmin === 1;

	const onCollapse = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<Layout>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="brand-logo">
					{/* <Link to="/"> */}
					<img src={collapsed ? brandLogo : logo} alt="logo" />
					{/* </Link> */}
				</div>
				<Menu
					className="menu"
					theme="dark"
					defaultSelectedKeys={[location.pathname]}
					mode="inline">
					<Menu.Item key="/" icon={<DesktopOutlined />}>
						<Link to="/">Обращения</Link>
					</Menu.Item>
					<Menu.Item key="/statistic" icon={<BarChartOutlined />}>
						<Link to="/statistic">Детализация</Link>
					</Menu.Item>
					{
						//Админ
						isAdmin && (
							<>
								<Menu.Divider style={{ backgroundColor: '#002140' }} />
								<Menu.Item key="/dash" icon={<ProjectOutlined />}>
									<Link to="/dash">Дашборд</Link>
								</Menu.Item>
								<Menu.Item key="/projects" icon={<UnorderedListOutlined />}>
									<Link to="/projects">Проекты</Link>
								</Menu.Item>
								<Menu.Item key="/users" icon={<UserOutlined />}>
									<Link to="/users">Пользователи</Link>
								</Menu.Item>
								<Menu.Item key="/managers" icon={<ContactsOutlined />}>
									<Link to="/managers">Менеджеры</Link>
								</Menu.Item>
							</>
						)
					}
				</Menu>
			</Sider>
			<Layout>
				<Header>
					<UserBlock onLogout={onSuccessLogout} />
				</Header>
				<Content
					className="site-layout"
					style={{
						padding: '0 32px',
					}}>
					<Switch>
						<Route exact path="/">
							<Main />
						</Route>
						<Route exact path="/statistic">
							<StatisticPage />
						</Route>

						{
							//Админ
							isAdmin && (
								<Switch>
									<Route exact path="/dash">
										<Dashboard />
									</Route>
									<Route exact path="/projects">
										<Project />
									</Route>
									<Route exact path="/projects/:id/edit">
										<EditProject />
									</Route>
									<Route exact path="/users">
										<User />
									</Route>
									<Route exact path="/users/:id/edit">
										<EditUser />
									</Route>
									<Route exact path="/users/create">
										<CreateUser />
									</Route>
									<Route exact path="/managers">
										<Manager />
									</Route>
									<Route exact path="/managers/:id/edit">
										<EditManager />
									</Route>
									<Route exact path="/managers/create">
										<CreateManager />
									</Route>
									<Redirect to="/" />
								</Switch>
							)
						}

						<Redirect to="/" />
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Home;
