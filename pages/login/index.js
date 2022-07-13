import styles from "../../styles/login.module.css";
import Link from "next/link";
import Form from "../../components/form";
export default function Login() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Login</h1>
			<Form></Form>
			<Link href="/">
				<a>Go Home</a>
			</Link>
		</div>
	);
}
