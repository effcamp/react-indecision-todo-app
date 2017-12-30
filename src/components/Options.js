import React from 'react';
import Option from './Option';

const Options = (props) => (
	<div>
		<div className="widget-header">
			<h3 className="widget-header__title">Your Options</h3>
			<button className="button button--link" onClick={props.handleRemoveAll}>Remove All</button>
		</div>
		{props.options.length === 0 && <p className="widget__message">Please add an option!</p>}
		{props.options.map((x, index) => (
			<Option
				key={x}
				optionText={x}
				count={index + 1}
				handleRemoveOne={props.handleRemoveOne}
			/>))
		}
	</div>
);

export default Options;