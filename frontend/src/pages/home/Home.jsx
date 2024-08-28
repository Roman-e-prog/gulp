import React from 'react'
import * as styles from './home.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Output from '../../components/output/Output'
import Entry from '../../components/entry/Entry'
const Home = () => {
  return (
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.body}>
        <Entry/>
        <Output/>
      </div>
    </div>
  )
}

export default Home