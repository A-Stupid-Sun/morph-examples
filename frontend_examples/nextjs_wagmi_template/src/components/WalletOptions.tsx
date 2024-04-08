import * as React from 'react'
import { Connector, useConnect } from 'wagmi'

export function WalletOptions() {
  const { connectors, connect, status } = useConnect()
  console.log(connectors)
  const connector = connectors[0]
  console.log({status})
  return (
    <button key={connector.uid} className='bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 mb-4' onClick={() => connect({ connector })}>
      Connect Wallet
    </button>
  )
  // return connectors.map((connector) => (
  //   <WalletOption
  //     key={connector.uid}
  //     connector={connector}
  //     onClick={() => connect({ connector })}
  //   />
  // ))
  // function WalletOption({
  //   connector,
  //   onClick,
  // }: {
  //   connector: Connector
  //   onClick: () => void
  // }) {
  //   const [ready, setReady] = React.useState(false)
  
  //   React.useEffect(() => {
  //     ;(async () => {
  //       const provider = await connector.getProvider()
  //       setReady(!!provider)
  //     })()
  //   }, [connector])
  
  //   return (
  //     <button disabled={!ready} onClick={onClick}>
  //       {connector.name}
  //     </button>
  //   )
  // }
}