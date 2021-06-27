/* eslint-disable */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "../utils/Colors";
import { ERC20 } from "../utils/ERC20Lib";
import {weiToFloat} from "../utils/Balances"
import { RiArrowDropDownLine} from "react-icons/ri";
import { AiOutlineSwap } from "react-icons/ai";
import ButtonsOutline from "../components/ButtonFlat";
import { ImDroplet } from "react-icons/im";
import {BsCircleFill} from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import EthBalance from "../components/EthBalance"

import {
  makerAmountSelector,
  makerAssetSelector,
  takerAmountSelector,
  takerAssetSelector,
  assetDropSelector,
  assetSwapSelector,
  accountDataSelector,
  liquiditySelector,
  liquidityDataSelector,
  liquidityLoadingSelector,
  defaultAssetSelector
} from "../store/selectors";

import {
  assetDropdown,
  makerAssetSelected,
  takerAssetSelected,
  makerAssetAmountChanged,
  takerAssetAmountChanged,
  assetSwap
} from "../store/actions"

import {
  loadDefaultAssets,
  createLoopOrder,
  loadLiquidity
} from "../store/interactions";

/// TEMPORARY


//////////////////////////////////////////////////////////////////////////////
const LiquidSocket = (props, socket) => {
 // console.log('SOCKET ',socket)
  // Check the Percentage that was filled for filled bar %
  let filledPercent
  if (parseInt(socket.askingFilled) === 0) {
    filledPercent = 0
  } else {
    filledPercent = (parseFloat(socket.askingFilled) / parseFloat(socket.askingAmmount)).toFixed(2) * 100
  }

  return (
    <SocketWrapper key={socket.id}>
      <SocketFillMaker width={filledPercent} />
      <SocketOverlayWrapper>
        <SocketId>{socket.id}</SocketId>
        <SocketStatus>
          {socket.active ? <SocketActive><BsCircleFill /></SocketActive> : <SocketInactive><BsCircleFill /></SocketInactive>}
          {socket.swap ? <SocketSwappable><AiOutlineSwap /></SocketSwappable> : <SocketSwappableInactive><AiOutlineSwap /></SocketSwappableInactive>}
        </SocketStatus>
        <SocketMakerAmount>{weiToFloat(socket.creatorAmount, ERC20[socket.creatorAsset].decimals)}</SocketMakerAmount>
        <SocketMakerAsset>{ERC20[socket.creatorAsset].symbol}</SocketMakerAsset>
        <MakerAssetLogo src={`./assets/erc20logo/${ERC20[socket.creatorAsset].symbol}.svg`} alt={ERC20[socket.creatorAsset].symbol} />
        <SocketTakerAmount>{weiToFloat(socket.askingAmount, ERC20[socket.askingAsset].decimals)}</SocketTakerAmount>
        <SocketTakerAsset>{ERC20[socket.askingAsset].symbol}</SocketTakerAsset>
        <TakerAssetLogo src={`./assets/erc20logo/${ERC20[socket.askingAsset].symbol}.svg`} alt={ERC20[socket.askingAsset].symbol} />
      </SocketOverlayWrapper>

    </SocketWrapper>
  )
}


const SocketActive = styled.div`
position:absolute;
top: 0px;
left:0px;
width: 20px;
height:15px;
font-size:10px;
color:${colors.status.enable};

`;
const SocketSwappable = styled.div`
position:absolute;
left:0px;
top: 15px;
width: 20px;
height:15px;
font-size:15px;
color:${colors.status.enable};

`;
const SocketSwappableInactive = styled.div`
position:absolute;
left:0px;
top: 15px;
width: 20px;
height:15px;
font-size:10px;
color:${colors.status.disable};

`;
const SocketInactive = styled.div`
position:absolte;
top: 0px;
width: 20px;
height:15px;
font-size:10px;
color:${colors.status.disable};

`;

