import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useContext } from 'react'
import { authUserContext } from '@/context/AuthUserContext'
import { Card } from '@mui/material'


export default function Home() {
  return (
    <>
      <Card>Hello</Card>
    </>
  )
}
