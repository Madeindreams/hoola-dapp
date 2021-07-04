import { combineReducers } from 'redux';


function web3(state = {}, action) {
    switch(action.type){
        case 'LOAD_WEB3':
        return { ...state, loaded: true, web3: action.web3}
        default:
            return state
    }

}


function account(state = {}, action) {
    switch(action.type){
        case 'LOAD_ACCOUNT':
        return { ...state, loaded: true, account: action.account}
        default:
            return state
    }

}



function warning(state = {}, action) {
    switch(action.type){
        case 'LOAD_WARNING':
            return { ...state, loaded: true, res: 'warning', data: action.data}
        case 'CLOSE_WARNING':
            return { ...state, loaded: false, res: null ,data: null}
        default:
            return state
    }
}

function sidebar(state = {}, action) {
    switch(action.type){
        case 'SHOW_SIDEBAR':
            return { ...state, loaded: true}
        case 'HIDE_SIDEBAR':
            return { ...state, loaded: false}
        default:
            return state
    }
}

function order(state = {}, action) {
    switch(action.type){
        case 'TAKER_ASSET_AMOUNT_CHANGED':
            return { ...state, takerAmount: action.takerAmount}
        case 'MAKER_ASSET_AMOUNT_CHANGED':
            return { ...state, makerAmount: action.makerAmount}
        case 'TAKER_ASSET_SELECTED':
            return { ...state, side:null,takerAmount:'', takerAsset: action.takerAsset}
        case 'MAKER_ASSET_SELECTED':
            return { ...state, side:null,makerAmount:'', makerAsset: action.makerAsset}
        case 'ASSET_DROP':
                return { ...state, side: action.side}
        case 'ASSET_SWAP':
                return { ...state, swap: action.swap}
            case 'SET_DEFAULT':
                return { ...state, default: true}
        default:
            return state
    }
}

function nft(state = {}, action) {
    switch(action.type){
        case 'NFT_PREVIEW':
            return { ...state, loaded: true, metadata: action.metadata}

        default:
            return state
    }
}


function orderBook(state = {}, action) {
    switch(action.type){
        case 'ORDER_BOOK_LOADED':
            return { ...state, loaded: true, orderBook: action.orderBook}
        case 'ORDER_BOOK_LOADING':
            return { ...state, loading: true}
        case 'ORDER_BOOK_FULL':
            return { ...state, loading: false}
            case 'ASSET_DROP':
                return { ...state, side: action.side}
        default:
            return state
    }
}

function liquidity(state = {}, action) {
    switch(action.type){
        case 'USER_LIQUIDITY_LOADED':
            return { ...state, loaded: true, userLiquidity: action.userLiquidity}
        case 'USER_LIQUIDITY_LOADING':
            return { ...state, loading: true}
        case 'USER_LIQUIDITY_FULL':
            return { ...state, loading: false}
        default:
            return state
    }
}

function loop(state = {}, action) {
    switch(action.type){
        case 'LOOP_IN_SELECTED':
            return { ...state, side:null,loopInAmount:'', loopInSelect: true, loopIn: action.loopIn}
        case 'LOOP_OUT_SELECTED':
            return { ...state, side:null,loopOutAmount:'', loopOutSelect: true, loopOut: action.loopOut}
        case 'LOOP_DATA_INSERTED':
            return { ...state, inserted: true, loopData: action.loopData}
        case 'LOOP_IN_AMOUNT_CHANGED':
            return { ...state, loopInAmount: action.loopInAmount}
        case 'LOOP_OUT_AMOUNT_CHANGED':
            return { ...state, loopOutAmount: action.loopOutAmount}
        case 'LOOP_SET_DEFAULT':
            return { ...state, default: true}
        case 'ASSET_DROP':
            return { ...state, side: action.side}
        case 'SEQUENCE_TEMP':
            return { ...state, sequenceTemp: action.sequenceTemp}
        case 'SEQUENCE_INSERT':
             return { ...state, 
                    loaded:true,
                    sequence: [...(state.sequence || []), action.sequence],
                    sequenceTemp: null}
        default:
            return state
    }
}




const rootReducer = combineReducers({
    web3,
    account,
    warning,
    sidebar,
    order,
    nft,
    liquidity,
    orderBook,
    loop

  })
  
  
  export default rootReducer