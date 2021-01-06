import React, { Component } from 'react'
import AppLayout from '../components/AppLayout'
import 'antd/dist/antd.css'
import Head from 'next/head';
import wrapper from '../configureStore'


const Blog = ({ Component }) => {
  return (
    <>
    <Head>
      <meta charSet='utf-8' />
      <title>blog</title>
    </Head>
    <AppLayout>
      <Component />
    </AppLayout>
    </>
  )
}

export default wrapper.withRedux(Blog)
