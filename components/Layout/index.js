import React from "react"
import { useRouter } from "next/router"
import Transition from "../Transition"
import Header from "../Header"
import Footer from "../Footer"
import styles from "./layout.module.css"

const Layout = ({ filters, pages, children }) => {
  const router = useRouter()
  return (
    <div className={styles.layout}>
      <Header />
      <Transition location={router.pathname}>
        <main className={styles.main}>
          {children}
        </main>
      </Transition>
    </div>
  )
}

export default Layout
