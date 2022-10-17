import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import style from './Preloader.module.css'

export const Preloader = () => {
    return <CircularProgress className={style.preloader} thickness={5}/>
}

