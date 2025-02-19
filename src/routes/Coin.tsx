import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchInfoData, fetchPriceData } from "../api";

interface CoinParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoParam {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceParam {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
  max-width: 300px;
`;

const Header = styled.header`
  height: 5vh;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 35px;
  font-weight: bold;
`;

const CoinInfo = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8px;
  border-radius: 10px;
  margin: 20px 0;
`;

const CoinInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span:first-child {
    font-size: 13px;
    margin-bottom: 5px;
  }
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  background-color: black;
  padding: 7px 0;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Description = styled.p`
  line-height: normal;
`;

function Coin() {
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoParam>();
  // const [price, setPrice] = useState<PriceParam>();
  const { coinId } = useParams<CoinParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoParam>(
    ["info", coinId],
    () => fetchInfoData(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceParam>(
    ["price", coinId],
    () => fetchPriceData(coinId)
  );

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     setInfo(infoData);

  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setPrice(priceData);

  //     setLoading(false);
  //   })();
  // }, [coinId]);
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        "LOADING..."
      ) : (
        <div>
          <CoinInfo>
            <CoinInfoItem>
              <span>RANK :</span>
              <span>{infoData?.rank}</span>
            </CoinInfoItem>
            <CoinInfoItem>
              <span>SYMBOL :</span>
              <span>{infoData?.symbol}</span>
            </CoinInfoItem>
            <CoinInfoItem>
              <span>OPEN SOURCE :</span>
              <span>{infoData?.open_source ? "YES" : "NO"}</span>
            </CoinInfoItem>
          </CoinInfo>
          <Description>{infoData?.description}</Description>
          <CoinInfo>
            <CoinInfoItem>
              <span>TOTAL SUPPLY :</span>
              <span>{priceData?.total_supply}</span>
            </CoinInfoItem>
            <CoinInfoItem>
              <span>MAX SUPPLY :</span>
              <span>{priceData?.max_supply}</span>
            </CoinInfoItem>
          </CoinInfo>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/chart`}>
              <Chart />
            </Route>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
          </Switch>
        </div>
      )}
    </Container>
  );
}

export default Coin;
