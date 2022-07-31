import * as React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";

import Loading from "./Loaidng";
import { useGetExchangesQuery } from "../services/cryptoApi";

const { Text } = Typography;
const { Panel } = Collapse;

interface ExchangesProps {
  uuid: string;
  rank: number;
  iconUrl: string | null;
  name: string;
  "24hVolume": string;
  numberOfMarkets: number;
  marketShare: string;
  description?: string;
  exchangeScore: string;
  numberOfCoins: number;
}

const mockExchanges: Array<ExchangesProps> = [
  {
    uuid: "-zdvbieRdZ",
    name: "Binance",
    iconUrl: "https://cdn.coinranking.com/mDTK5qrmq/binance.svg",
    numberOfMarkets: 1644,
    "24hVolume": "15506110852",
    rank: 1,
    marketShare: "12.22",
    exchangeScore: "9.9",
    numberOfCoins: 403,
  },
  {
    uuid: "XHp8eCjIDc",
    name: "Coinbase Exchange",
    iconUrl: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png",
    numberOfMarkets: 474,
    "24hVolume": "3546590700",
    rank: 2,
    marketShare: "10.92",
    exchangeScore: "8.7",
    numberOfCoins: 159,
  },
];

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery(50);
  const exchangesList = data?.data?.exchanges;
  if (isFetching) return <Loading />;

  return (
    <>
      <Row style={{ marginBottom: "12px" }}>
        <Col span={4}>Exchanges</Col>
        <Col span={4}>Exchange Score</Col>
        <Col span={4}>24h Trade Volume</Col>
        <Col span={4}># Markets</Col>
        <Col span={4}># Coins</Col>
        <Col span={4}>Change</Col>
      </Row>
      <Row>
        {mockExchanges?.map((exchange: ExchangesProps) => (
          <Col span={24} key={exchange.uuid}>
            <Collapse>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={
                  <Row key={exchange.uuid} className="exchanges-row">
                    <Col span={4}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchange?.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={4}>{millify(+exchange?.exchangeScore)}</Col>
                    <Col span={4}>${millify(+exchange["24hVolume"])}</Col>
                    <Col span={4}>{millify(exchange?.numberOfMarkets)}</Col>
                    <Col span={4}>{millify(exchange?.numberOfCoins)}</Col>
                    <Col span={4}>{millify(+exchange?.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
        {!exchangesList?.length && (
          <h1 style={{ marginTop: "32px" }}>
            This endpoint is disabled for your subscription
          </h1>
        )}
      </Row>
    </>
  );
};

export default Exchanges;
