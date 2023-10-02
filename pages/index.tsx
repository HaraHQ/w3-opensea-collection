import Image from 'next/image'
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google'
import Navbar from '@/components/small/Navbar'

import { FC } from 'react';

const inter = Inter({ subsets: ['latin'] })

type Nft = {
  identifier: string
  collection: string
  contract: string
  token_standard: string
  name: string
  description: null | string,
  image_url: string
  metadata_url: null | string,
  created_at: string
  updated_at: string
  is_disabled: boolean
  is_nsfw: boolean
}

type HomeProps = {
  nft: Nft[],
  getNftSuccess: boolean
}

const Home: FC<HomeProps> = ({ nft, getNftSuccess }) => {
  return (
    <main className={inter.className}>
      <Navbar />
      <div className='px-64 py-8 space-y-8'>
        <div>
          My Banchou Collection List
        </div>
        {getNftSuccess ? (
          <div className='grid grid-cols-5 gap-4'>
            {nft.map((_nft) => 
              <div key={_nft.identifier} className='w-full relative h-48'>
                <Image src={_nft.image_url} fill className='object-fit z-20' alt={_nft.name} />
                <div className='z-30 text-white absolute bottom-0 p-2 w-full bg-gradient-to-b from-transparent to-black h-12'>
                  <div>{_nft.name}</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>no items</div>
        )}
      </div>
    </main>
  )
}

export default Home;


export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const response = await fetch('https://w3-opensea.vercel.app/api/nft/collection', { method: 'GET', cache: 'force-cache', next: { revalidate: 3600 } });
  const json = await response.json();

  return {
    props: {
      getNftSuccess: json.success,
      nft: json.data
    },
  }
}