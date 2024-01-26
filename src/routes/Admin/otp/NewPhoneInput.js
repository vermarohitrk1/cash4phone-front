import React, { useState } from 'react';
import styles from './styles/style.module.css';
import axios from 'axios';
import { message } from 'antd';
import { login } from '../api/api';

function NewPhoneInput(props) {
	const { value, handleChange, hashHandleChange } = props;
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

	const Continue = (e) => {
		axios
			.post(login, {
				username: userName,
				password: password
			})
			.then(function(res) {
				console.log(res.data);

				if(res?.data?.auth == false){
					console.log(res)
					message.error(res.data.message)
				}else{
					window.location.reload();
				}
				
				// const hash = res.data.hash;
				// hashHandleChange(hash);
			});

		// e.preventDefault();
		// props.nextStep();
	};
	return (
		<div className={styles}>
			<div className={styles.background}>
				<div className={styles.container}>
					<div className={styles.heading}>Admin</div>
					
					{/* <div className={styles.input_text}>Phone number:</div> */}
					<div className={styles.input_container}>
						<input
							// type="hidden"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							placeholder="User Name"
							className={styles.input}
						/>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							className={styles.input}
						/>
					</div>
					<button onClick={Continue} className={styles.send}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default NewPhoneInput;
