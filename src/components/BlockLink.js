import React from 'react'
import { Link } from 'react-router-dom'

export default function BlockLink({blocknum}) {
    const link = `../b/${blocknum}`
    return (
        <Link to={link}>{blocknum}</Link>
    )
}
