import React, { Component } from 'react';

export default class GamePage extends Component {
	render() {
		var rows = this.props.matrix.map( (row, index) => 
			<BlockRow 
				key={index} 
				row={row}
				rowIndex={index} 
				figures={this.props.figures} 
				allCovered={this.props.allCovered}
				started={this.props.started}
				userAnswers={this.props.userAnswers}
				onCellClick={this.props.onCellClick.bind(this)}
			/>
		) 
		var color = this.props.figures[this.props.guessIndex];
		var remaining = this.props.numFinds - this.props.found;

		return (
			<div>
				<StatusInfo started={this.props.started}
							allCovered={this.props.allCovered}
							color={color}
							remaining={remaining}
							revealed={this.props.userAnswers.length}
							numFinds={this.props.numFinds}
							onShowCards={this.props.onShowCards.bind(this)}
							onRestart={this.props.onRestart.bind(this)}
							onNextLevel={this.props.onNextLevel.bind(this)}

				/>
				{rows}
			</div>
		);
	}
}

class StatusInfo extends Component{
	render(){
		var status = '';
		if(this.props.started === false){
			status = (
				<div>
					<button className="btn btn-lg btn-primary" onClick={this.props.onShowCards}>Show Cards</button>
				</div>
				); 
		}
		else{
			if(this.props.remaining>0){
				status = <span>Remaining: {this.props.remaining} Revealed {this.props.revealed}</span>
			}
			else if(this.props.revealed > this.props.numFinds){
				status = (
					<div className="failed">
						<button className="btn btn-lg btn-danger" onClick={this.props.onRestart.bind(this)}>
							Restart
						</button> Done with errors! 
					</div>
				)
			}
			else{
				status = (
					<div className="success">
						<button className="btn btn-lg btn-success" onClick={this.props.onNextLevel.bind(this)}>
							Next Level
						</button> Well Done! 
					</div>
				)
			}
		}
		return(
			<div className="task clearfix">
				<div>
					{this.props.started && this.props.allCovered ?
						'Click on cells' :
						'Remember position of cells:' 
					}
				</div>
				<Box className={"box small " +this.props.color} />
				<div className="status">
					{status}
				</div>
			</div>
		)
	}
}

class BlockRow extends Component{

	render(){
		var cells =[];
		this.props.row.forEach( (cell, index) => {
			var className = this.props.figures[cell];
			var key = this.props.rowIndex + "," + index;
			
			if(!this.props.started || this.props.userAnswers.indexOf(key)===-1){

				className += this.props.allCovered ? ' covered' : '';
				className += this.props.started===true ? '' : ' frozen';
			}
			cell = (
				<Box 
					key={index} 
					className={className}
					col={index}
					row={this.props.rowIndex}
					onCellClick={this.props.onCellClick.bind(this)}
				/>
				
			)
			cells.push(cell);
		}) 
		
		return(
			<div className="clearfix">
				{cells}
			</div>
		);
	}
}

class Box extends Component{
	handleClick(){
		this.props.onCellClick(this.props.row, this.props.col);
	}
	render(){
		return (
			<div 
				className={"box "+this.props.className} 
				onClick={this.handleClick.bind(this)}
			/>
		)
	}
}
