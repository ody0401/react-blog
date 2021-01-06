import React, { useCallback, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";

const ItemRight = styled(Menu.Item)`
  float: right;
`;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { logOutDone } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.loadMyInfoResult?.id);

  const onClickLogOut = useCallback(() => {
    const result = confirm("로그아웃 하시겠습니까?");
    if (result) {
      dispatch({
        type: LOG_OUT_REQUEST,
      });
    }
  }, []);

  useEffect(() => {
    if (logOutDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
    }
  }, [logOutDone]);

  if (!id) {
    return (
      <>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/">
              <a>홈페이지</a>
            </Link>
          </Menu.Item>
          <Menu.Item style={{float:'right'}}>
            <Link href="/login">
              <a>로그인</a>
            </Link>
          </Menu.Item>
          <Menu.Item style={{float:'right'}}>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </Menu.Item>
        </Menu>
        {children}
      </>
    );
  } else {
    return (
      <>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/">
              <a>홈페이지</a>
            </Link>
          </Menu.Item>
          <Menu.Item style={{float:'right'}} onClick={onClickLogOut}>
            <div>로그아웃</div>
          </Menu.Item>
          <Menu.Item style={{float:'right'}}>
            <Link href="/upload">
              <a>업로드</a>
            </Link>
          </Menu.Item>
        </Menu>
        {children}
      </>
    );
  }
};

export default AppLayout;
