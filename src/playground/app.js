// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleRemoveAll = this.handleRemoveAll.bind(this); //you have to bind it ALWAYSSSSSSSS
		this.handleAdd = this.handleAdd.bind(this); //you have to bind it ALWAYSSSSSSSS
		this.handlePick = this.handlePick.bind(this);
		this.handleRemoveOne = this.handleRemoveOne.bind(this);
		this.state = {
			options: [],
		};
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
	componentWillUnmount() {
		console.log('unmounted');
	}

	handleRemoveAll() {
		this.setState(() => ({ options: [] }));
	}

	handleRemoveOne(optionToRemove) {
		this.setState((prevState) => (
			{
				options: prevState.options.filter((option) => option !== optionToRemove)
			}));
	}

	// this function returns text as a faux-error. If there are no errors, this.setState runs normally (that return call
	// is not actually a return)
	handleAdd(option) {
		if (!option) {
			return 'Enter valid value to add item'
		} else if (this.state.options.indexOf(option) > -1) {
			return 'Item already exists!'
		}

		this.setState((prevState) => ({ options: prevState.options.concat(option) }));
	}
	handlePick() {
		const num = Math.floor(Math.random() * this.state.options.length);
		alert(this.state.options[num]);
	}


	render() {
		const title = 'Indecision';
		const subtitle = 'Put your life in the hands of a computer!'

		return (
			<div>
				<Header subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
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
		);
	}
}

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			{props.subtitle && <h2>{props.subtitle}</h2>}
		</div>
	);
};

Header.defaultProps = {
	title: 'Indecision'
};

const Action = (props) => {
	return (
		<div>
			<button disabled={!props.hasOptions} onClick={props.handlePick}>
				What should I do?
      </button>
		</div>
	);
};

const Options = (props) => {
	return (
		<div>
			<button onClick={props.handleRemoveAll}>Remove All</button>
			{props.options.length === 0 && <p>Please add an option!</p>}
			{props.options.map((x) => (
				<Option
					key={x}
					optionText={x}
					handleRemoveOne={props.handleRemoveOne}
				/>))
			}
		</div>
	);
};

const Option = (props) => {
	return (
		<div>
			Option: {props.optionText}
			<button onClick={() => { props.handleRemoveOne(props.optionText) }}>
				Remove
			</button>
		</div>
	);
};

class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddOption = this.handleAddOption.bind(this);
		// this state is only used by this component and it's basically a return error if the user does something unexpected
		this.state = {
			error: undefined,
		}
	};
	handleAddOption(e) {
		e.preventDefault();
		const option = e.target.elements.addOption.value.trim();
		const error = this.props.handleAdd(option);
		e.target.elements.addOption.value = '';
		this.setState(() => ({ error }));


	}
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="addOption" />
					<button>Add Option</button>
				</form>
			</div>
		);
	}
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'))