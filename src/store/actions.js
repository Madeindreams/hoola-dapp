
// WEB3
export function loadWeb3(web3) {
    return{
        type: 'LOAD_WEB3',
        web3
    }
}

export function loadAccount(account) {
    return{
        type: 'LOAD_ACCOUNT',
        account
    }
}


// UI COMPONENTS
export function loadWarning(data) {
    return {
        type: 'LOAD_WARNING',
        data
    }
}
export function closeWarning() {
    return {
        type: 'CLOSE_WARNING',
    }
}
export function showSidebar() {
    return {
        type: 'SHOW_SIDEBAR',
    }
}
export function hideSidebar() {
    return {
        type: 'HIDE_SIDEBAR',
    }
}




//LIQUIDITY ORDER creation


export function makerAssetSelected(makerAsset) {
    return {
        type: 'MAKER_ASSET_SELECTED',
        makerAsset
    }
}
export function makerAssetAmountChanged(makerAmount) {
    return {
        type: 'MAKER_ASSET_AMOUNT_CHANGED',
        makerAmount
    }
}
export function takerAssetSelected(takerAsset) {
    return {
        type: 'TAKER_ASSET_SELECTED',
        takerAsset
    }
}
export function takerAssetAmountChanged(takerAmount) {
    return {
        type: 'TAKER_ASSET_AMOUNT_CHANGED',
        takerAmount
    }
}
export function assetDropdown(side) {
    return {
        type: 'ASSET_DROP',
        side
    }
}

export function assetSwap(swap) {
    return {
        type: 'ASSET_SWAP',
        swap
    }
}
export function setDefault() {
    return {
        type: 'SET_DEFAULT',
  
    }
}

// ORDER BOOK & LIQUIDITY DATA ACTION

export function userLiquidityLoaded(userLiquidity) {
    return {
        type: 'USER_LIQUIDITY_LOADED',
        userLiquidity
    }
}
export function userLiquidityLoading() {
    return {
        type: 'USER_LIDUIDITY_LOADING',
    }
}
export function userLiquidityFull() {
    return {
        type: 'USER_LIQUIDITY_FULL',
        
    }
}

export function orderBookLoading() {
    return {
        type: 'ORDER_BOOK_LOADING',
    }
}
export function orderBookLoaded(orderBook) {
    return {
        type: 'ORDER_BOOK_LOADED',
        orderBook
    }
}
export function orderBookFull() {
    return {
        type: 'ORDER_BOOK_FULL',
    }
}




//////// MULTIFILL/loop


export function loopInAssetSelected(loopIn) {
    return {
        type: 'LOOP_IN_SELECTED',
        loopIn
    }
}
export function loopOutAssetSelected(loopOut) {
    return {
        type: 'LOOP_OUT_SELECTED',
        loopOut
    }
}


export function loopInAmountChanged(loopInAmount) {
    return {
        type: 'LOOP_IN_AMOUNT_CHANGED',
        loopInAmount
    }
}
export function loopOutAmountChanged(loopOutAmount) {
    return {
        type: 'LOOP_OUT_AMOUNT_CHANGED',
        loopOutAmount
    }
}


export function loopAssetInserted(loopData) {
    return {
        type: 'LOOP_DATA_INSERTED',
        loopData
    }
}

export function loopAssetDropdown(side) {
    return {
        type: 'LOOP_ASSET_DROP',
        side
    }
}

export function loopSetDefault() {
    return {
        type: 'LOOP_SET_DEFAULT',
  
    }
}

export function tempSequence(sequenceTemp) {
    return {
        type: 'SEQUENCE_TEMP',
        sequenceTemp
    }
}


export function insertSequence(sequence) {
    return {
        type: 'SEQUENCE_INSERT',
        sequence
    }
}






// NFTs

export function previewedNFT(metadata) {
    return {
        type: 'NFT_PREVIEW',
        metadata
    }
}
