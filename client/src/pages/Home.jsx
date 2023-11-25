import { useStateContext } from '../context'
import { useState, useEffect } from 'react'
import { DisplayCampaigns } from '../components'
import { daysLeft } from '../utils'
import { useParams } from 'react-router-dom'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { contract, getCampaigns } = useStateContext();
  const { searchParam } = useParams();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const res = await getCampaigns();
    if(res === undefined) return;
    if(searchParam === undefined) {
      setCampaigns(res);
      setIsLoading(false);
      return;
    }
    setCampaigns(res.filter((campaign) => (
      campaign.title.toLowerCase().includes(searchParam.toLowerCase())
    ))
    );
    setIsLoading(false);
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
        ))
        }
        />
      
    )
}

export default Home