import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {addScore, rollDice} from "../../reducers/allactions";
import movers from '../../reducers/movers'

class SnakeLadder extends Component{
    diceClicked(){
        this.props.addScore(this.props.user, 120);
        let rand = parseInt(Math.random() * 6 + 1);
        let newPos = this.props.game.get('player1_position') + rand;
        movers.map(function (mover) {
            if(mover.start == newPos + 1)
                newPos = mover.end - 1;
        });

        if(this.props.isMyTurn){
            if(newPos > 99)
                newPos = 99;
            this.props.rollDice(this.props.game, newPos, this.props.game.get('player2_position'));
            if(newPos == 99){
                alert("You won!");
            }

            if(this.props.game.get('player2').toString() === "bot"){
                let botNewPos = this.props.game.get('player2_position') + parseInt((Math.random() * 6 + 1));
                movers.map(function (mover) {
                    if(mover.start == botNewPos + 1)
                        botNewPos = mover.end - 1;
                });
                let onRoll = this.props.rollDice;
                let thisGame = this.props.game;
                let thisUser = this.props.user;
                let onAdd = this.props.addScore;
                setTimeout(function () {
                    if(botNewPos > 99)
                        botNewPos = 99;
                    onRoll(thisGame, newPos, botNewPos);
                    if(botNewPos == 99){
                        alert("You lose!")
                        onAdd(thisUser, 50);
                    }
                }, 1000);
            }
        }
        else
            alert("Not your turn!");
    }

    render(){
        let Background = 'map.jpg';
        let Blue = 'p2.png';
        let Red = 'p1.png';
        let table = [];
        for (let i = 0; i < 10; i++) {
            let row = [];
            for (let j = 0; j < 10; j++) {
                let x = 0;
                if(i % 2 == 0){
                    x = (9 - i) * 10 + 9 - j;
                }
                else{
                    x = (9 -i) * 10 + j;
                }

                if(x == this.props.game.get('player1_position') && x == this.props.game.get('player2_position')){
                    row.push(<td style={{textAlign:'center', height : '60px', width : '60px'}}>{<img style={{height : '60px', width : '60px'}} src={`pboth.png`}/>}</td>);
                }
                else if(x == this.props.game.get('player1_position')){
                    row.push(<td style={{textAlign:'center', height : '60px', width : '60px'}}>{<img style={{height : '60px', width : '60px'}} src={`p1.png`}/>}</td>);
                }
                else if(x == this.props.game.get('player2_position')){
                    row.push(<td style={{textAlign:'center', height : '60px', width : '60px'}}>{<img style={{height : '60px', width : '60px'}} src={`p2.png`}/>}</td>);
                }
                else{
                    row.push(<td style={{textAlign:'center', height : '60px', width : '60px'}}>{null}</td>)
                }
            }
            table.push(<tr >{row}</tr>);
        }

        return (
            <div>
                <table style={{
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    float: 'left',
                }}>
                    {table}
                </table>
                <img src='dice.png' onClick={this.diceClicked.bind(this)}/>
                <h2>{this.props.isMyTurn? "My Turn": "His Turn"}</h2>
                <h2>Opponent Name: {this.props.player2.toString()}</h2>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.funcs.user,
    game: state.funcs.game,
    player2: state.funcs.player2,
    isMyTurn: state.funcs.isMyTurn,
    movers: state.movers
})

const mapDispatchToProps = dispatch => bindActionCreators({
    rollDice: rollDice,
    addScore: addScore
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SnakeLadder)