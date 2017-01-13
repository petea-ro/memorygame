import React, { Component } from 'react';

export default class LevelsScreen extends Component {
	render() {
		var buttons =[];
		for(var i=1; i<= this.props.numLevels; i++){
			var button = <LevelButton 
							key={i}
							onClick={this.props.onSelectLevel.bind(this)} 
							level={i} 
							disabled={i>this.props.unlockedLevel ? true : false} 
						/>
			buttons.push(button);

		}
		return (
			<div className="text-center well">
				<h1>Click on level to start</h1>
				<div className="row">
					{buttons}
				</div>
			</div>
		);
	}
}


class LevelButton extends Component{
	handleClickLevel(){
		this.props.onClick(this.props.level);
	}
	render(){
		return(
			<div className="col-xs-6 col-sm-4 col-md-3">
				<div className="thumbnail">
					<button 
						onClick={this.handleClickLevel.bind(this)} 
						disabled={this.props.disabled}
						className="btn btn-primary btn-lg btn-block"
					>
						Level {this.props.level}
					</button>
				</div>
			</div>
		)

	}
}
