import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
  max-width: 90vw;
`;

const Header = styled.header`
  height: 5vh;
  text-align: center;
  padding-top: 10px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 28px;
  font-weight: bold;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;
    transition: color 0.2s;
    border-radius: 5px;
  }
  &:hover {
    a {
      background-color: ${(props) => props.theme.textColor};
      color: ${(props) => props.theme.bgColor};
      transition: color 0.2s;
    }
  }
`;

const ChartInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
  font-size: small;
`;

const IndexNumber = styled.span`
  font-weight: bold;
`;
const Image = styled.img`
  width: 25px;
  height: 25px;
  margin: 10px;
`;

const BasicInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PriceInfo = styled.div`
  display: flex;
  span {
    margin-right: 20px;
  }
`;

const ChangePercent = styled.span<{ isPositive: boolean }>`
  color: ${(props) =>
    props.isPositive
      ? props.theme.mainColor
      : props.theme.accentColor}; /* 양수는 파란색, 음수는 빨간색 */
  font-weight: bold;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  image: string;
  current_price: number;
  market_cap_change_percentage_24h: number;
}
function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDarkAtom}>Toggle</button>
      </Header>
      {isLoading ? (
        "LOADING..."
      ) : (
        <CoinList>
          <Coin>
            <ChartInfo>
              <BasicInfo>
                <span>거래량 종목 순위</span>
              </BasicInfo>
              <PriceInfo>
                <span>현재가</span>
                <span>등락률</span>
              </PriceInfo>
            </ChartInfo>
          </Coin>
          {data?.map((coin, index) => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
              >
                <BasicInfo>
                  <IndexNumber>{index + 1}. </IndexNumber>
                  <Image src={coin.image} />
                  {coin.name}
                </BasicInfo>
                <PriceInfo>
                  <span>${coin.current_price}</span>
                  <ChangePercent
                    isPositive={coin.market_cap_change_percentage_24h > 0}
                  >
                    {coin.market_cap_change_percentage_24h.toFixed(2)}%
                  </ChangePercent>
                </PriceInfo>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
