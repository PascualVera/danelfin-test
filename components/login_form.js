import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/form.module.css";
export default function LoginForm() {
	const router = useRouter();
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
			});
	}, []);
	//Login del Usuario
	const postUser = async user => {
		try {
			let OPTIONS = {
				method: "POST",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			};
			let url = "https://reqres.in/api/login";
			let res = await fetch(url, OPTIONS);
			let data = await res.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	//Manejo de errores
	const errors = {
		email: "No se encuentra el usuario",
		email_empty: "Introduce un correo",
		password: "Introduce un contraseña",
	};
	const renderError = name => {
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
			// postUser(findUser); -- Funcion comentada porque la API esta caida
			localStorage.setItem("danelfin-account", JSON.stringify(findUser));
			router.push("/users");
		}
	};
	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<div className={styles.input_container}>
				<input name="email" placeholder="email"></input>
				<p>
					{renderError("email")}
					{renderError("email_empty")}
				</p>
				<input name="password" placeholder="password" type="password"></input>
				<p>{renderError("password")}</p>
			</div>

			<button className={styles.button} type="submit">
				Log in
			</button>
		</form>
	);
}
