import React, { Component } from 'react';
import './App.css';
import WelcomeScreen from './WelcomeScreen';
import LevelsScreen from './LevelsScreen';
import GamePage from './GamePage';
import './utils.js';


class App extends Component {
  constructor(props){
    super(props);
    this.config={
      figures: ['red', 'blue', 'yellow', 'green', 'black', 'gray'],
      levels: {
        1: [2,2,1],
        2: [2,2,2],
        3: [2,3,1],
        4: [2,3,2],
        5: [2,3,3],
        6: [3,3,2],
        7: [3,3,3],
        8: [3,3,4],
        9: [3,3,5],
        10: [4,3,2],
        11: [4,3,3],
        12: [4,3,4],
        13: [4,3,5],
        14: [4,3,6],
        15: [4,4,3],
        16: [4,4,4],
        17: [4,4,5],
        18: [4,4,6],
        19: [4,4,7],
      },
      showTime: 1000, //1 second
    }

    this.state={
      showIntroPage: true,
      showLevelsPage: true,
      level: 1,
      unlockedLevel: 1,
      matrix: [],
      answersPos:[],
      allCovered: true,
      userAnswers: [],
    }
  }
  componentWillMount(){
    if(this.state.showLevelsPage === false){
      this.generateMatrix();
    } 
  }
  handleStartClick(){
    this.setState({
      showIntroPage: false,
    });
  }
  handleSelectLevel(selectedLevel){
    this.setState({
      showLevelsPage: false,
      level: selectedLevel,
    });
    this.generateMatrix(selectedLevel);
  }
  generateMatrix(level){
    if(!level){
      level = this.state.level;
    }
    var levels = this.config.levels;
    var numRows = levels[level][0];
    var numCols = levels[level][1];
    var numFinds = levels[level][2];
    var guessIndex =  this.randomFigureIndex();
    let i,j //init i,j  
    
    //create and fill matrix with random figures
    var matrix = [];
    for(i = 0; i<numRows; i++){
      matrix[i]= [];
      for(j = 0; j<numCols; j++){
        //fill matrix with random figures indexes, excepting guessIndex
        matrix[i][j] = this.randomFigureIndex(guessIndex); 
      }
    }
    //populate matrix with guessIndex
    var answersPos=[]
    while(answersPos.length < numFinds){
      i = randomInt(0, numRows);
      j = randomInt(0, numCols);
      var key = i+","+j;
      if(answersPos.indexOf(key) === -1){
        matrix[i][j] = guessIndex;
        answersPos.push(key);
      }
    }
      
    this.setState({
      matrix: matrix,
      answersPos: answersPos,
      guessIndex: guessIndex,
      started: false,
      numFinds: numFinds, 
      found: 0
    });    

  }
  randomFigureIndex(exceptIndex){
    var index = randomInt(0, this.config.figures.length); 
    if(index === exceptIndex){
      return this.randomFigureIndex(exceptIndex);
    }
    return index;
  }
  handleShowCards(){
    //reveal all cards for a small period of time
    this.setState({
      allCovered: false,
      started: true,
      userAnswers: []
    });
    setTimeout(this.hideCards.bind(this), this.config.showTime);
  }
  hideCards(){
    this.setState({
      allCovered: true,
    })
  }
  handleCellClick(row, col){
    if(this.state.started && this.state.allCovered){
      var userAnswers = this.state.userAnswers;
      var found = this.state.found;     
      var key = row+","+col;
      
      //check double clicking on same cell
      if(userAnswers.indexOf(key) === -1){ 
        userAnswers.push(key); //save answer 
        if(this.state.answersPos.indexOf(key) >=0){ 
          //answer is good 
          found++;
        }
      } 
      this.setState({
        userAnswers: userAnswers,
        found: found,
      }) 
    }
  }
  handleRestart(){
    this.generateMatrix();
  }
  handleNextLevel(){
    var newLevel = this.state.level+1;
    if(newLevel > Object.keys(this.config.levels).length){
      this.setState({
        showLevelsPage: true
      })
    }
    else{
      this.setState({
        level: newLevel,
        unlockedLevel: Math.max(this.state.unlockedLevel, newLevel),
      });
      this.generateMatrix(newLevel);
    }
  }

  render() {
    if(this.state.showIntroPage){
      return (
        <WelcomeScreen onStart={this.handleStartClick.bind(this)}/>  
      )
    }
    if(this.state.showLevelsPage){
      return (
        <LevelsScreen 
          onSelectLevel={this.handleSelectLevel.bind(this)} 
          numLevels={Object.keys(this.config.levels).length}
          unlockedLevel={this.state.unlockedLevel}
        />  
      )
    }
    return(
      <GamePage 
        level={this.state.level}
        figures={this.config.figures} 
        matrix={this.state.matrix} 
        answersPos={this.state.answersPos}
        guessIndex={this.state.guessIndex}
        allCovered={this.state.allCovered}
        started={this.state.started}
        userAnswers={this.state.userAnswers}
        numFinds={this.state.numFinds}
        found={this.state.found}
        onShowCards={this.handleShowCards.bind(this)}
        onCellClick={this.handleCellClick.bind(this)}
        onNextLevel={this.handleNextLevel.bind(this)}
        onRestart={this.handleRestart.bind(this)}
      />
    )

  }
}

export default App;



/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
