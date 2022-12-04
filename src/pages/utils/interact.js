const { ethers } = require("ethers");
//require("@nomiclabs/hardhat-ethers");
//import { ethers } from "hardhat"
//const { etherss } = require("hardhat")
const { axios } = require("axios");
//require('dotenv').config()
//import axios, * as others from 'axios'
//import axios from "axios";


const {REACT_APP_API_KEY, REACT_APP_PRIVATE_KEY_ONE,REACT_APP_CONTRACT_ADDRESS} = process.env;


//console.log("API:", REACT_APP_API_KEY)

//const path = require('./campaigns.json');

//const API_K
//EY = process.env.NEXT_PUBLIC_API_KEY;
//const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
//const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;


// interact.js

// For Hardhat
//const contract = require("../../artifacts/CrowdSourcingFactory.json");
const factory = require("./artifacts/CrowdSourcingFactory.json")

const project = require("./artifacts/CrowdFundingContract.json");


// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider("maticmum", REACT_APP_API_KEY);
const provider = new ethers.providers.Web3Provider(window.ethereum)
//console.log(process.env.NODE_ENV)
//console.log(REACT_APP_API_KEY)
// Signer
const signer = new ethers.Wallet(REACT_APP_PRIVATE_KEY_ONE, alchemyProvider);


// Contract
let useFactory = new ethers.Contract(REACT_APP_CONTRACT_ADDRESS, factory.abi, signer);
//let useproject =  new ethers.Contract("", project.abi, signer)

/*
const deleteData = async () => {
  for (let i = 2; i <4; i++){
    axios.delete('https://fake-api-td6a.onrender.com/campaigns/5')
  }
  }
*/
export const getAllProjects = async () => {
    //console.log(process.env.REACT_APP_API_KEY)

    const counter = 0
    console.log("CALLED: ", counter)
    //const message = await helloWorldContract.message();
    //let txnOne = await hello.createCrowdFundingContract("1111128LLTWYZBBtYrcULEjdPXtNAFaZXMbzYQyf",3,386400, {value: ethers.utils.parseEther("0.001")})
    const ll = []
    const contracts = await useFactory.deployedContracts();

    //console.log(contracts)

    
    
    for ( let i = 0;  i < contracts.length ; i++) {
      const contractAddr = contracts[i]; 

      console.log("Details for:..... ",i)
      
      let useProject =  new ethers.Contract(contractAddr, project.abi, signer)

      let owner = await useProject.campaignOwner()
      let donors = await useProject.numberOfDonors()
      let donated = await useProject.amountOfDonation()
      let milestone = await useProject.showCurrentMillestone()
      let hash = await useProject.getFundingcid()
      let target = await useProject.getTargetAmount()
      let contract = contractAddr

      donors = Number(donors._hex)
      donated = ethers.utils.formatEther(donated._hex)
      target = ethers.utils.formatEther(target._hex)
      milestone = Number(milestone._hex)
      //donated = Number(donated._hex)
      //const targetWei = Number(target._hex)
      //donated = ethers.utils.formatEther(Number(donated._hex))
      //target = ethers.utils.formatEther(Number(target._hex))
      //milestone = Number(milestone._hex)

      //console.log("donors:", donors)
      //console.log("donated:", donated)
      //console.log("target:", target)
      //console.log("milestone:", milestone)
      //console.log("contract: ", contract)
      //console.log("donors:", donors)
      ll.push({owner,donors,donated,milestone,hash,target, contract})
      //return {owner,donors,donated,milestone,hash,target}
      //return(useProject)
    }
    //console.log("Send to front-end: ", ll)
    const dd = JSON.stringify(ll);
    const jdata = JSON.parse(dd)
    return jdata
  }

  //create a new campaign
  const fundingcid = "QmatxCpjs78AxBN9yxT8JCVKbZHWVowHSMMRgQQ7Y5JSYj"
  //2 Eth
  const tailwind = 1 

  //47 days
  const duration = 4060800
  export const createNewProject = async (d) => {

    const fundingcid = d.hashString
    const target = d.amountToRaise
    const duration = d.duration
    let txnOne = await useFactory.createCrowdFundingContract(fundingcid,target,duration, {value: ethers.utils.parseEther("0.001")})
    //let wait = await txnOne.wait();
    console.log(txnOne.hash)    
    //console.log(target)    
    //console.log(duration)    


  }

  //create a milestone on a campaign
  //const campaignAddr = "0x507bF60458331C170990d0D74e18b904266aB719"

  export const createMilestone = async (d) => {
    const milestoneCID = d.milestoneCid
    const votingPeriod = d.votingPeriod
    const campaignAddr = d.mileArthur
    let txnOne = new ethers.Contract(campaignAddr, project.abi, signer)

    try {
      let resp = await txnOne.createNewMilestone(milestoneCID,votingPeriod)
      return resp.hash
    } catch (err){
      //return revert code
      const code = err.error.reason

      return code 
    }
    //let wait = await resp.wait();
    //console.log(wait) 
  }


  //make donation to a campaing
  const to = "0x507bF60458331C170990d0D74e18b904266aB719"
  const donation = "0.02"

 export const makeDonation = async (to,userAccount) => {
    console.log("sending money to ........",to)
    let useProject =  new ethers.Contract(to, project.abi,provider)
    let newSigner = provider.getSigner(userAccount)
    const useProjectWithSigner = useProject.connect(newSigner)

    const donate = await useProjectWithSigner.makeDonation({ from:userAccount, value: ethers.utils.parseEther("0.01")});
    
    return donate.hash    
  }
  export const sendDonation = async (to) => {

    //let useProject =  new ethers.Contract(to, project.abi, signer)
    //make a donation to a crowd funding campaign
    //const donate = await useProject.makeDonation({ value: ethers.utils.parseEther(donation)});
    
    //return donate.hash    
  }


  //createNewProject(fundingcid, amount, duration);
  //makeaDonation(to, donation);
  //deleteData();
