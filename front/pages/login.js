import React, { useCallback, useEffect, useState } from 'react'
import { Form, Input} from 'antd'
import {DivForm, RightButton} from '../styled'
import {useDispatch, useSelector} from 'react-redux'
import {logInRequestAction} from '../reducers/user';
import {useRouter} from 'next/router'


const login = () => {
  const dispatch = useDispatch();

  const {logInResult, logInError} = useSelector((state) => state.user)

  const router = useRouter();

  const [email, setEmail] = useState('');
  const onChangeEmail = useCallback((e)=> {
    setEmail(e.target.value)
  },[])

  const [password, setPassword] = useState('');
  const onChangePassword = useCallback((e)=> {
    setPassword(e.target.value)
  },[])

  const onSubmit = useCallback(() => {
    console.log(email,password)
    dispatch(logInRequestAction({
      email,
      password
    }))
  }, [email,password])

  useEffect(() => {
    if(logInResult){
      alert(logInResult)
      router.replace('/')
    }
  }, [logInResult])

  useEffect(() => {
    if(logInError){
      alert(logInError)
    }
  }, [logInError])


  return (
    <DivForm>
      <Form style={{ display: "flex", flexDirection : "column" }} onFinish={onSubmit}>
        <label htmlFor='user-email'>이메일</label>
        <Input name='user-email' value={email} onChange={onChangeEmail} required />
        <br />
        <label htmlFor='user-password'>비밀번호</label>
        <Input name='user-password' type='password' value={password} onChange={onChangePassword} required />
        <br />
        <div>
          <RightButton>취소</RightButton>
          <RightButton type='primary' htmlType='submit' >확인</RightButton>
        </div>
      </Form>
    </DivForm>
  )
}

export default login
