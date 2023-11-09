import { useStateContext } from '../context'
import { useState, useEffect } from 'react'
import { DisplayCampaigns } from '../components'
import { daysLeft } from '../utils'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const res = await getCampaigns();
    setCampaigns(res);
    setIsLoading(false)
  }

  useEffect(() => {
    if(contract){
      fetchCampaigns();
    }
  }, [contract])

  return (
      <DisplayCampaigns
        title="Current Campaigns"
        isLoading={isLoading}
        campaigns={campaigns.filter((campaign) => (
          parseInt(daysLeft(campaign.deadline)) > 0
        ))}
        />
      
    )
}

export default Home