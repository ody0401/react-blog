import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import wrapper from "../../configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Typography, Input, Form, Button } from "antd";

import Comment from "../../components/Comment";
import { RightButton } from "../../styled";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import {
  ADD_COMMENT_REQUEST,
  LOAD_COMMENT_REQUEST,
  LOAD_POST_INFO_REQUEST,
} from "../../reducers/post";

const { Title } = Typography;

const post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.loadPostInfoResult);
  const userId = useSelector((state) => state.user.loadMyInfoResult?.id);
  const { addCommentDone, loadCommentResult, addCommentError } = useSelector(
    (state) => state.post
  );
  const postId = posts.id;
  const image = { ...posts.Images };
  const { id } = router.query;
  const defaultImage = "nadiya-ploschenko-rQLY5fKHOrk-unsplash.jpg";

  const [comment, setComment] = useState("");
  const onChangeComment = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { comment, postId, userId },
    });
  }, [comment, postId, userId]);

  useEffect(() => {
    if (addCommentDone) {
      dispatch({
        type: LOAD_COMMENT_REQUEST,
        data: postId,
      });
    }
  }, [addCommentDone]);

  useEffect(() => {
    if (addCommentError) {
      alert(addCommentError)
    }
  }, [addCommentError]);

  if (Object.keys(image).length == 0) {
    return (
      <div style={{ width: "70%", margin: "3rem auto" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          {" "}
          {posts.title}{" "}
        </Title>
        <hr />
        <Row gutter={16}>
          <Col xs={24} md={4}></Col>
          <Col xs={24} md={16}>
            <div style={{ textAlign: "center" }}>
              <img
                style={{ width: "50%", height: "55vh" }}
                src={`http://localhost:3065/${defaultImage}`}
              />
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
              <Title level={4}>{posts.content}</Title>
            </div>
            <br />
            <br />
            <div>
              <label>댓글</label>
              <hr />
              <div>
                {loadCommentResult && (
                  <Comment loadCommentResult={loadCommentResult} />
                )}
              </div>
              <div>
                <Form onFinish={onSubmit}>
                  <br />
                  <Input.TextArea
                    name="comment"
                    value={comment}
                    onChange={onChangeComment}
                    required
                  />
                  <br />
                  <div style={{ marginTop: "5px" }}>
                    <RightButton type="primary" htmlType="submit">
                      댓글달기
                    </RightButton>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
          <Col xs={24} md={4}></Col>
        </Row>
      </div>
    );
  } else {
    return (
      <div style={{ width: "80%", margin: "3rem auto" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          {" "}
          {posts.title}{" "}
        </Title>
        <hr />
        <Row gutter={16}>
          <Col xs={24} md={4}></Col>
          <Col xs={24} md={16}>
            <div style={{ textAlign: "center" }}>
              <img
                style={{ width: "50%", height: "55vh" }}
                src={`http://localhost:3065/${image[0].src}`}
              />
            </div>
            <br />
            <div>
              <Title level={4} style={{ textAlign: "center" }}>
                {posts.content}
              </Title>
            </div>
            <br />
            <br />
            <div>
              <label>댓글</label>
              <hr />
              <div>
                {loadCommentResult && (
                  <Comment loadCommentResult={loadCommentResult} />
                )}
              </div>
              <div>
                <Form onFinish={onSubmit}>
                  <br />
                  <Input.TextArea
                    name="comment"
                    value={comment}
                    onChange={onChangeComment}
                    required
                  />
                  <br />
                  <div style={{ marginTop: "5px" }}>
                    <RightButton type="primary" htmlType="submit">
                      댓글달기
                    </RightButton>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
          <Col xs={24} md={4}></Col>
        </Row>
      </div>
    );
  }
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST_INFO_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch({
      type: LOAD_COMMENT_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default post;
