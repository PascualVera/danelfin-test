import styles from "../../styles/login.module.css";
import Link from "next/link";

import LoginForm from "../../components/login_form";
export default function Login() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Login</h1>
			<LoginForm></LoginForm>
			<Link href="/">
				<a>Go Home</a>
			</Link>
		</div>
	);
}
