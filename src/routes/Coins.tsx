import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
  a {
    display: flex;
    align-items: center;
    padding: 10px;
    transition: color 0.2s;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Image = styled.img`
  width: 35px;
  height: 35px;
  margin: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coincap.io/v2/assets");
      const json = await response.json();
      setCoins(json.data);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        "LOADING..."
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{ pathname: `/${coin.id}`, state: { name: coin.name } }}
              >
                <Image
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
