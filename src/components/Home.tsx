import React from "react";
import millify from "millify";
import { Row, Col, Statistic, Typography } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loading from "./Loaidng";
type HomeProps = {};

const { Title } = Typography;

const Home: React.FC<HomeProps> = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10);

  if (isFetching) return <Loading />;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic
            title="Total Crypto Currencies"
            value={millify(1234, { precision: 1 })}
            suffix="+"
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Crypto Exchanges"
            value={millify(1234, { precision: 1 })}
            suffix="+"
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(1234, { precision: 1 })}
            suffix="+"
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(1234, { precision: 1 })}
            suffix="+"
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(1234, { precision: 1 })}
            suffix="+"
          />
        </Col>
      </Row>
    </>
  );
};
export default Home;
