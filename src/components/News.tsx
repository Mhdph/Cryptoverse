import React from "react";
import moment from "moment";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loading from "./Loaidng";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Currency } from "./Cryptocurrencies";

type NewsProps = {
  simplified?: boolean;
};

interface News {
  url: string;
  name: string;
  image?: { thumbnail?: { contentUrl?: string } };
  description: string;
  provider: Array<{
    name: string;
    image?: { thumbnail?: { contentUrl?: string } };
  }>;
  datePublished: string;
}

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News: React.FC<NewsProps> = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = React.useState("Cryptocurrency");
  const { data: cryptoList, isFetching: isCryptosFetching } =
    useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching: isNewsFetching } =
    useGetCryptoNewsQuery({
      newsCategory,
      count: simplified ? 6 : 18,
    });

  if (!cryptoNews?.value) return <Loading />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            loading={isCryptosFetching}
            value={newsCategory}
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              // @ts-ignore
              option?.children?.toLowercase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptoList?.data?.coins.map((currency: Currency) => (
              <Option value={currency.name} key={currency.name}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news: News) => (
        <Col xs={24} sm={12} lg={8} key={news.url}>
          <Card hoverable className="news-card">
            <div className="news-info">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt={news.name}
                  />
                </div>
              </a>
              <p>
                {news.description.length > 300
                  ? `${news.description.substring(0, 300)}...`
                  : news.description}
              </p>
            </div>
            <div className="provider-container">
              <div>
                <Avatar
                  src={
                    news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                  }
                  alt={news.provider[0].name}
                />
                <Text className="provider-name">{news.provider[0].name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf("h").fromNow()}</Text>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default News;
