import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useStateContext } from '../context'
import { CustomButton } from '../components'
import { calculateBarPercentage, daysLeft } from '../utils'
import { ethers } from 'ethers'
import { thirdweb } from '../assets'

const CampaignDetails = () => {
  const { state } = useLocation();
  const { getDonations, contract, address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const remainingDays = daysLeft(state.deadline);

  return (
    <div>
      {isLoading && 'Loading...'}

      <div className='w-full flex md'>

      </div>
    </div>
  )
}

export default CampaignDetails