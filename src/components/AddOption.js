import React from 'react';

export default class AddOption extends React.Component {
	state = {
		error: undefined
	};
	handleAddOption = (e) => {
		e.preventDefault();
		const option = e.target.elements.addOption.value.trim();
		const error = this.props.handleAdd(option);
		e.target.elements.addOption.value = '';
		this.setState(() => ({ error }));
	};
	
	render() {
		return (
			<div>
				{this.state.error && <p className="add-option-error">{this.state.error}</p>}
				<form className="add-option" onSubmit={this.handleAddOption}>
					<input className="add-option__input" type="text" name="addOption" />
					<button className="button">Add Option</button>
				</form>
			</div>
		);
	}
}