import React, { useEffect } from "react";
import { Col, Row, Typography, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_REQUEST } from "../reducers/post";
import {LOAD_MY_INFO_REQUEST} from '../reducers/user';
import axios from 'axios';
import {END} from 'redux-saga';
import wrapper from '../configureStore';
import Link from 'next/link';

const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch();

  const { loadPostResult } = useSelector((state) => state.post);

  if (loadPostResult) {
    const posts = loadPostResult.map((v, i) => {
      if (v.Images[0]) {
        return (
          <Col key={i} ms={24} md={6}>
            <Link href={`post/${v.id}`}><a>
            <Card
              hoverable
              cover={<img style={{ height: 300 }} src={`http://localhost:3065/${v.Images[0].src}`} />}
            >
              <Card.Meta title={v.title} />
            </Card>
            </a></Link>
          </Col>
        );
      } else {
        const img = "nadiya-ploschenko-rQLY5fKHOrk-unsplash.jpg";
        return (
          <Col key={i} ms={24} md={6}>
            <Link href={`post/${v.id}`}><a>
            <Card
              hoverable
              cover={<img style={{ height: 300 }} src={`http://localhost:3065/${img}`} />}
            >
              <Card.Meta title={v.title} />
            </Card>
            </a></Link>
          </Col>
        );
      }
    });
    return (
      <div style={{ width: "95%", margin: "3rem auto" }}>
        <Title level={2}>  first Project blog </Title>
        <hr />

        <Row gutter={[16,16]}>{posts}</Row>
      </div>
    );
  } else {
    return (
      <div style={{ width: "95%", margin: "3rem auto" }}>
        <Title level={2}> first Project blog </Title>
        <hr />

        <Row gutter={16}></Row>
      </div>
    );
  }
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Home;
