import styles from "../styles/pagination.module.css";
export default function Pagination({
	postPerPage,
	totalPosts,
	paginate,
	currentPage,
}) {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav className={styles.pagination}>
			<ul>
				{pageNumbers.map(number => (
					<li key={number}>
						<a
							className={currentPage == number ? styles.active : ""}
							onClick={() => {
								paginate(number);
							}}
						>
							{number}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