const SocketStatus = styled.div`
position:absolute;
top: 15px;
width: 20px;
left:140px;
height:30px;
text-align:center;
`;
const MakerAssetLogo = styled.img`
position:absolute;
left:0px;
top:30px;
height:15px;
width:15px;
`;
const TakerAssetLogo = styled.img`
position:absolute;
right:0px;
top:30px;
height:15px;
width:15px;
`;
const SocketId = styled.div`
position:relative;
font-size:10px;
text-align:left;
background:${colors.background.transparent};
height:15px;
`;

const SocketMakerAsset = styled.div`
position:absolute;
text-align:left;
left:18px;
top:30px;
width:30px;
font-size:12px;
height:15px;

`;
const SocketTakerAsset = styled.div`
position:absolute;
right:18px;
top:30px;
text-align:right;
width:30px;
font-size:12px;
height:15px;

`;
const SocketMakerAmount = styled.div`
position:relative;
text-align:left;
width:100px;
font-size:12px;
height:15px;

`;
const SocketTakerAmount = styled.div`
position:absolute;
top:15px;
right:0px;
text-align:right;
width:100px;
font-size:12px;
height:15px;

`;
const SocketWrapper = styled.div`
position:relative;
border-raduis: 5px;
border:1px solid ${colors.background.secondary};
height:60px;
`;
const SocketFillMaker = styled.div`
position:absolute;
bottom:0px;
left:0px;
background-color:rgb(7,182,28,0.8);
width:${(props) => props.width}%;
height:5px;
z-index:1;
`
const SocketOverlayWrapper = styled.div`
position:absolute;
top:0px;
right:0px;
left:0px;
height:60px;
z-index:2;
`;

//////////////////////////////////////////////////////////////////////////////////////
const userLiquidity = (props) => {
  const { liquidity, liquidityData, liquidityLoading } = props
  // Reordering order book
  let orderedBook = liquidityData.sort((function(index){
    return function(a, b){
        return (a[index] === b[index] ? 0 : (a[index] > b[index] ? -1 : 1));
    };
})(3)
  )
  return (
    <LoadingLiquidity>
      {liquidity ? orderedBook.map((socket) => LiquidSocket(props, socket)) : null}
      {liquidityLoading ? "Loading spinner" : "Done Loading..."}
    </LoadingLiquidity>
  )
}

const LoadingLiquidity = styled.div`
`;



///////////////////////////////////////////////////////////////////////////////////////////////
const Liquidity = (props) => {
  const { dispatch, accountData } = props
  //console.log(accountData)
  return (
    <LiquidityRow>
      {EthBalance(accountData.balance, 18)}
      {userLiquidity(props)}
    </LiquidityRow>
  )
}

const LiquidityRow = styled.div`
text-align:center;
`;


