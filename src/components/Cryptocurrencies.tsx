import React, { useEffect } from "react";
import { Row, Col, Statistic, Typography, Card, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loading from "./Loaidng";
import { Link } from "react-router-dom";
import millify from "millify";
type CryptocurrenciesProps = {
  simplified?: boolean;
};

interface Currency {
  id: React.Key | null | undefined;
  name: string;
  rank: number;
  iconUrl: string;
  price: number;
  marketCap: number;
  change: number;
}

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptolist, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = React.useState(cryptolist?.data?.coins);
  const [serachTerm, setSearchTerm] = React.useState("");
  if (isFetching) return <Loading />;

  useEffect(() => {
    const filterdedCryptos = cryptolist?.data?.coins.filter((coin: any) => {
      return coin.name.toLowerCase().includes(serachTerm.toLowerCase());
    });

    setCryptos(filterdedCryptos);
  }, [cryptolist, serachTerm]);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency: Currency) => (
          <Col className="crypto-card" xs={24} lg={6} key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Price: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change * 10)} %</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Cryptocurrencies;
