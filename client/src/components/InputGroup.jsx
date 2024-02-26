/* eslint-disable react/prop-types */
import styles from './styles/InputGroup.module.css'

const InputGroup = ({ label, selector, required, type = 'text', onChange }) => {
	return (
		<div
			className={styles.formInputGroup}
			data-type={type === 'checkbox' && 'checkbox'}
		>
			<label htmlFor={selector}>{label}</label>
			<input
				type={type}
				name={selector}
				id={selector}
				required={required}
				onChange={onChange}
			/>
		</div>
	)
}

export default InputGroup
