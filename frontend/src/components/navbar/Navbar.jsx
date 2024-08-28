import React from 'react'
import * as styles from './navbar.module.scss'
const Navbar = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title} data-testid="title">Short test of Gulp with Webpack</h1>
    </div>
  )
}

export default Navbar