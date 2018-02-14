import Parse from 'parse'
import {push} from "react-router-redux/es/actions";
export const MOVE_REQUESTED = 'funcs/MOVE_REQUESTED'
export const SIGN_IN = 'funcs/SIGN_IN'
export const SIGN_OUT = 'funcs/SIGN_OUT'
export const SIGN_UP = 'funcs/SIGN_UP'
export const CREATE_NEW_GAME_REQUEST = 'funcs/CREATE_NEW_GAME_REQUEST'
export const JOIN_GAME = 'funcs/JOIN_GAME'
export const WITH_PLAYER = 'funcs/WITH_PLAYER'
export const WITH_BOT = 'funcs/WITH_BOT'

const initialState = {
    turn: 1,
    place: [0,0],
    myTurn: 1,
    user: null,
    player2: null,
    game: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_GAME_REQUEST:
            return{
                ...state,
                game: action.game
            }
        case JOIN_GAME:
            return{
                ...state,
                game: action.game
            }
        case WITH_PLAYER:
            return{
                ...state,
                player2: action.player2
            }
        case WITH_BOT:
            return{
                ...state,
                player2: 'bot'
            }
        case SIGN_UP:
            return{
                ...state,
                user: action.user
            }
        case SIGN_IN:
            return{
                ...state,
                user: action.user
            }
        case SIGN_OUT:
            return{
                ...state,
                user: null
            }
        case MOVE_REQUESTED:
            let newPlace = state.place;
            newPlace[state.turn - 1] += parseInt((Math.random() * 6) + 1);
            return{
                ...state,
                place: newPlace,
                turn: (state.turn) % 2 + 1,
            }

        default:
            return state
    }
}


export const randomGenerator = () => {
    return dispatch => {
        dispatch({
            type: MOVE_REQUESTED
        });
    }
}

export const signIn = (user, pass) => {
    return dispatch => {
        Parse.User.logIn(user, pass, {
            success: function(user) {
                dispatch({
                    type: SIGN_IN,
                    user: user,
                });
            },
            error: function(user, error) {
                alert("Error: " + error.message);
            }
        });
    }
}

export const signOut = () => {
    return dispatch => {
        dispatch({
            type: SIGN_OUT
        });
    }
}


export const signUp = (username, password, first_name, last_name, gender, birthday, city) => {
    return dispatch => {
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("first_name", first_name);
        user.set("last_name", last_name);
        user.set("gender", gender);
        user.set("birthday", birthday);
        user.set("city", city);
        user.signUp(null, {
            success: function(user) {
                dispatch({
                    type: SIGN_UP,
                    user: user,
                });
            },
            error: function(user, error) {
                alert("Error: " + error.message);
            }
        });
    }
}

export const createNewGame = () => {
    return dispatch => {
        let Game = Parse.Object.extend("Game");
        let newGame = new Game();
        newGame.set("player1", Parse.User.current().get('username'));
        newGame.set("player1_position", 0);
        newGame.set("player2_position", 0);
        newGame.save(null, {
            success: function(new_game) {
                dispatch({
                    type: CREATE_NEW_GAME_REQUEST,
                    game: new_game
                });
                let query = new Parse.Query(new_game);
                let subscription = query.subscribe();
                subscription.on('update', (game) => {
                    dispatch({
                        type: WITH_PLAYER,
                        player2: game.get('player2')
                    })
                });
                return setTimeout(() => {
                    new_game.set('player2', 'bot');
                    new_game.save(null, {
                        success: function(ng) {
                            dispatch({
                                type: WITH_BOT
                            })
                        },
                        error: function(ng, error) {
                            alert('Failed to create new Game, with error code: ' + error.message);
                        }
                    });
                }, 10000)
            },
            error: function(new_game, error) {
                alert('Failed to create new Game, with error code: ' + error.message);
            }
        });
    }
}

export const joinToGame = (gameId) => {

    return dispatch => {
        let Game = Parse.Object.extend("Game");
        let query = new Parse.Query(Game);
        query.equalTo("id", gameId);
        query.find({
            success:function(list) {
                alert('hi')
                push('/game')
                if(list.length){
                    dispatch({
                        type: JOIN_GAME,
                        game: list[0],
                    });
                }
            },
            error: function(list) {

            }
        });
    }
}