import { createSelector } from 'reselect'
import { get } from 'lodash'

// WEB3 & ACCOUNT
const web3 = state => get(state, 'web3.loaded',false)
export const web3Selector = createSelector(web3, w => w)
const web3Instance = state => get(state, 'web3.web3')
export const web3InstanceSelector = createSelector(web3Instance, w => w)
const account = state => get(state, 'account.loaded', false)
export const accountSelector = createSelector(account, a => a)
const accountData = state => get(state, 'account.account', [])

// UI COMPONENTS
export const accountDataSelector = createSelector(accountData, ad => ad)
const warning = state => get(state, 'warning.loaded')
export const warningSelector = createSelector(warning, a => a)
const warningData = state => get(state, 'warning.data',[])
export const warningDataSelector = createSelector(warningData, a => a) 
const sidebar = state => get(state, 'sidebar.loaded',false)
export const sidebarSelector = createSelector(sidebar, s => s)


// ORDERS
const makerAsset = state => get(state, 'order.makerAsset',[])
export const makerAssetSelector = createSelector(makerAsset, s => s)
const takerAsset = state => get(state, 'order.takerAsset',[])
export const takerAssetSelector = createSelector(takerAsset, s => s)
const makerAmount = state => get(state, 'order.makerAmount',[])
export const makerAmountSelector = createSelector(makerAmount, s => s)
const takerAmount = state => get(state, 'order.takerAmount',[])
export const takerAmountSelector = createSelector(takerAmount, s => s)
const assetDrop = state => get(state, 'order.side',[])
export const assetDropSelector = createSelector(assetDrop, s => s)
const assetSwap = state => get(state, 'order.swap',[])
export const assetSwapSelector = createSelector(assetSwap, s => s)
const defaultAsset = state => get(state, 'order.default',false)
export const defaultAssetSelector = createSelector(defaultAsset, s => s)
// NFTs
const nftPreview = state => get(state, 'nft.loaded', false)
export const nftPreviewSelector = createSelector(nftPreview, s => s)
const nftPreviewData = state => get(state, 'nft.metadata', [])
export const nftPreviewDataSelector = createSelector(nftPreviewData, s => s)

// LIQUIDITY & ORDERBOOK

const liquidity = state => get(state, 'liquidity.loaded',false)
export const liquiditySelector = createSelector(liquidity, l => l)
const liquidityData = state => get(state, 'liquidity.userLiquidity',[])
export const liquidityDataSelector = createSelector(liquidityData, l => l)
const liquidityLoading = state => get(state, 'liquidity.loading',false)
export const liquidityLoadingSelector = createSelector(liquidityLoading, l => l)


const orderBook = state => get(state, 'orderBook.loaded',false)
export const orderBookSelector = createSelector(orderBook, l => l)
const orderBookData = state => get(state, 'orderBook.orderBook',[])
export const orderBookDataSelector = createSelector(orderBookData, l => l)
const orderBookLoading = state => get(state, 'orderBook.loading',false)
export const orderBookLoadingSelector = createSelector(orderBookLoading, l => l)


// LOOP
const loopIn = state => get(state, 'loop.loopInSelect',false)
export const loopInSelector = createSelector(loopIn, l => l)
const loopInData = state => get(state, 'loop.loopIn',[])
export const loopInDataSelector = createSelector(loopInData, l => l)
const loopOut = state => get(state, 'loop.loopOutSelect',false)
export const loopOutSelector = createSelector(loopOut, l => l)
const loopOutData = state => get(state, 'loop.loopOut',[])
export const loopOutDataSelector = createSelector(loopOutData, l => l)
const loopDataInserted = state => get(state, 'loop.inserted',false)
export const loopDataInsertedSelector = createSelector(loopDataInserted, l => l)
const loopData = state => get(state, 'loop.loopData',[])
export const loopDataSelector = createSelector(loopData, l => l)
const loopAssetDrop = state => get(state, 'loop.side',[])
export const loopAssetDropSelector = createSelector(loopAssetDrop, l => l)
const loopInAmount = state => get(state, 'loop.loopInAmount',[])
export const loopInAmountSelector = createSelector(loopInAmount, s => s)
const loopOutAmount = state => get(state, 'loop.loopOutAmount',[])
export const loopOutAmountSelector = createSelector(loopOutAmount, s => s)
const loopDefaultAsset = state => get(state, 'loop.default',false)
export const loopDefaultAssetSelector = createSelector(loopDefaultAsset, s => s)

const loopTempSequence = state => get(state, 'loop.sequenceTemp',[])
export const loopTempSequenceSelector = createSelector(loopTempSequence, s => s)
const loopSequence = state => get(state, 'loop.sequence',[])
export const loopSequenceSelector = createSelector(loopSequence, s => s)
const sequence = state => get(state, 'loop.loaded',false)
export const sequenceSelector = createSelector(sequence, s => s)