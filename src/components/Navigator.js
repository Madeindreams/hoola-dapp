/* eslint-disable */
import React, { Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {colors} from '../utils/Colors';
import ButtonsOutline from "./ButtonFlat";
import { FaInfinity } from "react-icons/fa";
import {HiOutlineClipboardCopy} from "react-icons/hi";
import { 
    loadEthereum
 } from '../store/interactions';
import {
    web3Selector,
    accountSelector,
    accountDataSelector
} from '../store/selectors'




const ConnectButton = (props) => {
    const dispatch = useDispatch()
    const {t} = useTranslation('common');
    const icon = () => {
      return <FaInfinity />;
    };
   
    return(
        <ButtonsOutline
        action={(e) => {
           loadEthereum(dispatch);
        }}
        message={t('navigator.connect')}
        icon={icon}
        waitForRipple={true}
      />

    )
}

const Account = (props) => {
  const { dispatch, accountData, t } = props
  console.log(accountData)
  const formatedAddress = accountData.address.substring(0, 5) + " . . . " + accountData.address.substring(accountData.address.length - 5, accountData.address.length)
  return (
    <ConnectedAccount>
      <EtherscanLink data-tip data-for="etherscan" target="_blank" href={`https://etherscan.io/address/${accountData.address}`} >
        {accountData.name.length > 0 ? accountData.name : formatedAddress}
      </EtherscanLink>
      <CopyPaster data-tip data-for="copy"> <HiOutlineClipboardCopy onClick={() => { navigator.clipboard.writeText(accountData.address) }} /></CopyPaster>
      <ReactTooltip id="copy" place="bottom" effect="solid">
        {t('navigator.account.copy')}
      </ReactTooltip>
      <ReactTooltip id="etherscan" place="bottom" effect="solid">
        {t('navigator.account.link')}
      </ReactTooltip>
    </ConnectedAccount>
  )

}


const Navigator = () =>{

  const {t} = useTranslation('common');
  const dispatch = useDispatch();
  const web3 = useSelector(web3Selector)
  const account = useSelector(accountSelector)
  const accountData = useSelector(accountDataSelector)
  const props = {dispatch, web3, account, accountData,t}
  console.log(account)
  console.log(web3)
  return (
    <NavigatorWrapper>
      <Navbrand>
        <StyledLogo src="./assets/EthEarn.png" alt={t('navigator.brand')} /> 
      </Navbrand>
      <AccountWrapper>
        {web3 && account ? Account(props) : <ConnectButton />}
      </AccountWrapper>
    </NavigatorWrapper>

  )
}


export default Navigator;


const StyledLogo = styled.img`
width:45px;
height:45px;
`;
const NavigatorWrapper = styled.div`
position:absolute;
height:45px;
Width:100%;
color:${colors.text.primary};
background:${colors.background.primary};
border-bottom:${colors.background.secondary};

box-shadow: 0px 2px 5px 1px ${colors.background.secondary};
`;

const Navbrand = styled.div`
float:left;
margin-left:10px;
height:45px;
width:200px;
color:${colors.text.secondary};
font-weight:800;
font-size: 26px;
background:${colors.background.primary};
`;

const AccountWrapper = styled.div`
float:right;
height:40px;
width:300px;
padding-top:2px;
margin-right:10px;
color:${colors.text.primary};
background:${colors.background.primary};
`;

const ConnectedAccount = styled.div`

float:right;
height:40px;
width:300px;
font-size:20px;
font-weight:500;
color:${colors.text.secondary};
background:${colors.background.primary};

`;

const EtherscanLink = styled.a`
position:relative;
color:${colors.text.secondary};
text-decoration:none;
`;

const CopyPaster = styled.div`
display:inline-block;
margin:5px;
&:hover {
    cursor:pointer;
    
  }
&:active {
    cursor:pointer;
    color:  ${colors.text.primary};
  }
`;