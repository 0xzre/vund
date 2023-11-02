import React from 'react'
import { useState, useEffect } from 'react'
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaign } = useStateContext();
  return (
    <div>Home</div>
  )
}

export default Home