import { useEffect, useState } from "react";
import Pagination from "../../components/pagination";
import styles from "../../styles/Users.module.css";
import Link from "next/link";
import UserList from "../../components/userList";

export default function Users() {
	const isLoggedIn = sessionStorage.getItem("danelfin-account");
	const [users, setUsers] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage, setUseresPerPage] = useState(1);
	const pages = [1, 2, 5, 10];
	useEffect(() => {
		fetch("https://reqres.in/api/users")
			.then(res => {
				return res.json();
			})
			.then(data => {
				setUsers(data.data);
			});
	});
	//Log out
	const logOut = () => {
		sessionStorage.removeItem("danelfin-account");
	};
	//Configuracion del sistema de paginacion
	const indexOfLastPost = currentPage * usersPerPage;
	const indexOfFirstPost = indexOfLastPost - usersPerPage;
	let currentUsers;
	if (users) {
		currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);
	}
	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
	};
	// if (!isLoggedIn) {
	// 	return (
	//
	// 	);
	// }

	return (
		<div className={styles.container}>
			<h1>Users</h1>
			{!isLoggedIn && (
				<div className={styles.require_login}>
					<h2>Para ver esta información tienes que estar logueado</h2>
					<Link href="/login">
						<a className={styles.login_link}>Log In</a>
					</Link>
				</div>
			)}
			{isLoggedIn && (
				<>
					{" "}
					<nav className={styles.nav}>
						<p>Usuarios por página</p>
						<div className={styles.select_users}>
							{pages.map(page => (
								<a
									onClick={() => {
										setCurrentPage(1);
										setUseresPerPage(page);
									}}
								>
									{page}
								</a>
							))}
						</div>
					</nav>
					<div className={styles.userList}></div>
					{currentUsers && <UserList users={currentUsers}></UserList>}
					{users && (
						<Pagination
							postPerPage={usersPerPage}
							totalPosts={users.length}
							paginate={paginate}
						></Pagination>
					)}
					<Link href="/">
						<a onClick={() => logOut()} className={styles.login_link}>
							Log out
						</a>
					</Link>
				</>
			)}

			<Link href="/">
				<a className={styles.back_home_btn}>Go Home</a>
			</Link>
		</div>
	);
}
