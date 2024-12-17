import {getUrl, MetaData} from "@enonic/nextjs-adapter";
import Link from 'next/link';
import React from 'react'
import styles from './Header.module.css';

export interface HeaderProps {
    title: string;
    logoUrl: string;
    meta: MetaData;
}


const Header = ({title, logoUrl, meta}: HeaderProps) => {

    return <></>
};

export default Header
