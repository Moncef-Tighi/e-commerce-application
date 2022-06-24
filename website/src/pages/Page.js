import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import { CircularProgress } from "@mui/material"
import classes from './Page.module.css'

const Page = function() {
    return (
        <>
            <Header/>
            <div className='container'>
                <section className='main_page'>
                <Suspense fallback={<CircularProgress className={classes.centerSpinner}/>}><Outlet/></Suspense>
                </section>
            </div>
        </>
        )
}

export default Page