import { Form, Input, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { DivForm, RightButton } from "../styled";
import { useDispatch , useSelector} from "react-redux";
import { signUpRequestAction } from "../reducers/user";
import {useRouter} from 'next/router'

const signup = () => {
  const dispatch = useDispatch();
  
  const {signUpResult, signUpError} = useSelector((state) => state.user)

  const router = useRouter(); 
  const [name, setName] = useState("");
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const [email, setEmail] = useState("");
  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const [password, setPassword] = useState("");
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const [passwordCheck, setPasswordCheck] = useState("");
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
  }, []);

  const [passwordError, setPasswordError] = useState(false);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    console.log(name,email,password,passwordCheck)
    dispatch(
      signUpRequestAction({
        name,
        email,
        password,
      })
    );
  }, [name, email, password, passwordCheck]);

  useEffect(() => {
    if (signUpResult) {
      alert(signUpResult)
      router.replace('/')
    }
  } ,[signUpResult])

  useEffect(() => {
    if (signUpError) {
      alert(signUpError)
    }
  } ,[signUpError])

  return (
    <DivForm>
      <Form
        style={{ display: "flex", flexDirection: "column" }}
        onFinish={onSubmit}
      >
        <div>
          <label htmlFor="user-name">이름</label>
          <Input
            name="user-name"
            value={name}
            onChange={onChangeName}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="user-email">이메일</label>
          <Input
            name="user-email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <Input
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="user-passwordCheck">비밀번호 확인</label>
          <Input
            name="user-passwordCheck"
            type="password"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
          {passwordError && (
            <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <br />
        <div>
          <RightButton style={{ float: "right" }}>취소</RightButton>
          <RightButton type="primary" htmlType="submit">
            확인
          </RightButton>
        </div>
      </Form>
    </DivForm>
  );
};

export default signup;
