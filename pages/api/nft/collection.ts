import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // if (!Moralis.Core.isStarted) {
  //   await Moralis.start({
  //     apiKey: process.env.NEXT_PUBLIC_MORALIS_KEY!,
  //     // ...and any other configuration
  //   });
  // }
  
  // const address = '0xA3259e54A450D174E8690B97F435393e7cEfF41d';
  
  // const chain = EvmChain.ETHEREUM
  
  // const response = await Moralis.EvmApi.nft.

  // console.log('cli resp', response.toJSON())

  // res.status(200).json({
  //   result: []
  // })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': process.env.OPENSEA_KEY!
    }
  };
  
  fetch('https://api.opensea.io/v2/collection/my-banchou/nfts?limit=50', options)
    .then(response => response.json())
    .then(response => {
      return res.status(200).json({
        success: true,
        data: response.nfts
      })
    })
    .catch(err => {
      return res.status(400).json({
        success: false
      })
    });
}

export default handler;