///////////////////////////////////////////////////////////////////////////////////////////////
const TransctionButton = (props) => {
   const { dispatch, t, makerAsset,makerAmount,takerAsset,takerAmount,swap } = props
  const icon = () => {
    return <ImDroplet />;
  };
  return (
    <ButtonsOutline
      action={(e) => {
        createLoopOrder(dispatch,makerAsset,makerAmount,takerAsset,takerAmount,swap)
      }}
      message='CREATE'
      icon={icon}
      waitForRipple={true}
    />
  )
}
///////////////////////////////////////////////////////////////////////////////////////////////////
const Creator = (props) => {
  const { dispatch, assetDrop, makerAsset, takerAsset, makerAmount, takerAmount, t } = props

  //console.log('CREATOR MAKER ASSET', makerAsset)
  return (
    <OrderCreator>
      <OrderCreatorHeader>{t('sidebar.liquidity.label')}</OrderCreatorHeader>
      <OrderCreatorRow>
        <SelectedMakerAsset index={assetDrop === 'maker' ? 4:2}>
          {Assets(props, makerAsset.address, ERC20[makerAsset.address])}
          <DropDownButton onClick={() => assetDrop === 'maker' ? dispatch(assetDropdown(null)) : dispatch(assetDropdown('maker'))} ><RiArrowDropDownLine /></DropDownButton>
          <OrderCreatorDropDown index={4} height={assetDrop === 'maker' ? 300 : 0}>
            {Object.entries(ERC20).map(([key,value]) =>  Assets(props,key,value))}
          </OrderCreatorDropDown>
          <AssetAmount placeholder="amount" value={makerAmount} onChange={(e) => dispatch(makerAssetAmountChanged(e.target.value))} />
        </SelectedMakerAsset>
      </OrderCreatorRow>
      <OrderCreatorRow>
        <SwapCheckbox onChange = {(e)=> dispatch(assetSwap(e.target.checked))} /> <AiOutlineSwap/>
      </OrderCreatorRow>
      <OrderCreatorRow>
        <SelectedTakerAsset index={assetDrop === 'taker' ? 4:2}>
          {Assets(props, takerAsset.address,ERC20[takerAsset.address])}
          <DropDownButton onClick={() => assetDrop === 'taker' ? dispatch(assetDropdown(null)) : dispatch(assetDropdown('taker'))} ><RiArrowDropDownLine /></DropDownButton>
          <OrderCreatorDropDown index={2} height={assetDrop === 'taker' ? 300 : 0}>
            {Object.entries(ERC20).map(([key,value]) => Assets(props,key,value))}
          </OrderCreatorDropDown>
          <AssetAmount placeholder="amount" value={takerAmount} onChange={(e) => dispatch(takerAssetAmountChanged(e.target.value))} />
        </SelectedTakerAsset>
      </OrderCreatorRow>
      <OrderCreatorRow>
        <OrderCreatorRow>
        </OrderCreatorRow>
        {TransctionButton(props)}
      </OrderCreatorRow>
    </OrderCreator>
  )
}

const SwapCheckbox = styled.input.attrs({ type: 'checkbox' })`
margin-top: 20px;

`;

const OrderCreator = styled.div`
border:1px solid ${colors.background.secondary};
border-radius:10px;
align-items:center;
width:400px;
height:400px;
box-shadow: 10px 2px 10px 5px ${colors.background.shadow};
`;
const OrderCreatorRow = styled.div`
position:relative;
text-align:center;
height:50px;
width:100%;
`;
const AssetAmount = styled.input`
position:absolute;
top:25px;
right:0px;
margin-right:5px;
width:100px;
`;
const SelectedMakerAsset = styled.div`
position:relative;
background-color:${colors.text.primary};
color:${colors.text.contrast};
border-top-left-radius:5px;
border-bottom-left-radius:5px;
border:1px solid ${colors.background.secondary};
margin:auto;
width:200px;
height:50px;  
z-index:${(props) => props.index};                  
`;
const SelectedTakerAsset = styled.div`
position:relative;
background-color:${colors.text.primary};
color:${colors.text.contrast};
border-top-left-radius:5px;
border-bottom-left-radius:5px;
border:1px solid ${colors.background.secondary};
margin:auto;
width:200px;
height:50px;  
z-index:${(props) => props.index};                   
`;
const DropDownButton = styled.div`
position:absolute;
display:flex;
top:-1px;
right:-22px;
width:20px;
height:50px;
color:${colors.text.secondary};
border:1px solid ${colors.background.secondary};
border-top-right-radius:5px;
border-bottom-right-radius:5px;
align-items:center;
justify-content: center;
font-size:50px;
`;
//////////////////////////////////////////////////////////////////////////////////////////////////
const Assets = (props,adress, data) => {
 // console.log('ASSET',address)
 // console.log('ASSETDATA',data)
 // console.log(ERC20[key.address])
  const { dispatch, assetDrop } = props
  return (
    
    // <AssetsWrapper onClick={() => { assetDrop === 'taker' ? dispatch(takerAssetSelected(address)) : dispatch(makerAssetSelected(address)) }} key={data.symbol}>
    <AssetsWrapper onClick={() => { assetDrop === 'taker' ? dispatch(takerAssetSelected(data)) : dispatch(makerAssetSelected(data)) }} key={data.symbol}>

      <AssetLogoWrapper>
        <AssetLogo src={`./assets/erc20logo/${data.symbol}.svg`} />

      </AssetLogoWrapper>
      <AssetSymbol>{data.symbol}</AssetSymbol>
    </AssetsWrapper>
  )

}
const AssetLogo = styled.img`
height:35px;
margin:auto;
border-top-right-radius:5px;
`;
const AssetSymbol = styled.div`
float:right;
height:20px;
width:130px;
margin:auto;
`;
const AssetLogoWrapper = styled.div`
float:left;
width:60px;
text-align:center;
border-top-right-radius:5px;
`;
const AssetsWrapper = styled.div`
position:relative;
width:200px;
height:50px;
background-color:${colors.text.primary};
color:${colors.text.contrast};
border-top-right-radius:5px;
`;
const OrderCreatorHeader = styled.h1`
padding-top:
position:relative;
text-align:center;
height:50px;
width:100%;
`;
const OrderCreatorDropDown = styled.div`
position:absolute;
top:50px;
overflow-y:auto;
overflow-x:hidden;
width:200px;
align-items:center;
background-color:${colors.text.primary};
height:${(props) => props.height}px;
transition: .5s ease;
border-right:1px solid ${colors.background.secondary};
border-bottom-left-radius:5px;
border-bottom-right-radius:5px;
z-index:${(props) => props.index};
`;

