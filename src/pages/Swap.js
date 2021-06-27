/* eslint-disable */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "../utils/Colors";
import { RiArrowDropDownLine } from "react-icons/ri";
import ButtonsOutline from "../components/ButtonFlat";
import { AiOutlineSwap } from "react-icons/ai";
import { FaInfinity } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import EthBalance from "../components/EthBalance"
import {
  makerAmountSelector,
  makerAssetSelector,
  takerAmountSelector,
  takerAssetSelector,
  assetDropSelector,
  accountDataSelector
} from "../store/selectors";

import {
  assetDropdown,
  makerAssetSelected,
  takerAssetSelected,
  makerAssetAmountChanged,
  takerAssetAmountChanged
} from "../store/actions"



import {
  loadDefaultAssets,
  createSwap
} from "../store/interactions";
const ETH = "0x0000000000000000000000000000000000000000";
const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f";
const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
const USDT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const SUSD = "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51";
const TUSD = "0x0000000000085d4780B73119b644AE5ecd22b376";
const BUSD = "0x4fabb145d64652a948d72533023f6e7a623c7c53";
const WBTC = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
const COMP = "0xc00e94Cb662C3520282E6f5717214004A7f26888";   /// TODO
const AAVE = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";   /// TODO

const Liquidity = (props) => {
  const { dispatch, accountData } = props
  return (

    <LiquidityRow>
      {EthBalance(accountData.balance, 18)}
    </LiquidityRow>
  )
}
const LiquidityRow = styled.div`
text-align:center;
`;


const TransctionButton = (props) => {

  const { dispatch, t } = props
  const icon = () => {
    return <AiOutlineSwap />;
  };
  return (
    <ButtonsOutline
      action={(e) => {
        createSwap(dispatch)
      }}
      message='SWAP'
      icon={icon}
      waitForRipple={true}
    />

  )
}

const Creator = (props) => {

  const { dispatch, assetDrop, templateAassetArray, makerAsset, takerAsset, makerAmount, takerAmount, t } = props
  return (
    <OrderCreator>


      <OrderCreatorHeader>{t('sidebar.swap.label')}</OrderCreatorHeader>

      <OrderCreatorRow>
        <SelectedMakerAsset index={4}>
          {Assets(dispatch, makerAsset)}
          <DropDownButton onClick={() => assetDrop === 'maker' ? dispatch(assetDropdown(null)) : dispatch(assetDropdown('maker'))} ><RiArrowDropDownLine /></DropDownButton>
          <OrderCreatorDropDown index={4} height={assetDrop === 'maker' ? 300 : 0}>
            {templateAassetArray.map((value) => Assets(props, value))}
          </OrderCreatorDropDown>
          <AssetAmount placeholder="amount" value={makerAmount} onChange={(e) => dispatch(makerAssetAmountChanged(e.target.value))} />
        </SelectedMakerAsset>
      </OrderCreatorRow>

      <OrderCreatorRow>
      </OrderCreatorRow>

      <OrderCreatorRow>
        <SelectedMakerAsset index={2}>
          {Assets(dispatch, takerAsset)}
          <DropDownButton onClick={() => assetDrop === 'taker' ? dispatch(assetDropdown(null)) : dispatch(assetDropdown('taker'))} ><RiArrowDropDownLine /></DropDownButton>
          <OrderCreatorDropDown index={2} height={assetDrop === 'taker' ? 300 : 0}>
            {templateAassetArray.map((value) => Assets(props, value))}
          </OrderCreatorDropDown>
          <AssetAmount placeholder="amount" value={takerAmount} onChange={(e) => dispatch(takerAssetAmountChanged(e.target.value))} />
        </SelectedMakerAsset>
      </OrderCreatorRow>

     

        <OrderCreatorRow>
       
        </OrderCreatorRow>
        <OrderCreatorRow>
        <TransctionButton />
        </OrderCreatorRow>

      
    </OrderCreator>
  )
}

const OrderCreator = styled.div`
border:1px solid ${colors.background.secondary};
border-radius:10px;
align-items:center;
width:400px;
height:400px;
box-shadow: 10px 2px 10px 5px ${colors.background.shadow};
`;

const SelectedMakerAsset = styled.div`
position:relative;
background-color:${colors.text.primary};
color:${colors.text.contrast};
border-top-left-radius:5px;
border-bottom-left-radius:5px;
border:1px solid ${colors.background.secondary};
align-items:center;
width:200px;
height:50px;
margin:auto;
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



const Assets = (props, assets) => {
  const { dispatch, assetDrop, templateAassetArray, makerAsset } = props
  return (
    <AssetsWrapper onClick={() => { assetDrop === 'taker' ? dispatch(takerAssetSelected(assets)) : dispatch(makerAssetSelected(assets)) }} key={assets.symbol}>
      <AssetLogoWrapper>
        <AssetLogo src={`./assets/erc20logo/${assets.symbol}.svg`} />

      </AssetLogoWrapper>
      <AssetSymbol>{assets.symbol}</AssetSymbol>
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




const Swap = () => {
  const dispatch = useDispatch();
  const makerAsset = useSelector(makerAssetSelector);
  const takerAsset = useSelector(takerAssetSelector);
  const makerAmount = useSelector(makerAmountSelector);
  const takerAmount = useSelector(takerAmountSelector);
  const assetDrop = useSelector(assetDropSelector);
  const accountData = useSelector(accountDataSelector);
  const { t } = useTranslation('common');
  const templateAassetArray = [

    { address: ETH, symbol: "ETH" },
    { address: DAI, symbol: "DAI" },
    { address: USDC, symbol: "USDC" },
    { address: USDT, symbol: "USDT" },
    { address: TUSD, symbol: "TUSD" },
    { address: BUSD, symbol: "BUSD" },
    { address: WBTC, symbol: "WBTC" },
    { address: COMP, symbol: "COMP" },
    { address: AAVE, symbol: "AAVE" }

  ]


  const props = {
    dispatch,
    t,
    makerAsset,
    takerAsset,
    makerAmount,
    takerAmount,
    assetDrop,
    templateAassetArray,
    accountData
  };

  useEffect(() => {

    loadDefaultAssets(dispatch)
  }, []);


  return (
    <OrderWrapper>
      <LiquidityWrapper>
        {Liquidity(props)}
      </LiquidityWrapper>
      <OrderCreatorWrapper>
        {Creator(props)}
      </OrderCreatorWrapper>
    </OrderWrapper>
  );
};
export default Swap;


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



