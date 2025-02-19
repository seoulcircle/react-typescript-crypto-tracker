import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface CoinParams {
  coinId: string;
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
`;

function Coin() {
  const { coinId } = useParams<CoinParams>();
  const [loading, setLoading] = useState(true);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        "LOADING..."
      ) : (
        <div>
          <h1>Coin : {coinId}</h1>
        </div>
      )}
    </Container>
  );
}

export default Coin;
