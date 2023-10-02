import Link from 'next/link';
import { FC } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { truncateAddress } from '@/utils/fn';

const Navbar: FC = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount();

  return (
    <div className='bg-slate-700 w-full py-4 px-64 flex justify-between'>
      <div className='flex space-x-4 items-center'>
        <div>web-gallery</div>
        {isConnected && (
          <div className='flex space-x-6 text-sm items-center border-l-2 border-white pl-4'>
            <Link href={'/submit'}>Submit</Link>
            <Link href={'/my-item'}>Personal Gallery</Link>
            <Link href={'/offers'}>Transactions</Link>
          </div>
        )}
      </div>
      <div className='cursor-pointer' onClick={() => open()}>
        {isConnected ? truncateAddress(address!) : 'login'}
      </div>
    </div>
  )
}

export default Navbar;