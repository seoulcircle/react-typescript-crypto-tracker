import { useParams } from "react-router-dom";

interface CoinParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<CoinParams>();

  return (
    <div>
      <h1>Coin : {coinId}</h1>
    </div>
  );
}

export default Coin;
