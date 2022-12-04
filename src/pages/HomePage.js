import React, { useEffect, useState } from "react";
//import the table component and the header component and call the path in the import statement
import Table from "../components/Table";
import Header from "../components/Header";
import axios from "axios";
import { createNewProject, createMilestone, getAllProjects,makeDonation } from './utils/interact.js'
function HomePage() {
  // set states to hold wallet account details
  const [userAccount, setUserAccount] = useState();
  //const [id,setId] = useState("");
  let id; 
  const [addCampaignModal, setAddCampaignModal] = useState(false);
  const handlePost = () => {
    setAddCampaignModal(true);
  };

  const [addMilestoneModal, setAddMilestoneModal] = useState(false);
  const handleMilestone = () => {
    setAddMilestoneModal(true);
  };

  //create the values to be sent to the blockchain from the CampaignModle form 
  const [hashString, setHashString] = useState("");
  const [amountToRaise, setAmountToRaise] = useState("");
  const [duration, setDuration] = useState("");

  //create the values to be sent to the blockchain from the MilestoneModle form
  const [milestoneCid, setMilestoneCid] = useState("");
  const [votingPeriod, setVotingPeriod] = useState("");




  let eth;

  if (typeof window !== "undefined") {
    eth = window.ethereum;
  }

  //table start here
  let alldData = [];
  let to = ""
  let campaignAccounts = []
  let count = 0 
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const [data, setData] = useState([]);
  // get data from api
  const getCampainData = async () => {
    sleep(60)
    alldData = await getAllProjects()
      .then(alldData => setData(alldData))

  }
  // table end here

  const connectWallet = async (metamask = eth) => {
    try {
      // check if metamask is installed
      if (!metamask) {
        return alert("please install metamask to proceed");
      }
      // access the account
      const acc = await metamask.request({ method: "eth_requestAccounts" });
      setUserAccount(acc[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object found");
    }
  };


  const isMobile = () => {
    return "ontouchstart" in window || "onmsgesturechange" in window;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkWalletConnect = async (metamask = eth) => {
    try {
      // check if metamask is installed
      if (!metamask) {
        return alert("please install metamask to continue");
      }
      const acc = await metamask.request({ method: "eth_accounts" });
      if (acc.length) {
        setUserAccount(acc[0]);
      }

      if (isMobile()) {
        await connectWallet(eth);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkWalletConnect();
    getCampainData();
  }, [checkWalletConnect]);

  if (isMobile()) {
    const dappUrl = "web3-metamask-auth.netlify.app";
    const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
    return (
      <a href={metamaskAppDeepLink}>
        <button className="btn">connect wallet</button>
      </a>
    );
  }


  // // submit the campaign details to the json server
  const submitCampaign = async () => {
    await createNewProject({ hashString, amountToRaise, duration })
    // await getAllProjects()
    //const response = 
    //console.log(response)
    setAddCampaignModal(false);
  };


  // submit the milestone details to the blockchain
  const submitMilestone = async () => {
    await createMilestone({ milestoneCid, votingPeriod })
    setMilestoneCid("");
    setVotingPeriod("");
    setAddMilestoneModal(false);
  };


  const donate = async () => {
    const resp = await makeDonation(id,userAccount)
  }

  // send Transaction from using metamask 
  const sendTransaction = async () => {
    const params = [
      {
        from: userAccount,
        to: id,
        value: Number(10000000000000000).toString(16)
      },
    ]
    /*
    const tx = {
      from: userAccount,
      to: to,
      //to: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      value: Number(10000000000000000).toString(16),
    };
    */
    try {
      const txHash = await eth.request({
        method: "eth_sendTransaction",
        params,
      });
      console.log(txHash);
    } catch (error) {
      console.log(error);
    }
  };



  // use the get started button to connect to metamask and get the account address and balance and display it on the page
  return (
    <div
      className="min-h-screen bg-fumbaSeven"
      style={{
        backgroundImage:
          "radial-gradient(at 24% 84%, rgb(30, 41, 59) 0, transparent 50%), radial-gradient(at 37% 61%, rgb(231, 229, 228) 0, transparent 29%), radial-gradient(at 96% 100%, rgb(30, 58, 138) 0, transparent 24%), radial-gradient(at 15% 69%, rgb(255, 228, 230) 0, transparent 8%), radial-gradient(at 49% 98%, rgb(14, 116, 144) 0, transparent 15%), radial-gradient(at 39% 95%, rgb(127, 29, 29) 0, transparent 81%)",
      }}
    >
      <Header />
      <div className="container justify-center mx-auto  items-center mt-6  p-6 font-bold place-content-center md:mx-auto text-white">
        <p className="text-3xl text-center"> Lets fund your project</p>
        <div className=" text-center py-2">
          {userAccount ? (
            <div className="text-connect">
              <span className="font-bold px-3 py-2 rounded  outline-none   mb-1 bg-fumbaEight text-white">
                {userAccount.substring(0, 5)}...
                {userAccount.substring(userAccount.length - 5)}{" "}
              </span>
            </div>
          ) : (
            <button
              className="font-bold px-2 py-2 rounded  outline-none   mb-1 bg-fumbaThree text-white"
              type="button"
              onClick={() => connectWallet()}
            >
              Get Started
            </button>
          )}
        </div>
        {userAccount ? (
          <div className="relative flex flex-row-reverse ... -mb-10">
            <button
              className=" font-bold px-2 py-2 rounded  outline-none bg-fumbaEight  text-white mr-10"
              type="button"
              onClick={() => handleMilestone()}
            >
              Add Milestone
            </button>
            <button
              className=" font-bold px-2 py-2 rounded  outline-none bg-fumbaEight  text-white mr-6"
              type="button"
              onClick={() => handlePost()}
            >
              Add Campaign
            </button>
          </div>
        ) : null}

        {/* start the table here */}
        <div className='container mx-auto  items-center mt-6  p-6 font-bold place-content-center md:mx-auto' >

          <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-2 text-white " >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400"  >
              <thead className=" border-b text-white uppercase font-extrabold text-3l "  >
                <tr>
                  <th scope="col" className="py-3 px-3">
                    No
                  </th>
                  <th scope="col" className="py-3 px-3">
                    Hash String
                  </th>
                  <th scope="col" className="py-3 px-3">
                    Amount to Raise
                  </th>
                  <th scope="col" className="py-3 px-3">
                    Amount Donated
                  </th>
                  <th scope="col" className="py-3 px-3">
                    Count Milestone
                  </th>
                  <th scope="col" className="py-3 px-3">
                    Number of Donors
                  </th>
                  <th scope="col" className="py-3 px-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody >
                {data.map(
                  (info, index) => {
                    sleep(60)
                    const dd = info.hash
                    to = info.contract
                    campaignAccounts.push(info.contract)

                    to = campaignAccounts[count]
                    count++
                    var ipfsLink = "https://ipfs.io/ipfs/" + info.hash
                    return (
                      <tr key={index} className="bg-white border-b text-fumbaFive dark:border-gray-700 hover:bg-gray-500 hover:text-white dark:hover:bg-gray-600" >
                        <th scope="row" className="py-3 px-3 font-medium  whitespace-nowrap">
                          {index + 1}
                        </th>
                        <td className="py-3 px-3">
                          <a href={ipfsLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{dd.substring(0, 3)}...{dd.substring(dd.length - 3)}{" "}</a>
                          {/* {ipfsLink} */}
                        </td>
                        <td className="py-3 px-3">
                          {info.target} Matic
                        </td>
                        <td className="py-3 px-3">
                          {info.donated} Matic
                        </td>
                        <td className="py-3 px-3">
                          {info.milestone}
                        </td>
                        <td className="py-3 px-3">
                          <span className="bg-fumbaThree text-white py-1 px-3 rounded-full text-xs">{info.donors}</span>
                        </td>
                        {userAccount ? (
                          <td className=" flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0">
                            <button className="bg-fumbaThree hover:bg-fumbaThree text-white font-bold py-2 px-4 rounded"
                              onClick={() => donate(id = (info.contract))}>Donate</button>
                          </td>
                        ) : (
                          <td className=" flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0">
                            <button className="bg-fumbaThree hover:bg-fumbaThree text-white font-bold py-2 px-4 rounded"
                              onClick={() => connectWallet()}>Donate</button>
                          </td>
                        )}

                      </tr>
                    )
                  }
                )

                }
              </tbody>
            </table>

          </div>
        </div>
        {/* end the table here */}

        {/* start the campaign form */}

        {addCampaignModal ? (
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none text-white"
                style={{ backgroundColor: "#334155" }}
              >
                <div className="flex items-start justify-between p-2 m-3 rounded-t ">
                  <h3 className="text-3xl font-bold text-center ">
                    New Campaign
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setAddCampaignModal(false)}
                  >
                    <span className="text-black opacity-7 font-extrabold h-6 w-6 text-xl block py-0 rounded-full right-0">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-10 flex-auto">
                  <form className="  rounded px-10 pt-1  w-full">
                    <label className="block text-fumbaEight text-2xl font-bold mb-1">
                      Hash String
                    </label>
                    <input
                      style={{
                        backgroundColor: "",
                        color: "#01122E",
                        borderColor: "#01122E",
                      }}
                      type="text"
                      className="  rounded w-full py-2 px-10 mb-1"
                      name="hash_string"
                      onChange={(e) => setHashString(e.target.value)}
                      placeholder="Hash String"
                    />
                    <label className="block text-fumbaEight text-2xl font-bold mb-1">
                      Amount to Raise
                    </label>
                    <input
                      style={{
                        backgroundColor: "",
                        color: "#01122E",
                        borderColor: "#01122E",
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-10 mb-1"
                      type="number"
                      name="amount_to_raise"
                      onChange={(e) => setAmountToRaise(e.target.value)}
                      placeholder="Amount to Raise"
                    />
                    <label className="block text-fumbaEight  text-2xl font-bold mb-1">
                      Duration
                    </label>
                    <input
                      style={{
                        backgroundColor: "",
                        color: "#01122E",
                        borderColor: "#01122E",
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-10"
                      type="number"
                      name="duration"
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder=" "
                    />
                    <br />
                  </form>
                </div>
                <div className="flex items-center justify-center p-6   rounded-b">
                  <button
                    className=" bg-fumbaEight font-bold uppercase text-sm px-6 py-3 rounded w-80 mr-1 text-white mb-4"
                    type="button"
                    onClick={() => submitCampaign()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* start the Milestone form */}

        {addMilestoneModal ? (
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none text-white"
                style={{ backgroundColor: "#334155" }}
              >
                <div className="flex items-start justify-between p-2 m-3 rounded-t ">
                  <h3 className="text-3xl font-bold text-center ">
                    New Milestone
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setAddMilestoneModal(false)}
                  >
                    <span className="text-black opacity-7 font-extrabold h-6 w-6 text-xl block py-0 rounded-full right-0">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-10 flex-auto">
                  <form className="  rounded px-10 pt-1  w-full">
                    <label className="block text-fumbaEight text-2xl font-bold mb-1">
                      Milestone CID:
                    </label>
                    <input
                      style={{
                        backgroundColor: "",
                        color: "#01122E",
                        borderColor: "#01122E",
                      }}
                      type="text"
                      className="  rounded w-full py-2 px-10 mb-1"
                      name="milestone_cid"
                      onChange={(e) => setMilestoneCid(e.target.value)}
                      placeholder=""
                    />
                    <label className="block text-fumbaEight text-2xl font-bold mb-1">
                      Voting Period
                    </label>
                    <input
                      style={{
                        backgroundColor: "",
                        color: "#01122E",
                        borderColor: "#01122E",
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-10 mb-1"
                      type="number"
                      name="voting_period"
                      onChange={(e) => setVotingPeriod(e.target.value)}
                      placeholder=""
                    />
                  </form>
                </div>
                <div className="flex items-center justify-center p-6   rounded-b">
                  <button
                    className=" bg-fumbaEight font-bold uppercase text-sm px-6 py-3 rounded w-80 mr-1 text-white mb-4"
                    type="button"
                    onClick={() => submitMilestone()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
