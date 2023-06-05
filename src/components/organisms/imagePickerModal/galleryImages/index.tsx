import BgImageRenderer from '@molecules/bgImageRenderer';
import { theme } from 'antd';
import React, { Fragment, useState } from 'react'
import { imagesList, imagesTypes } from 'src/data/backgroundImages'
import styles from './galleryImages.module.scss'

const configSample = {
    type: 'small'
}
function GalleryImages({ config, setSelectedImage, selectedImage }) {

    const { token } = theme.useToken();
    const [activeCategory, setActiveCategory] = useState(imagesTypes[config.type][0]);

    return (
        <div className={styles.galleryImagesWrap}>
            <div className={styles.categoriesWrap} style={{ background: token.colorBgBase }}>
                {imagesTypes[config.type].map((category, i) => {
                    return <div className={styles.categoryName} key={i}
                        onClick={() => setActiveCategory(category)}
                        style={{ color: activeCategory == category ? token.colorPrimary : token.colorText }}>
                        {category}
                    </div>
                })}
            </div>
            <div className={styles.imagesWrap}>
                {imagesList[config.type][activeCategory].map((imageData, i) => {
                    return <Fragment key={i}>
                        <BgImageRenderer
                            active={selectedImage?.src == imageData}
                            imageData={{ src: imageData }}
                            onSelect={(image) => setSelectedImage(image)}
                            styleProps={{ height: '100px', column: 3 }}
                        />
                    </Fragment>
                })}
            </div>
        </div>
    )
}

export default GalleryImages