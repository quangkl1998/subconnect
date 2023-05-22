import { useContext } from "react";
import { ChainDataContext, ClientContext, JsonRpcContext, ModalWalletConnectContext } from "../contexts";
import Blockchain from "../components/Blockchain";
import { AccountAction } from "../helpers";
import { DEFAULT_COSMOS_METHODS, DEFAULT_EIP155_METHODS, DEFAULT_ELROND_METHODS, DEFAULT_MAIN_CHAINS, DEFAULT_NEAR_METHODS, DEFAULT_POLKADOT_METHODS, DEFAULT_SOLANA_METHODS, DEFAULT_TEST_CHAINS, DEFAULT_TEZOS_METHODS, DEFAULT_TRON_METHODS } from "../constants";
import { Button, Modal, Switch } from "antd";



function WalletConnectInfo(): React.ReactElement {
  const { client, session, accounts, balances, disconnect, isFetchingBalances, chains, setChains } = useContext(ClientContext);
  const { chainData } = useContext(ChainDataContext);
  const openRequestModal = useContext(ModalWalletConnectContext);
  const { ping,
    ethereumRpc,
    cosmosRpc,
    solanaRpc,
    polkadotRpc,
    nearRpc,
    // elrondRpc,
    // tronRpc,
    tezosRpc,
    isRpcRequestPending,
    rpcResult,
    isTestnet,
    setIsTestnet, } = useContext(JsonRpcContext);

  const chainOptions = isTestnet ? DEFAULT_TEST_CHAINS : DEFAULT_MAIN_CHAINS;

  const getEthereumActions = (): AccountAction[] => {
    const onSendTransaction = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await ethereumRpc.testSendTransaction(chainId, address);
    };
    const onSignTransaction = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await ethereumRpc.testSignTransaction(chainId, address);
    };
    const onSignPersonalMessage = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await ethereumRpc.testSignPersonalMessage(chainId, address);
    };
    const onEthSign = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await ethereumRpc.testEthSign(chainId, address);
    };
    const onSignTypedData = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await ethereumRpc.testSignTypedData(chainId, address);
    };

    return [
      {
        method: DEFAULT_EIP155_METHODS.ETH_SEND_TRANSACTION,
        callback: onSendTransaction,
      },
      {
        method: DEFAULT_EIP155_METHODS.ETH_SIGN_TRANSACTION,
        callback: onSignTransaction,
      },
      {
        method: DEFAULT_EIP155_METHODS.PERSONAL_SIGN,
        callback: onSignPersonalMessage,
      },
      {
        method: DEFAULT_EIP155_METHODS.ETH_SIGN + " (standard)",
        callback: onEthSign,
      },
      {
        method: DEFAULT_EIP155_METHODS.ETH_SIGN_TYPED_DATA,
        callback: onSignTypedData,
      },
    ];
  };

  const getCosmosActions = (): AccountAction[] => {
    const onSignDirect = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await cosmosRpc.testSignDirect(chainId, address);
    };
    const onSignAmino = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await cosmosRpc.testSignAmino(chainId, address);
    };
    return [
      {
        method: DEFAULT_COSMOS_METHODS.COSMOS_SIGN_DIRECT,
        callback: onSignDirect,
      },
      {
        method: DEFAULT_COSMOS_METHODS.COSMOS_SIGN_AMINO,
        callback: onSignAmino,
      },
    ];
  };

  const getSolanaActions = (): AccountAction[] => {
    const onSignTransaction = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await solanaRpc.testSignTransaction(chainId, address);
    };
    const onSignMessage = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await solanaRpc.testSignMessage(chainId, address);
    };
    return [
      {
        method: DEFAULT_SOLANA_METHODS.SOL_SIGN_TRANSACTION,
        callback: onSignTransaction,
      },
      {
        method: DEFAULT_SOLANA_METHODS.SOL_SIGN_MESSAGE,
        callback: onSignMessage,
      },
    ];
  };

  const getPolkadotActions = (): AccountAction[] => {
    const onSignTransaction = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await polkadotRpc.testSignTransaction(chainId, address);
    };
    const onSignMessage = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await polkadotRpc.testSignMessage(chainId, address);
    };
    return [
      {
        method: DEFAULT_POLKADOT_METHODS.POLKADOT_SIGN_TRANSACTION,
        callback: onSignTransaction,
      },
      {
        method: DEFAULT_POLKADOT_METHODS.POLKADOT_SIGN_MESSAGE,
        callback: onSignMessage,
      },
    ];
  };

  const getNearActions = (): AccountAction[] => {
    const onSignAndSendTransaction = async (
      chainId: string,
      address: string
    ) => {
      openRequestModal.setModalInfo('request');
      await nearRpc.testSignAndSendTransaction(chainId, address);
    };
    const onSignAndSendTransactions = async (
      chainId: string,
      address: string
    ) => {
      openRequestModal.setModalInfo('request');
      await nearRpc.testSignAndSendTransactions(chainId, address);
    };
    return [
      {
        method: DEFAULT_NEAR_METHODS.NEAR_SIGN_AND_SEND_TRANSACTION,
        callback: onSignAndSendTransaction,
      },
      {
        method: DEFAULT_NEAR_METHODS.NEAR_SIGN_AND_SEND_TRANSACTIONS,
        callback: onSignAndSendTransactions,
      },
    ];
  };

  // const getElrondActions = (): AccountAction[] => {
  //   const onSignTransaction = async (chainId: string, address: string) => {
  //     openRequestModal.setModalInfo('request');
  //     await elrondRpc.testSignTransaction(chainId, address);
  //   };
  //   const onSignTransactions = async (chainId: string, address: string) => {
  //     openRequestModal.setModalInfo('request');
  //     await elrondRpc.testSignTransactions(chainId, address);
  //   };
  //   const onSignMessage = async (chainId: string, address: string) => {
  //     openRequestModal.setModalInfo('request');
  //     await elrondRpc.testSignMessage(chainId, address);
  //   };
  //   return [
  //     {
  //       method: DEFAULT_ELROND_METHODS.ELROND_SIGN_TRANSACTION,
  //       callback: onSignTransaction,
  //     },
  //     {
  //       method: DEFAULT_ELROND_METHODS.ELROND_SIGN_TRANSACTIONS,
  //       callback: onSignTransactions,
  //     },
  //     {
  //       method: DEFAULT_ELROND_METHODS.ELROND_SIGN_MESSAGE,
  //       callback: onSignMessage,
  //     },
  //   ];
  // };

  // const getTronActions = (): AccountAction[] => {
  //   const onSignTransaction = async (chainId: string, address: string) => {
  //     openRequestModal.setModalInfo('request');
  //     await tronRpc.testSignTransaction(chainId, address);
  //   };
  //   const onSignMessage = async (chainId: string, address: string) => {
  //     openRequestModal.setModalInfo('request');
  //     await tronRpc.testSignMessage(chainId, address);
  //   };
  //   return [
  //     {
  //       method: DEFAULT_TRON_METHODS.TRON_SIGN_TRANSACTION,
  //       callback: onSignTransaction,
  //     },
  //     {
  //       method: DEFAULT_TRON_METHODS.TRON_SIGN_MESSAGE,
  //       callback: onSignMessage,
  //     },
  //   ];
  // };

  const getTezosActions = (): AccountAction[] => {
    const onGetAccounts = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await tezosRpc.testGetAccounts(chainId, address);
    };
    const onSignTransaction = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await tezosRpc.testSignTransaction(chainId, address);
    };
    const onSignMessage = async (chainId: string, address: string) => {
      openRequestModal.setModalInfo('request');
      await tezosRpc.testSignMessage(chainId, address);
    };
    return [
      {
        method: DEFAULT_TEZOS_METHODS.TEZOS_GET_ACCOUNTS,
        callback: onGetAccounts,
      },
      {
        method: DEFAULT_TEZOS_METHODS.TEZOS_SEND,
        callback: onSignTransaction,
      },
      {
        method: DEFAULT_TEZOS_METHODS.TEZOS_SIGN,
        callback: onSignMessage,
      },
    ];
  };

  const getBlockchainActions = (chainId: string) => {
    const [namespace] = chainId.split(":");
    switch (namespace) {
      case "eip155":
        return getEthereumActions();
      case "cosmos":
        return getCosmosActions();
      case "solana":
        return getSolanaActions();
      case "polkadot":
        return getPolkadotActions();
      case "near":
        return getNearActions();
      // case "elrond":
      //   return getElrondActions();
      // case "tron":
      //   return getTronActions();
      case "tezos":
        return getTezosActions();
      default:
        break;
    }
  };
  // console.log('rpcResult', rpcResult)


  const toggleTestnets = () => {
    const nextIsTestnetState = !isTestnet;
    setIsTestnet(nextIsTestnetState);
    // setLocaleStorageTestnetFlag(nextIsTestnetState);
  };
  console.log('chainOptions', chainOptions)

  const handleChainSelectionClick = (chainId: string) => {
    if (chains.includes(chainId)) {
      setChains(chains.filter((chain) => chain !== chainId));
    } else {
      setChains([...chains, chainId]);
    }
    console.log('session', session)
    console.log('accounts', accounts)
    const currentRequiredNamespace = session?.namespaces;
    const newNamespace = {};
  };
  const onPing = async () => {
    openRequestModal.setModalInfo('request');
    await ping();
  };
  async function emit() {
    if (typeof client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }

    await client.emit({
      topic: session?.topic || "",
      event: { name: "chainChanged", data: {} },
      chainId: "eip155:5",
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div>
        <Button onClick={onPing}>Ping</Button>
        <Button onClick={emit}>Emit</Button>
        <Button onClick={disconnect}>Disconnect</Button>
      </div>
      <div style={{ maxWidth: '660px', marginTop: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        {accounts.map((account) => {
          const [namespace, reference, address] = account.split(":");
          const chainId = `${namespace}:${reference}`;
          return (
            <Blockchain
              key={account}
              active={true}
              chainData={chainData}
              fetching={isFetchingBalances}
              address={address}
              chainId={chainId}
              balances={balances}
              actions={getBlockchainActions(chainId)}
            />
          );
        })}
        <Modal open={openRequestModal.modal !== ''} onCancel={() => openRequestModal.setModalInfo("")}>
          {openRequestModal.modal === 'request' && (
            <div>
              {isRpcRequestPending ? <div>Approve or reject request using your wallet</div> : (
                rpcResult ? <div>
                  <div>Address: {rpcResult.address}</div>
                  <div>Method: {rpcResult.method}</div>
                  <div>Result: {rpcResult.result}</div>

                </div> : <></>
              )}
            </div>
          )
          }
        </Modal>
      </div>
      <div style={{ maxWidth: '660px' }}>
        <h6>Switch chains</h6>
        <div>Testnet only? <Switch defaultChecked onChange={toggleTestnets} /></div>
        <div>
          {chainOptions.map((chainId) => {
            return (
              <Blockchain
                key={chainId}
                chainId={chainId}
                chainData={chainData}
                onClick={handleChainSelectionClick}
                active={chains.includes(chainId)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WalletConnectInfo;
