import React from 'react'
import styles from "@organismsCSS/staticPages/staticPages.module.scss";
import { Button } from 'antd';
import Image from 'next/image'
import Router from 'next/router';

function NotFound() {
    return (
        <div className={styles.pageWrap}>
            <div className={styles.contentWrap}>
                <div className={styles.imageWrap}>
                    <Image src="/assets/images/500.png" alt="me" width="300" height="300" />
                </div>
                <div className={styles.textWrap}>
                    Server Error Occured
                </div>
                <div className={styles.footerBtnWrap}>
                    <Button type="link" onClick={() => Router.push('/')}>
                        Go to dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NotFound