/* eslint-disable */
import React, { Component } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {colors} from '../utils/Colors';
import { CgClose } from "react-icons/cg";
import {ImWarning} from "react-icons/im"
import { warningDataSelector, warningSelector } from '../store/selectors';


const Warning = (props) => {

const warningData = useSelector(warningDataSelector)
  return (
    <WarningWrapper>
      <WarningCloseButton >
        
      </WarningCloseButton>
      <ImWarning/> {warningData} <ImWarning/>
    </WarningWrapper>
  );
}


export default Warning;

const WarningWrapper = styled.div`
position:relative;
text-align: center;
width:450px;
margin-top:20px;
margin:auto;
height:30px;
color:${colors.text.warning};
font-weight:700;


`;

const WarningCloseButton = styled.div`
text-align: center;
overflow-y: auto;

`;

