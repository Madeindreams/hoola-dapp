/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "../utils/Colors";
import { RiArrowDropDownLine } from "react-icons/ri";
import ButtonsOutline from "../components/ButtonFlat";
import { FaInfinity } from "react-icons/fa";
import { ImDroplet } from "react-icons/im";
import { CgCardClubs } from "react-icons/cg";
import { useTranslation } from 'react-i18next';
import EthBalance from "../components/EthBalance"
import {
  makerAmountSelector,
  makerAssetSelector,
  takerAmountSelector,
  takerAssetSelector,
  assetDropSelector,
  nftPreviewSelector,
  nftPreviewDataSelector,
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
  previewNft,
  mintNft
} from "../store/interactions";




const ShowPreviewdNFT = (props) => {
  const { dispatch, nftPrevData } = props
  return (
    <NftViewerWrapper>
      <NftViewer src={`https://ipfs.io/ipfs/${nftPrevData.image}`} />
      <NftViewerName>
        {nftPrevData.name}
      </NftViewerName>
      <NftViewerDescription>
        {nftPrevData.description}
      </NftViewerDescription>
      {buyNftButton(props)}
    </NftViewerWrapper>
  )
}
const NftViewerWrapper = styled.div`
position:relative;
text-align:center;
`;
const NftViewer = styled.img`
position:relative;
width:250px;
border-radius:10px;
`;
const NftViewerDescription = styled.p`
position:relative;
width:250px;
text-align:justify;
padding-left:20px;
`;
const NftViewerName = styled.h3`
position:relative;
width:250px;
padding-left:10px;
text-align:justify;
`;

const Liquidity = (props) => {
  const { dispatch, nftPrev, accountData } = props
  console.log('nftPrev', nftPrev)
  return (

    <LiquidityRow>
      {EthBalance(accountData.balance, 18)}
      {nftPrev ? ShowPreviewdNFT(props) : null}
    </LiquidityRow>
  )
}
const LiquidityRow = styled.div`
text-align:center;
`;


const viewNftButton = (props, meta) => {
  const { dispatch, t } = props
  const icon = () => {
    return <CgCardClubs />;
  };
  return (
    <ButtonsOutline
      action={(e) => {
        previewNft(props, meta)
      }}
      message='PREVIEW'
      icon={icon}
      waitForRipple={true}
    />
  )
}
const buyNftButton = (props, meta) => {
  const { dispatch, t } = props
  const icon = () => {
    return <CgCardClubs />;
  };
  return (
    <ButtonsOutline
      action={(e) => {
        mintNft(props, meta)
      }}
      message='BUY'
      icon={icon}
      waitForRipple={true}
    />
  )
}


const NftCard = (props, meta) => {

  const [isShown, setIsShown] = useState(0);
  //const {dispatch,sampleNfts,nftPrevData,nftPrev} = props
  return (
    <LoopNftFrame
      key={meta.name}
      onMouseEnter={() => setIsShown(100)}
      onMouseLeave={() => setIsShown(0)}
    >
      <NftName></NftName>
      <NftImg src={`https://ipfs.io/ipfs/${meta.image}`} alt="IPFS" />
      <NftTab size={isShown}> {viewNftButton(props, meta)} </NftTab>
    </LoopNftFrame>
  )
}

const LoopNftFrame = styled.div`
position:relative;
display:inline-block;
border-radius:10px;
height:300px;
overflow:hidden;
margin:10px;
box-shadow: 5px 2px 5px 5px ${colors.background.shadow};
&:hover{
  box-shadow: 5px 2px 10px 5px ${colors.background.secondary};
}
`;
const NftTab = styled.div`
position:absolute;
text-align:center;
padding-top:10px;
bottom:0px;
width:100%;
height:${(props) => props.size}px;
background:${colors.background.transparent};
transition: .5s ease;
`;
const NftImg = styled.img`
width:200px;
`;
const NftName = styled.div`
width:200px;
`;


const Nft = () => {
  const dispatch = useDispatch();
  const makerAsset = useSelector(makerAssetSelector);
  const takerAsset = useSelector(takerAssetSelector);
  const makerAmount = useSelector(makerAmountSelector);
  const takerAmount = useSelector(takerAmountSelector);
  const assetDrop = useSelector(assetDropSelector);
  const nftPrev = useSelector(nftPreviewSelector);
  const nftPrevData = useSelector(nftPreviewDataSelector);
  const accountData = useSelector(accountDataSelector)
  const { t } = useTranslation('common');


  const imgCid = "QmX6JHSPEF36xm1ormx5azYi6jh5XVScmxDB8CvryYSvzJ"
  const imgCid2 = "QmQ2cTgE5kZreJEC2oYEy2WBfjKjHh79gw8i1oQJ6F2eEb"
  const sampleNfts = [

    { name: "cHack", image: imgCid, description: "The owner of this cHack NFT will earn, interest from the Loop DEFI protocol in Compound, bonified with fees generated from Compound Loop Loans, for as long as they hold this NFT." },
    { name: "MonyHack2021", image: imgCid2, description: "An Exclusive Comemorative Loop DEFI NFT." }
  ]

  const props = {
    dispatch,
    t,
    makerAsset,
    takerAsset,
    makerAmount,
    takerAmount,
    assetDrop,
    sampleNfts,
    nftPrev,
    nftPrevData,
    accountData

  };

  useEffect(() => {

    loadDefaultAssets(dispatch)
  }, []);


  return (
    <OrderWrapper>
      <SideWrapper>
        {Liquidity(props)}
      </SideWrapper>
      <ShowCaseWrapper>
        <ShowCaseHeader>{t('sidebar.nft.label')}</ShowCaseHeader>
        {sampleNfts.map((meta) => NftCard(props, meta))}
      </ShowCaseWrapper>
    </OrderWrapper>
  );
};
export default Nft;

const SideWrapper = styled.div`
 position:absolute;
 top:0px;
 right:10px;
 min-width:300px;
 float:right;
 bottom:100px;
 border-radius:10px;
 padding:5px;
 z-index:3;
 `;
const ShowCaseWrapper = styled.div`
 position:absolute;
 border:1px solid ${colors.background.secondary};
 align-items:center;
 justify-content: center;
 border-radius:10px;
 top:0px;
 left:100px;
 right: 320px;
 bottom:100px;
 min-width:300px;
 box-shadow: 5px 2px 10px 2px ${colors.background.secondary};
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
const ShowCaseHeader = styled.h1`
padding-top:
position:relative;
text-align:center;
height:50px;
width:100%;
`;



