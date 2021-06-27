/* eslint-disable */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "../utils/Colors";
import { RiArrowDropDownLine } from "react-icons/ri";
import ButtonsOutline from "../components/ButtonFlat";
import { FaInfinity } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import EthBalance from "../components/EthBalance"
import { ERC20 } from "../utils/ERC20Lib";
import {
  loopInAmountSelector,
  loopOutAmountSelector,
  accountDataSelector,
  loopInDataSelector,
  loopInSelector,
  loopOutDataSelector,
  loopOutSelector,
  loopAssetDropSelector,
  loopDefaultAssetSelector,
  orderBookDataSelector
} from "../store/selectors";
import {
  assetDropdown,
  loopInAssetSelected,
  loopOutAssetSelected,
  loopAssetInserted
} from "../store/actions"
import {
  insertInLoop,
  loopSequence,
  loadLoopDefaultAssets,
  loopInAmountChange,
  loopOutAmountChange,
  loadLiquidity
} from "../store/interactions"

const Liquidity = (props) => {
  const { dispatch, accountData } = props
  return (

    <LiquidityRow>
      {EthBalance(accountData.balance, 18)}
      <OrderCreatorRow>

      </OrderCreatorRow>
      <OrderCreatorRow>
        <LaunchLoopButton />
      </OrderCreatorRow>
    </LiquidityRow>
  )
}

const LiquidityRow = styled.div`
text-align:center;
`;



const LaunchLoopButton = (props) => {
  const { dispatch, t } = props
  const icon = () => {
    return <FaInfinity />;
  };
  return (
    <ButtonsOutline
      action={(e) => {
        loopSequence(dispatch)
      }}
      message='LOOP'
      icon={icon}
      waitForRipple={true}
    />

  )
}

const InsertButton = (props) => {
  const { dispatch, t } = props
  const icon = () => {
    return <FaInfinity />;
  };
  return (
    <ButtonsOutline
      action={(e) => {
        insertInLoop(dispatch)
      }}
      message='INSERT'
      icon={icon}
      waitForRipple={true}
    />

  )
}

const Creator = (props) => {
  
  const { dispatch, assetDrop, loopInData,loopOutData, loopOutAmount,loopInAmount, t, orderBook } = props
  console.log(orderBook)
  return (
    <LoopCreator>

      <OrderCreatorHeader>{t('sidebar.loop.label')}</OrderCreatorHeader>
      <OrderCreatorRow>
        <SelectedMakerAsset index={4}>
          {Assets(props, loopInData.address, ERC20[loopInData.address])}
          <DropDownButton onClick={() => assetDrop === 'loopIn' ? dispatch(assetDropdown(null)) : dispatch(assetDropdown('loopIn'))} ><RiArrowDropDownLine /></DropDownButton>

          <OrderCreatorDropDown index={4} height={assetDrop === 'loopIn' ? 300 : 0}>
          {Object.entries(ERC20).map(([key,value]) =>  Assets(props,key,value))}
          </OrderCreatorDropDown>
          <AssetAmount placeholder="amount" value={loopInAmount} onChange={(e) => loopInAmountChange(dispatch,e.target.value,loopInData.address,loopOutData.address,orderBook)} />
        </SelectedMakerAsset>
        <SelectedMakerAsset index={2}>
        {Assets(props, loopOutData.address,ERC20[loopOutData.address])}
          <DropDownButton onClick={() => assetDrop === 'loopOut' ? dispatch(assetDropdown(null)) : dispatch(assetDropdown('loopOut'))} ><RiArrowDropDownLine /></DropDownButton>

          <OrderCreatorDropDown index={2} height={assetDrop === 'loopOut' ? 300 : 0}>
          {Object.entries(ERC20).map(([key,value]) => Assets(props,key,value))}
          </OrderCreatorDropDown>
          <AssetAmount placeholder="amount" value={loopOutAmount} onChange={(e) => loopOutAmountChange(dispatch,e.target.value,orderBook)} />
        </SelectedMakerAsset>

      </OrderCreatorRow>

      <OrderCreatorRow></OrderCreatorRow>
      <OrderCreatorRow>
        <InsertButton />
      </OrderCreatorRow>
    </LoopCreator>
  )
}
const LoopCreator = styled.div`
border:1px solid ${colors.background.secondary};
border-radius:10px;
align-items:center;
width:600px;
height:400px;
box-shadow: 10px 2px 10px 5px ${colors.background.shadow};
`;

const SelectedMakerAsset = styled.div`
position:relative;
display:inline-block;
background-color:${colors.text.primary};
color:${colors.text.contrast};
border-top-left-radius:5px;
border-bottom-left-radius:5px;
border:1px solid ${colors.background.secondary};
width:200px;
height:50px;
margin-right:30px;
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
const OrderCreatorHeader = styled.h1`
padding-top:
position:relative;
text-align:center;
height:50px;
width:100%;
`;
const OrderCreatorRow = styled.div`
position:relative;
text-align:center;
height:50px;
width:100%;
`;
const AssetsWrapper = styled.div`
position:relative;
width:200px;
height:50px;
background-color:${colors.text.primary};
color:${colors.text.contrast};
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

const Assets = (props,address, data) => {
  //console.log(data)
  const { dispatch, assetDrop } = props
  return (
    <AssetsWrapper onClick={() => { assetDrop === 'loopOut' ? dispatch(loopOutAssetSelected(data)) : dispatch(loopInAssetSelected(data)) }} key={data.symbol}>
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
`;
const AssetAmount = styled.input`
position:absolute;
top:25px;
right:0px;
margin-right:5px;
width:100px;
`;

const Order = () => {
  const dispatch = useDispatch();
  const loopIn = useSelector(loopInSelector);
  const loopOut = useSelector(loopOutSelector);
  const loopInData = useSelector(loopInDataSelector);
  const loopOutData = useSelector(loopOutDataSelector);
  const assetDrop = useSelector(loopAssetDropSelector);
  const loopInAmount = useSelector(loopInAmountSelector);
  const loopOutAmount = useSelector(loopOutAmountSelector);
  const accountData = useSelector(accountDataSelector);
  const defaultAsset = useSelector(loopDefaultAssetSelector);
  const orderBook = useSelector(orderBookDataSelector);
  const { t } = useTranslation('common');

  const props = {
    dispatch,
    t,
    loopIn,
    loopOut,
    loopInData,
    loopOutData,
    loopInAmount,
    loopOutAmount,
    assetDrop,
    defaultAsset,
    accountData,
    orderBook
  };

  useEffect(async () => {
 
    await loadLoopDefaultAssets(dispatch)
    await loadLiquidity(dispatch)
  }, []);

  return (
    <OrderWrapper>
      <LiquidityWrapper>
        {Liquidity(props)}
      </LiquidityWrapper>
      <LoopCreatorWrapper>
      {defaultAsset ? Creator(props) : "Loading"}
      </LoopCreatorWrapper>
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
const LoopCreatorWrapper = styled.div`
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




