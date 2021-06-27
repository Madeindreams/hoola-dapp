/* eslint-disable */
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';
import { userAmountToWei, stringToFloat } from "../utils/Balances";
import { ERC20 } from "../utils/ERC20Lib";
import {
  loadWeb3,
  loadAccount,
  loadWarning,
  makerAssetSelected,
  takerAssetSelected,
  previewedNFT,
  userLiquidityLoaded,
  userLiquidityFull,
  userLiquidityLoading,
  orderBookLoaded,
  orderBookFull,
  orderBookLoading,
  setDefault,
  loopSetDefault,
  loopInAssetSelected,
  loopOutAssetSelected,
  loopInAmountChanged,
  loopOutAmountChanged,
} from './actions'

import ensReverseABI from '../abis/ensReverse.json'
// import erc20 from '../abis/erc20.json' // for balances
import ethearn from '../abis/ethearn.json'
import { RiContrastDropLine } from "react-icons/ri";


let PROVIDER
let ACCOUNT = []
let ETHEARN_ADDRESS = "0xb007167714e2940013EC3bb551584130B7497E22"
let ETHEARN
let WEB3

const ETH = "0x0000000000000000000000000000000000000000";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

export const loadEthereum = async (dispatch) => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "85bebd9e43b24aeeab1c6f92afbdecad",
      }
    }
  }

  const web3Modal = new SafeAppWeb3Modal({
    network: "rinkeby",
    cacheProvider: false,
    providerOptions
  });

  web3Modal.clearCachedProvider();
  PROVIDER = await web3Modal.connect();
  const web3 = new Web3(PROVIDER);
  WEB3 = web3
  let network = await web3.eth.net.getId()
  let networkType = await web3.eth.net.getNetworkType()

  if (network !== 1) {
    // display testnet warning
    dispatch(loadWarning('You are currently connected to the ' + networkType + ' Testnet'))
  }

  // LOAD ETHEARN
  ETHEARN = new web3.eth.Contract(ethearn.abi, ETHEARN_ADDRESS, PROVIDER)
  // account and ENS Name on-chain
  const ENS = new web3.eth.Contract(ensReverseABI, "0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C")
  const accounts = await web3.eth.getAccounts()
  let ensName = await ENS.methods.getNames([accounts[0]]).call()

  // load some balances
  let balance = await web3.eth.getBalance(accounts[0]);
  ACCOUNT['balance'] = balance
  ACCOUNT['address'] = accounts[0]
  ACCOUNT['name'] = ensName[0]

  dispatch(loadWeb3(web3))
  dispatch(loadAccount(ACCOUNT))

}

// ASSET PRESELECTED IN LIQUIDITY
export const loadDefaultAssets = async (dispatch) => {
  dispatch(makerAssetSelected(ERC20[ETH]))
  dispatch(takerAssetSelected(ERC20[DAI]))
  dispatch(setDefault())
}


// ASSET PRESELECTED IN LOOP
export const loadLoopDefaultAssets = async (dispatch) => {
  dispatch(loopInAssetSelected(ERC20[ETH]))
  dispatch(loopOutAssetSelected(ERC20[DAI]))
  dispatch(loopSetDefault())
}

export const createLoopOrder = async (dispatch, creatorAsset, creatorAmount, askingAsset, askingAmount, swap) => {
  dispatch(userLiquidityLoading())
  console.log(creatorAmount)
  console.log(askingAmount)
  if (creatorAsset.address === askingAsset.address) {
    console.log('SAME ASSET WARNING')
    //dispatch warning
    return
  }
  else if (creatorAmount <= 0 | askingAmount <= 0 | askingAmount.length === 0 | creatorAmount.length === 0) {
    console.log('AMOUNT 0 WARNING')
    //dispatch warning
    return
  }

  let nonce = await WEB3.eth.getTransactionCount(ACCOUNT.address)
  console.log('NONCE', nonce)
  let options = { nonce: nonce, from: ACCOUNT.address }
  let order = await ETHEARN.methods.createLoopOrder(
    creatorAsset.address,
    userAmountToWei(creatorAmount, ERC20[creatorAsset.address].decimals),
    askingAsset.address,
    userAmountToWei(askingAmount, ERC20[askingAsset.address].decimals),
    swap,
  ).send(options);

  console.log(userAmountToWei(creatorAmount, ERC20[creatorAsset.address].decimals))

  dispatch(userLiquidityFull())

  return
}



export const createSwap = async (dispatch) => {
  //dispatch pending transaction effect
  console.log('SWAP')
  //create the transaction



  //dipatch transaction done effect
}


