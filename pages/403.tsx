import React from 'react'
import styles from "@organismsCSS/staticPages/staticPages.module.scss";
import { Button, Result } from 'antd';
import Image from 'next/image'
import Router from 'next/router';

function Unauthorised() {
    return (
        <div className={styles.pageWrap}>
            <div className={styles.contentWrap}>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary" onClick={() => Router.push('/login')}>Login to dashboard</Button>}
                />
                {/* <div className={styles.imageWrap}>
                    <Image src="/assets/images/401.png" alt="me" width="300" height="300" />
                </div>
                <div className={styles.textWrap}>
                    You'r unauhthorised
                </div>
                <div className={styles.footerBtnWrap}>
                    <Button type="link" onClick={() => Router.push('/login')}>
                        Login to dashboard
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

export default Unauthorised