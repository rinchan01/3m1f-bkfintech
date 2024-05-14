import { TokenItemType } from '@oraichain/oraidex-common';
import { useQuery } from '@tanstack/react-query';
import { fetchTokenInfo, getPairAmountInfo } from 'rest/api';
import { PoolDetail } from 'types/pool';

export const useGetPairInfo = ({ token1, token2, info: pairInfoData }: PoolDetail) => {
  const { data: lpTokenInfoData, refetch: refetchLpTokenInfoData } = useQuery(
    ['token-info', pairInfoData],
    () =>
      fetchTokenInfo({
        contractAddress: pairInfoData.liquidityAddr
      } as TokenItemType),
    {
      enabled: !!pairInfoData,
      refetchOnWindowFocus: false,
      keepPreviousData: true
    }
  );

  const { data: pairAmountInfoData, refetch: refetchPairAmountInfo } = useQuery(
    ['pair-amount-info', token1, token2],
    () => {
      return getPairAmountInfo(token1, token2);
    },
    {
      enabled: !!token1 && !!token2,
      refetchOnWindowFocus: false,
      refetchInterval: 15000
    }
  );

  return { lpTokenInfoData, pairAmountInfoData, refetchPairAmountInfo, refetchLpTokenInfoData };
};