export const previewNft = async (props, meta) => {
  //dispatch pending transaction effect
  console.log('VIEW NFT :', meta.name)

  props.dispatch(previewedNFT(meta))


  //dipatch transaction done effect
}


export const mintNft = async (dispatch) => {
  //dispatch pending transaction effect
  console.log('BUY NFT')
  //create the transaction



  //dipatch transaction done effect
}



/**
 *   loopInAmountChange & loopOutAmountChange
 * 
 *  the amount chanign in the loop set the pait price bot ways
 *  It also fill the next trading socket with the output of the
 *  previous socket.
 *  */

export const loopInAmountChange = async (dispatch, amount, assetIn, assetOut ,orderBook) => {
  let socketSequence = [] // {id:orderId, amount:amountToFill}
  console.log('LoopInAmountChanged', amount)


 console.log(orderBook)
  
  //when the loppIn Amount change we ajust the loop out amount
  //when the loopIn asset chnages the amount will reset.
  
  // need to redo the math if loopOutAsset is changed is changed
  // this wil return the best price for his amount + skippage

  // dispatch the loopOutAmountChange
  dispatch(loopInAmountChanged(amount))
  dispatch(loopOutAmountChanged(amount * 1800))
  // when the loopOut amount changed we reverse it and tell the user what he needs IN for this exact amount out

  //dipatch transaction done effect
}

export const loopOutAmountChange = async (dispatch, amount) => {

  console.log('LoopOutAmountChanged', amount)
  //when the loppIn Amount change we ajust the loop out amount
  //when the loopIn asset chnages the amount will reset.

  // need to redo the math if loopOutAsset is changed is changed
  // this wil return the best price for his amount + skippage

  // dispatch the loopOutAmountChange
  dispatch(loopInAmountChanged(amount / 1800))
  dispatch(loopOutAmountChanged(amount))
  // when the loopOut amount changed we reverse it and tell the user what he needs IN for this exact amount out

  //dipatch transaction done effect
}

/**
 *  insertInLoop
 *  
 *  Insert the trade sequence (can be many trade for one single asset)
 * 
 * e.g. the user whants 1000 dai
 * The ui fetch the best price orders to fill until we have 1000 Dai
 * This can be one or multiple trade. rince and repeat to fill your loop
 * @param {*} dispatch 
 */

export const insertInLoop = async (dispatch) => {

  console.log('INSERT IN LOOP')
  // we insert the order id's to fill with the amount on each one.

  //dipatch transaction done effect
}


/**
 *   loopSequence
 * 
 * 
 *  This is where we construct the call the run the loop in EthEarn
 * 
 *  */
export const loopSequence = async (dispatch) => {
  //dispatch pending transaction effect
  console.log('LOOPING')
  //create the transaction

  //dipatch transaction done effect
}








export const loadLiquidity = async (dispatch) => {
  dispatch(userLiquidityLoading())
  dispatch(orderBookLoading())

  let userLiquidity = []
  let orderBook = []
  let pricebook = []

 
  let tradeSocketCount = await ETHEARN.methods.orderCount().call();
  //console.log('Trade Socket ',tradeSocketCount.toString());

  // filling template order book for UI

  let i = 0;
  for (i == 0; i < tradeSocketCount; i++) {

    let order = await ETHEARN.methods.orders(i).call();
    //console.log('Order :',order);

    // if the order belong to the user
    if (order.creator === ACCOUNT.address) {
      userLiquidity.push(order)
      dispatch(userLiquidityLoaded(userLiquidity))
    }


    // calculate the price and add it to the order
    let orderPrice
    if(order.creatorAmount == '0'){ // will not exist in production
      orderPrice = 0;
    } 
    else{
      orderPrice = stringToFloat(order.creatorAmount,ERC20[order.creatorAsset].decimals)  / stringToFloat(order.askingAmount,ERC20[order.askingAsset].decimals);
      console.log( 'OrderPrice',  orderPrice )
      /// create a pricebook creatorAsset => askingAsset => Price in askingAsset per creatorAsset
    }


   order[10] = orderPrice
   order['price'] = orderPrice
     //console.log(order)

    // push the order in the order book 
    orderBook.push(order)


    let orderedBook = orderBook.sort((function (index) {
      return function (a, b) {
        console.log('SORT ',a[index])
        return (a[index] === b[index] ? 0 : (a[index] > b[index] ? -1 : 1));
      };
    })('price')
    )



 
    console.log(orderedBook)
    dispatch(orderBookLoaded(orderedBook))
  }

  dispatch(orderBookFull())
  dispatch(userLiquidityFull())


 
  //dipatch transaction done effect
}

