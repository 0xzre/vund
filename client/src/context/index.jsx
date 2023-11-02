import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x48fd41663F337bfFe4A0C899853a764441d4Ab8D');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign(
                {
                    args: [
                        
                            address, //owner
                            form.title,
                            form.description,
                            form.target,
                            new Date(form.deadline).getTime(),
                            form.image
                        
                    ],
                }
            )

            console.log("contract call success", data);
            
        } catch (error) {
            console.log("contract call error", error);
        }
    }

    const getCampaigns = async () => {
        const Campaign = await contract.call("getCampaigns");

        console.log(Campaign);
    }

    return (
        <StateContext.Provider 
            value={{ 
                address, 
                contract,
                connect,
                createCampaign:publishCampaign, 
                getCampaigns,
            }}
        >
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);