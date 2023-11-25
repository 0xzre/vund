import { useStateContext } from '../context'
import { useState, useEffect } from 'react'
import { DisplayCampaigns } from '../components'
import { daysLeft } from '../utils'
import { useSearchParams } from 'react-router-dom'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { contract, getCampaigns } = useStateContext();
  const [searchParams] = useSearchParams()

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const res = await getCampaigns();
    if(res === undefined) return;
    if(searchParams.get('search') === undefined) {
      setCampaigns(res);
      setIsLoading(false);
      return;
    }
    setCampaigns(res.filter((campaign) => {
        const searchKey = searchParams.get('search')
        if(searchKey === null) return true;
        return campaign.title.toLowerCase().includes(searchKey.toLowerCase())
      }
    )
    );
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract){
      fetchCampaigns();
    }
  }, [contract, searchParams])

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