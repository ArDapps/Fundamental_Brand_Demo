import React, { useState,useEffect }  from 'react';
import './App.css';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
  //Create Web3 Model
  const [web3Api, setWeb3Api]= useState({
    provider:null,
    web3:null,
   
  });

  //Create Reload
const providerChanged = (provider)=>{
  provider.on("accountsChanged",_=>window.location.reload());
  provider.on("chainChanged",_=>window.location.reload());

}

//Create Load Provider

useEffect(()=>{
  const loadProvider =  async()=>{
    const provider = await detectEthereumProvider();



    if(provider){
      providerChanged(provider);
      setWeb3Api({
        provider,
        web3:new Web3(provider),
      });
      

    }else{
      console.log("No Provider please Install metamask ")
    }
  }
  loadProvider();

},[])

//Load the contract and Function

//Load The Contract Content
const [contract,setContract] = useState(null);
const [brandName,setBrandName] =useState([]);
useEffect(() => {
const loadContract = async ()=>{
 const contractFile = await fetch('/abis/BrandName.json');
 //error in build Because need to give react The permission 
 //const contractFile = await fetch('../build/contracts.BrandName.json');

 console.log(contractFile)
 const convertContractFileToJson =  await contractFile.json();
 console.log(convertContractFileToJson,"contract Convert File")

 const abi = await convertContractFileToJson.abi;
 const networkId =  await web3Api.web3.eth.net.getId();

 const networkObject = convertContractFileToJson.networks[networkId]

 if(networkObject){
  const address  = await networkObject.address;
  console.log(address);
  const deployedContract = await  new web3Api.web3.eth.Contract(abi,address); 
  setContract(deployedContract);

  console.log(deployedContract);

  const brandName = await deployedContract.methods.name().call();
  setBrandName(brandName);



 }else{
   window.alert("Please connect with Ropsten Network")
 }
  
}
web3Api.web3 &&loadContract();
}, [web3Api.web3])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Our Brand Name is {brandName}</h1>
      </header>
    </div>
  );
}

export default App;
