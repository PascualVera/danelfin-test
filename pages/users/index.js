import { useEffect, useState } from "react";
import styles from "../../styles/Users.module.css";
import Link from "next/link";

export default function Users() {
	const [users, setUsers] = useState(null);
	useEffect(() => {
		fetch("https://reqres.in/api/users")
			.then(res => {
				return res.json();
			})
			.then(data => {
				setUsers(data.data);
				console.log(users);
			});
	}, []);
	return (
		<>
			<h1>Users</h1>
			<div className={styles.userList}>
				{users &&
					users.map(user => (
						<div className={styles.user}>
							<div className={styles.user}>
								<p>{user.first_name}</p>
								<p>{user.last_name}</p>
							</div>
							<p>{user.email}</p>
						</div>
					))}
			</div>
			<Link href="/">
				<a>Go Home</a>
			</Link>
		</>
	);
}
