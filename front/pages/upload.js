import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import wrapper from "../configureStore";
import { END } from "redux-saga";
import { Form, Button, Input } from "antd";
import { DivForm } from "../styled";
import { useDispatch, useSelector } from "react-redux";
import { ADD_POST_REQUEST, UPLOAD_IMAGE_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { PlusOutlined } from "@ant-design/icons";
import { RightButton } from "../styled";
import { useRouter } from "next/router";

const upload = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { uploadImageResult, addPostDone } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.loadMyInfoResult?.id);

  const [title, setTitle] = useState("");
  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const [content, setContent] = useState("");
  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImageUpload = useCallback((e) => {
    console.log(e.target.files[0]);
    const imageData = new FormData();
    imageData.append("image", e.target.files[0]);
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: imageData,
    });
  }, []);

  const onClickCancel = useCallback(() => {
    const result = confirm("게시물 작성을 취소하시겠습니까?");
    if (result) {
      router.push("/");
    }
  }, []);

  const onSubmit = useCallback(() => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (uploadImageResult) {
      formData.append("image", uploadImageResult.filepath);
    }
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [title, content, uploadImageResult]);

  useEffect(() => {
    if (uploadImageResult) console.log(uploadImageResult.filepath);
  }, [uploadImageResult]);

  useEffect(() => {
    if (addPostDone) {
      router.replace("/");
    }
  }, [addPostDone]);

  useEffect(() => {
    if (!id) {
      alert("로그인이 필요합니다.");
      router.replace("/");
    }
  }, [id]);

  if (id) {
    return (
      <DivForm>
        <Form
          style={{ width: "700px" }}
          encType="multipart/form-data"
          onFinish={onSubmit}
        >
          <div>
            <input
              type="file"
              name="image"
              multiple
              hidden
              ref={imageInput}
              onChange={onChangeImageUpload}
            />
            <Button
              style={{ width: "45%", height: "32vh" }}
              onClick={onClickImageUpload}
            >
              <PlusOutlined style={{ fontSize: "40px", color: "#666" }} />
              <br />
              이미지 업로드
            </Button>
            {uploadImageResult && (
              <img
                style={{ width: "45%", height: "32vh", marginLeft: "5px" }}
                src={`http://localhost:3065/${uploadImageResult.filepath}`}
              />
            )}
          </div>
          <br />
          <div>
            <label htmlFor="title">제목</label>
            <Input
              name="title"
              value={title}
              onChange={onChangeTitle}
              required
            />
            <br />
            <br />
            <label htmlFor="content">내용</label>
            <Input.TextArea
              name="content"
              value={content}
              onChange={onChangeContent}
              required
            />
          </div>
          <br />
          <div>
            <RightButton onClick={onClickCancel}>취소</RightButton>
            <RightButton type="primary" htmlType="submit">
              확인
            </RightButton>
          </div>
        </Form>
      </DivForm>
    );
  } else {
    return <div></div>
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default upload;
