import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {BsArrowBarRight,BsArrowBarLeft} from "react-icons/bs";
import {CgInfinity} from "react-icons/cg";
import {AiOutlineSwap} from "react-icons/ai";
import { colors } from "../utils/Colors";
import { sidebarSelector } from "../store/selectors";
import { showSidebar, hideSidebar } from "../store/actions";
import {ImDroplet}from "react-icons/im";
import {CgCardClubs}from "react-icons/cg";
import ReactTooltip from "react-tooltip";
import {useTranslation} from 'react-i18next';

 const Sidebar = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation('common');
 const toggle = useSelector(sidebarSelector)
  const props = {dispatch,toggle,t}
  const style = {textDecoration: 'none'}
  return (
    <SidebarWrapper size ={toggle ? 250 : 50} opacity = {toggle ? 'visible' :  'hidden'} >
      <Toggler toggle ={props}>
      { toggle ?  <BsArrowBarLeft onClick={ () =>{dispatch(hideSidebar(props))}}/> : <BsArrowBarRight  onClick={ () =>{dispatch(showSidebar(props))}}/>}  
      </Toggler> 
      <SideItemWrapper>
      <Link to="/loop" style={style}>
        <SideItem><IconWrapper data-tip data-for="loop"><CgInfinity/></IconWrapper>  {toggle? <SideItemLabel>{t('sidebar.loop.label')}</SideItemLabel>: null} </SideItem>
        <ReactTooltip id="loop" place="right" effect="solid">
        {t('sidebar.loop.tooltip')}
        </ReactTooltip>
        </Link>

        <Link to="/swap" style={style}>
        <SideItem> <IconWrapper data-tip data-for="swap"> <AiOutlineSwap /> </IconWrapper> {toggle? <SideItemLabel>{t('sidebar.swap.label')}</SideItemLabel>: null} </SideItem>
        <ReactTooltip id="swap" place="right" effect="solid">
        {t('sidebar.swap.tooltip')}
        </ReactTooltip>
        </Link>

        <Link to="/liquidity" style={style}>
        <SideItem> <IconWrapper data-tip data-for="liquidity"> <ImDroplet/> </IconWrapper>{toggle? <SideItemLabel>{t('sidebar.liquidity.label')}</SideItemLabel>: null}</SideItem>
        <ReactTooltip id="liquidity" place="right" effect="solid">
        {t('sidebar.liquidity.tooltip')}
        </ReactTooltip>
        </Link>

        <Link to="/nft" style={style}>
        <SideItem> <IconWrapper data-tip data-for="nft"> <CgCardClubs/> </IconWrapper>{toggle? <SideItemLabel>{t('sidebar.nft.label')}</SideItemLabel>: null}</SideItem>
        <ReactTooltip id="nft" place="right" effect="solid">
        {t('sidebar.nft.tooltip')}
        </ReactTooltip>
        </Link>

      </SideItemWrapper>

    </SidebarWrapper>
  
   
  );
};

const IconWrapper = styled.div`
float:left;
clear:right;
border-radius:5px;
box-shadow: 5px 2px 10px 5px ${colors.background.shadow};
&:hover{
 border:1px solid ${colors.text.primary};
}
&active {
  color:${colors.text.primary};
}
`;

const SidebarWrapper = styled.div`
  position:absolute;
  padding: 5px;
  font-size:50px;
  width:${(props) => props.size}px;
  top:55px;
  bottom:0px;
  background-color: ${colors.background.primary};
  padding-top: 10px;
  transition: .5s ease;
  z-index:5;
 
`;
const Toggler = styled.div`
float:right;
text-align:right;
color:${colors.text.secondary};
&:hover {
  cursor:pointer;
  shadow: 5px 5px 10px ${colors.text.secondary};
}
&:active {
  cursor:pointer;
  color:  ${colors.text.primary};
}
`;

const SideItem = styled.div`
color:${colors.text.secondary};
transition: 1s ease;
position:relative;

text-align:left;
height:70px;
width:100%;
&:hover {
  cursor:pointer;
  shadow: 5px 5px 10px ${colors.text.secondary};
}
&:active {
  cursor:pointer;
  color:  ${colors.text.primary};
}
`;
const SideItemLabel = styled.div`
position:relative;
top:0px;
right:0px;
padding-left:10px;
overflow:hidden;

visibility:${(props) => props.opacity};
transition: .5s ease;
top:0px;
height:50px;
clear:right;
font-size: 35px;
width:${(props) => props.size}px;
margin-left:px;
`;
const SideItemWrapper = styled.div`
position:absolute;
top:75px;
width:100%;
`;

export default Sidebar;