/////////////////////////////////////////////////////////////////////////////////////////////////
const Order = () => {
  const dispatch = useDispatch();
  const makerAsset = useSelector(makerAssetSelector);
  const takerAsset = useSelector(takerAssetSelector);
  const makerAmount = useSelector(makerAmountSelector);
  const takerAmount = useSelector(takerAmountSelector);
  const assetDrop = useSelector(assetDropSelector);
  const accountData = useSelector(accountDataSelector);
  const liquidity = useSelector(liquiditySelector);
  const liquidityData = useSelector(liquidityDataSelector);
  const liquidityLoading = useSelector(liquidityLoadingSelector)
  const defaultAsset = useSelector(defaultAssetSelector)
  const swap = useSelector(assetSwapSelector)
  const { t } = useTranslation('common');
 
  const props = {
    dispatch,
    t,
    accountData,
    makerAsset,
    takerAsset,
    makerAmount,
    takerAmount,
    assetDrop,
    defaultAsset,
    swap,
    liquidity,
    liquidityData,
    liquidityLoading,
   
  };

  useEffect(async () => {
console.log('LOAD DEFAULT ASSET')
   await loadDefaultAssets(dispatch)
   await loadLiquidity(dispatch)
  }, []);


  return (
    <OrderWrapper>
      <LiquidityWrapper>
        {Liquidity(props)}
      </LiquidityWrapper>
      <OrderCreatorWrapper>
        {defaultAsset ? Creator(props) : "Loading"}
      </OrderCreatorWrapper>
    </OrderWrapper>
  );
};
export default Order;

const LiquidityWrapper = styled.div`
 position:absolute;
 top:0px;
 right:10px;
 border:1px solid ${colors.background.secondary};
 min-width:300px;
 float:right;
 bottom:100px;
 border-radius:10px;
 padding:5px;
 `;
const OrderCreatorWrapper = styled.div`
 position:absolute;
 border:1px solid ${colors.background.secondary};
 display:flex;
 align-items:center;
 justify-content: center;
 border-radius:10px;
 top:0px;
 left:100px;
 right: 320px;
 bottom:100px;
 min-width:300px;
 `;
const OrderWrapper = styled.div`
  position:absolute;
  top:75px;
  right:0px;
  left:0px;
  bottom:0px;
  margin:auto;
  text-align: left;
  overflow-x:hidden;
  overflow-y: auto;
  padding: 10px;
`;

