 import Web3 from "web3";
 var BN = Web3.utils.BN;


export function weiToFloat(BN,decimals){

  
   let number = (parseFloat(BN.toString()) / 10 ** decimals).toFixed(3)


    return number;
}

export function stringToFloat(weiString,decimals){
let bn =  new BN(weiString)
let number = (parseFloat(bn.toString()) / 10 ** decimals)

return number
}

export function userAmountToWei(float,decimals){

    let bn = new BN(parseInt(float)).toString();
    let wei = bn * (10**decimals)
 
 
     return wei.toString();
 }