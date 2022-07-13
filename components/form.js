import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/form.module.css";
export default function Form() {
	const router = useRouter();
	const [user, setUser] = useState();
	const [users, setUsers] = useState();
	const [handleError, setHandleError] = useState({});

	//Obtener informacion de los usuarios
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
	//Manejo de errores
	const errors = {
		email: "No se encuentra el usuario",
		email_empty: "Introduce un correo",
		password: "Introduce un contraseña",
	};
	const renderError = name => {
		console.log(handleError);

		if (name === handleError.name) {
			return <p className={styles.error}>{handleError.message}</p>;
		}
	};

	//Mandar datos del login y validacion
	const onSubmit = e => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.target));
		const findUser = users.find(user => data.email === user.email);
		if (!data.email) {
			setHandleError({ name: "email_empty", message: errors.email_empty });
		} else if (!data.password) {
			setHandleError({ name: "password", message: errors.password });
		} else if (!findUser) {
			setHandleError({ name: "email", message: errors.email });
		} else if (findUser) {
			setUser(data);
			router.push("/users");
		}
	};
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<input name="email" placeholder="email"></input>
			{renderError("email")}
			{renderError("email_empty")}
			<input name="password" placeholder="password"></input>
			{renderError("password")}
			<button className={styles.button} type="submit">
				Log in
			</button>
		</form>
	);
}
