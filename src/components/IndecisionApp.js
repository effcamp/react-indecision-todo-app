import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
	state = {
		options: [],
		selectedOption: undefined
	}
	handleClearOption = () => {
		this.setState(() => ({ selectedOption: undefined }));
	}
	handleRemoveAll = () => {
		this.setState(() => ({ options: [] }));
	}
	handleRemoveOne = (optionToRemove) => {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => option !== optionToRemove)
		}));
	}
	handleAdd = (option) => {
		if (!option) {
			return 'Enter valid value to add item'
		} else if (this.state.options.indexOf(option) > -1) {
			return 'Item already exists!'
		}

		this.setState((prevState) => ({ options: prevState.options.concat(option) }));
	}
	handlePick = () => {
		const num = Math.floor(Math.random() * this.state.options.length);
		const option = this.state.options[num];
		this.setState(() => ({ selectedOption: option }));
	}


	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);

			if (options) {
				this.setState(() => ({ options }));
			}
		} catch (err) {
			//do nothing
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}
	// componentWillUnmount() {
	// 	console.log('unmounted');
	// }
	render() {
		const title = 'Indecision';
		const subtitle = 'Put your life in the hands of a computer!'

		return (
			<div>
				<Header subtitle={subtitle} />
				<div className="container">
					<Action
						hasOptions={this.state.options.length > 0}
						handlePick={this.handlePick}
					/>
					<div className="widget">
						<Options
							options={this.state.options}
							handleRemoveAll={this.handleRemoveAll}
							handleRemoveOne={this.handleRemoveOne}
						/>
						<AddOption
							handleAdd={this.handleAdd}
							options={this.state.options}
						/>
					</div>
					<OptionModal
						selectedOption={this.state.selectedOption}
						handleClearOption={this.handleClearOption}
					/>
				</div>
			</div>
		);
	}
}