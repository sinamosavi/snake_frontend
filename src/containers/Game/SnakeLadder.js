import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

class SnakeLadder extends Component{
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
            <table style={{
                backgroundImage: `url(${Background})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                float: 'left',
            }}>
                {table}
            </table>
        );
    }
}

const mapStateToProps = state => ({
    user: state.funcs.user,
    game: state.funcs.game,
    player2: state.funcs.player2
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SnakeLadder)