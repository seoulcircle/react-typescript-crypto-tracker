import React from "react";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
// import { useEffect, useState } from "react";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchInfoData, fetchPriceData } from "../api";
import { Helmet } from "react-helmet";
// import { FaArrowLeft } from "react-icons/fa";

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
  market_cap_rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: {
    ko: string;
    en: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
  };
  localization: {
    ko: string;
  };
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
  image: {
    large: string;
  };
}

interface TickersParam {
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
  max-width: 90vw;
`;

const Header = styled.header`
  height: 12vh;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 30px;
  margin: 20px;
`;
const CoinTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  img {
    width: 50px;
  }
`;
const NamePrice = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin-right: 5px;
  }
`;
const CurrentPrice = styled.span`
  font-weight: bold;
  margin-top: 10px;
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
  const { coinId } = useParams<CoinParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoParam>(
    ["info", coinId],
    () => fetchInfoData(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<TickersParam>(
    ["price", coinId],
    () => fetchPriceData(coinId)
  );

  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        {/* <Link to={`/`}>
          <FaArrowLeft />
        </Link> */}

        <Title>
          {state?.name ? (
            <CoinTitle>
              <img src={infoData?.image.large} alt={infoData?.name} />
              <NamePrice>
                <span>
                  {infoData?.name} {infoData?.localization.ko}
                </span>

                <CurrentPrice>
                  ${infoData?.market_data.current_price.usd}
                </CurrentPrice>
              </NamePrice>
            </CoinTitle>
          ) : loading ? (
            "Loading..."
          ) : (
            infoData?.name
          )}
        </Title>
      </Header>
      {loading ? (
        "LOADING..."
      ) : (
        <div>
          <CoinInfo>
            <CoinInfoItem>
              <span>RANK :</span>
              <span>{infoData?.market_cap_rank}</span>
            </CoinInfoItem>
            <CoinInfoItem>
              <span>SYMBOL :</span>
              <span>{infoData?.symbol}</span>
            </CoinInfoItem>
          </CoinInfo>
          <Description>{infoData?.description.en}</Description>
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
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
          </Switch>
        </div>
      )}
    </Container>
  );
}

export default Coin;
