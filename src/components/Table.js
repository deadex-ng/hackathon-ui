// import React from 'react'
// import axios from 'axios'
// import {useState, useEffect} from 'react'
// import {makeaDonation,getAllProjects,sendDonation } from '../../src/pages/utils/interact.js'
// import { info } from 'autoprefixer';

// let eth;
// let alldData = [];
// function Table() {
//     const [data, setData] = useState([]);

//    // get data from api
//    const getCampainData = async() => {

//     alldData = await getAllProjects()
//     .then(alldData =>setData(alldData))

//     console.log("All data: ", alldData)

    
//     // axios.get("https://fake-api-td6a.onrender.com/campaigns")
//     //     .then((res) => {
//     //             setData(res.data);              
//     //      })
//     // */
// }
// useEffect(() => {
//     getCampainData();
// }, []);
// // call the function to get data
// /*
// useEffect(() => {

//     getCampainData();
// }, []);
// */
// // submit the donation details to the blockchain
// const submitDonation = async () => { 
//     //e.preventDefault();
//     console.log(to)
//     console.log("donating")
//     const to = "0x507bF60458331C170990d0D74e18b904266aB719"
//     const donation = "0.02"
//     //return transaction hash
//     const txnHash = await makeaDonation(to,donation)
//     console.log(txnHash);
//   };

// async function sendDonation (){
//     const resp = await sendDonation()
//     console.log(resp)
//     //const accounts = await window.ethereum.request({method: "eth_requestAccounts",});
//     //const address = accounts[0]
//     //let params = [
//     //    {
//     //      from: "0x3b9bA781797b57872687Ce5d5219A1A4Bc0e85ea",
//     //      to: "0x0bBaa72a099B7d8d3C8b648F9d49870bD11895e4",
//     //      gas: "0x76c0", // 30400
//     //      gasPrice: "0x9184e72a000", // 10000000000000
//     //      value: "0x9184e72a", // 2441406250
//     //    },
//     //  ]
//     //let result = await window.ethereum.request({method: 'eth_sendTransaction',params,}).catch((err) =>{
//      //   console.log(err)
//     //})
// }



//   return (
      
//       // create a table 7 columns wide and 5 rows  using tailwind css
//       <div className='container mx-auto  items-center mt-6  p-6 font-bold place-content-center md:mx-auto' >
        
//         <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-2 text-white " >
//                         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400"  >
//                             <thead className=" border-b text-white uppercase font-extrabold text-3l "  >
//                                 <tr>
//                                    <th scope="col" className="py-3 px-3">
//                                        No
//                                     </th>
//                                     <th scope="col" className="py-3 px-3">
//                                        Hash String
//                                     </th>
//                                     <th scope="col" className="py-3 px-3">
//                                         Amount to Raise    
//                                     </th>
//                                     <th scope="col" className="py-3 px-3">
//                                         Amount Donated
//                                     </th>
//                                     <th scope="col" className="py-3 px-3">
//                                        Count Milestone
//                                     </th>
//                                     <th scope="col" className="py-3 px-3">
//                                     Number of Donors
//                                     </th>
//                                     <th scope="col" className="py-3 px-3">
//                                         Action
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody >
//                             {data.map(
//                                 (info,index) => {
//                                     console.log("info:", alldData)
//                                     return (
//                                         <tr key = {index} className="bg-white border-b text-fumbaFive dark:border-gray-700 hover:bg-gray-500 hover:text-white dark:hover:bg-gray-600" >
//                                     <th scope="row" className="py-3 px-3 font-medium  whitespace-nowrap">
//                                             {index+1}
//                                     </th>
//                                     <td className="py-3 px-3">
//                                             https://ipfs.io/ipfs/{info.hash}
//                                     </td>
//                                     <td className="py-3 px-3">
//                                             {info.target} Eth
//                                     </td>
//                                     <td className="py-3 px-3">
//                                             {info.donated} Eth
//                                     </td>
//                                     <td className="py-3 px-3">
//                                             {info.milestone}
//                                     </td>
//                                     <td className="py-3 px-3">
//                                                 <span className="bg-fumbaThree text-white py-1 px-3 rounded-full text-xs">{info.donors}</span>
//                                     </td>
//                                     <td className=" flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0">
//                                                 <button className="bg-fumbaThree hover:bg-fumbaThree text-white font-bold py-2 px-4 rounded" 
//                                                 const to = {info.contract}
//                                                  onClick={()=>sendDonation()}>Donate</button>
//                                     </td>
//                                 </tr>
//                                         )
//                                 }
//                             )
                                
//                             }
//                             </tbody>
//                         </table>

//                     </div>
//         </div>
//   )
// }

// export default Table

//{dd.substring(0, 3)}...{dd.substring(dd.length - 3)}{" "}