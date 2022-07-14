import styles from "../styles/userList.module.css";
export default function UserList({ users }) {
	return (
		<>
			{" "}
			{users &&
				users.map(user => (
					<div key={user.id} className={styles.user}>
						<div className={styles.user_name}>
							<p>{user.first_name}</p>
							<p>{user.last_name}</p>
						</div>
						<p className={styles.rmail}>{user.email}</p>
					</div>
				))}
		</>
	);
}
