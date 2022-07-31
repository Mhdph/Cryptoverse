import React from "react";
import millify from "millify";
import { Row, Col, Statistic, Typography } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loading from "./Loaidng";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
type HomeProps = {};

const { Title } = Typography;

const Home: React.FC<HomeProps> = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10);
  const globalData = data?.data?.stats;

  if (isFetching) return <Loading />;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="Total Crypto Currencies" value={globalData.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Crypto Exchanges"
            value={millify(globalData.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalData.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalData.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalData.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};
export default Home;
