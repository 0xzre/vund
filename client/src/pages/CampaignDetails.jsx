import { useStateContext } from '../context'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CountBox, CustomButton } from '../components'
import { calculateBarPercentage, daysLeft, countAddressCampaigns } from '../utils'

const CampaignDetails = () => {
  const { state } = useLocation();
  const { donate, getDonations, contract, getCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [campaigns, setCampaigns] = useState([])
  const remainingDays = daysLeft(state.deadline);

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  const fetchCampaigns = async () => {
    const res = await getCampaigns();
    setCampaigns(res);
  }

  useEffect(() => 
    {
      if(contract) {
        fetchDonators();
        fetchCampaigns();
      }
    },[]
  )    

  const handleDonate = async (e) => {
    e.preventDefault();

    if (!(amount > 0 && amount !== '')) {
      alert('Please input the correct amount');
      return;
    }

    setIsLoading(true);
    const res = await donate(state.pId, amount);
    console.log("res", res);
    setIsLoading(false);
  }

  return (
    <div>
      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt="campaign_image" className='w-full h-[410px] object-cover rounded-xl' />
          <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
            <div className='absolute h-full bg-[#4acd8d]' style={{width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
          <CountBox title={remainingDays > 0 ? 'Days left' : 'Days ago'} value={Math.abs(remainingDays)}/>
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected}/>
          <CountBox title="Total Backers" value={donators.length}/>
        </div>
      </div>

      <div className='mt-[60px] flex lg:flex-row flex-col gap-5 '>
        <div className='flex-[2] flex flex-col gap-[40px]'>
          <div className=''>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
              Creator
            </h4>
            <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px] ' >
              <div className={`w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#fb2778] cursor-pointer`} onClick={() => openInNewTab(`https://etherscan.io/address/${state.owner}`)}>
                <div className='w-[60%] h-[60%] object-contain' />
              </div>

              <div>
                <h4 className='font-epilogue font-semibold text-[14px] text-white break-all cursor-pointer' onClick={() => openInNewTab(`https://etherscan.io/address/${state.owner}`)}>{state.owner}</h4>
                <p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'>{countAddressCampaigns(campaigns,state.owner)} Campaigns</p>
              </div>
            </div>
          </div>

          <div className=''>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
              Story
            </h4>
            <div className='mt-[20px]'>
              <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>{state.description}</p>
            </div>
          </div>

          <div className=''>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
              Donators
            </h4>
            <div className='mt-[20px] flex flex-col gap-4'>
              {donators.length > 0 ? donators.map((item, idx) => (
                <div key={`${item.donator}-${idx}`}
                  className='flex justify-between items-center gap-4'>
                  <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all'>{idx + 1}. {item.donator}</p>
                  <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all'>{item.donation} ETH</p>
                </div>
              )) : (
                <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>No donators yet, be the first!</p>
              )}
            </div>
          </div>
        </div>

        <div className='flex-1'>
          <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>
            Fund
          </h4>
          <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
            <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]'>
                {remainingDays > 0 ? 'Fund the campaign' : 'Funding has ended'}
            </p>
            <div className='mt-[30px]'>
                <input 
                  type="number"
                  placeholder='ETH 0.1'
                  step='0.01'
                  className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                  value={amount}
                  onChange={(e) => {setAmount(e.target.value)}}
                  disabled={remainingDays <= 0}
                   />
                  <div className='my-[20px] p-4 bg-[#13131a] rounded-[10px]'>
                    <h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-white'>Believe is all you need.</h4>
                    <p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]'>Support for no reward, just because it speaks to you.</p>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    {remainingDays > 0 ? (
                      <CustomButton
                        btnType='submit'
                        title='Fund Campaign'
                        styles='w-full bg-[#8c6dfd]'
                        handleClick={handleDonate}
                        isLoading={isLoading}
                        />
                    ) : (
                      <CustomButton
                        title="Fund Campaign"
                        styles='w-full bg-[#8c6dfd] cursor-not-allowed opacity-50'
                        disabled
                        />
                    )}
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails