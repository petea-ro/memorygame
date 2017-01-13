import React, { Component } from 'react';

export default class WelcomeScreen extends Component {
	render() {
		return (
			<div className="panel text-center">
				<h1>Memory Trainer</h1>
				<p className="intro-description">
					This Game will help you to improve your or your kid's memory
				</p>
				<div className="panel-body text-center">
					<button className="btn btn-success btn-lg" onClick={this.props.onStart.bind(this)}>
						Start Game
					</button>
				</div>
			</div>
		);
	}
}
