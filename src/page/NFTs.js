import React, { useState, useEffect } from 'react';
import axios from "axios";
import NavBar from "../components/NavBar";
import { FaCheckCircle } from "react-icons/fa";
import SliderComponent from '../components/SliderComponent';
const NFTs = () => {
  const [collectionsData, setCollectionsData] = useState([]);
    const topNfts = ["boredapeyachtclub","mutant-ape-yacht-club","azuki","pudgypenguins","palioai-aura","memelandcaptainz", "mocaverse", "memelandpotatoz", "degods", "lasogette"];

  useEffect(() => {
    const fetchData = async () => {
        try {
          const allCollectionData = [];
    
          for (const collectionName of topNfts) {
            const response = await axios.get(`https://api.opensea.io/api/v2/collections/${collectionName}`, {
              headers: {
                'x-api-key': '688dbfe2c2974d95b9c63d738de02fdb'
              }
            });
            allCollectionData.push(response.data);
          }
    
          setCollectionsData(allCollectionData);
        } catch (error) {
          console.error('Error fetching collections:', error);
        }
      };
    
      fetchData();
  }, [topNfts]);

  return (
    <>
      <NavBar />
      <div className="flex max-w-7xl mx-auto mt-8 mb-8">
        <div className="flex-1 pr-8">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Better prices. More listings</h1>
          <p className="mt-4 max-w-2xl font-light text-gray-500 md:text-lg lg:text-xl dark:text-gray-400">Trending NFT collections.</p>
        </div>
        <div className="flex-1 pl-8">
          <SliderComponent arrImages={collectionsData} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total supply</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opensea URL</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collectionsData.map((collection, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{index + 1}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={collection.image_url} alt={collection.name} />
                    </div>
                    <div className="ml-4 flex items-center">
                        <div className="text-sm font-medium text-gray-900">{collection.name}</div>
                        {collection.safelist_status === "verified" && (
                            <div className="text-sm text-green-500 ml-3">
                            <FaCheckCircle className="inline-block mr-1" />
                            </div>
                        )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{collection.total_supply}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href={collection.opensea_url} target="_blank" rel="noopener noreferrer" className="underline">OpenSea</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NFTs;
