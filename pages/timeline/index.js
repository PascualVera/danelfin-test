import styles from "../../styles/timeline.module.css";
import Link from "next/link";
export default function Timeline() {
	return (
		<>
			<h1 className={styles.title}>Timeline</h1>
			<Link href="/">
				<a>Go Home</a>
			</Link>
		</>
	);
}
