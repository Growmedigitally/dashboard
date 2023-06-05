import React, { Fragment, useEffect, useState } from 'react'
import styles from './searchImage.module.scss'
import { Input, Result, Segmented, theme } from 'antd';
import BgImageRenderer from '@molecules/bgImageRenderer';
import { useAppDispatch } from '@hook/useAppDispatch';
import { getLoaderState, toggleLoader } from '@reduxStore/slices/loader';
import { getPexelsImagesBySearchQuery } from 'pages/apiService/pexels';
import { getUnsplashImagesBySearchQuery } from 'pages/apiService/unsplash';
import { useAppSelector } from '@hook/useAppSelector';
import { BACKGROUND_IMAGES_ORIENTATIONS } from '@constant/common';
import { getPixabayImagesBySearchQuery } from 'pages/apiService/pixabay';
import { FaUnsplash } from 'react-icons/fa';
import { RiPixelfedLine } from 'react-icons/ri';
import { SiPixiv } from 'react-icons/si'
const { Search } = Input;

const SEARCH_SOURCE_TYPES = [
    { name: 'Unsplash', icon: <FaUnsplash />, themeColor: 'black', apiFunction: getUnsplashImagesBySearchQuery },
    { name: 'Pexels', icon: <RiPixelfedLine />, themeColor: '#00a181', apiFunction: getPexelsImagesBySearchQuery },
    { name: 'Pixabay', icon: <SiPixiv />, themeColor: '#0abe6e', apiFunction: getPixabayImagesBySearchQuery },
]

function SearchImage({ config, setSelectedImage, selectedImage }) {

    const { token } = theme.useToken();
    const dispatch = useAppDispatch()
    const [fetchedImages, setFetchedImages] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [isError, setIsError] = useState(false);
    const isLoading = useAppSelector(getLoaderState)
    const [activeSearchSourceTab, setActiveSearchSourceTab] = useState(SEARCH_SOURCE_TYPES[0]);

    useEffect(() => {
        onSearchImages(searchQuery);
    }, [activeSearchSourceTab])

    const getSegmentOptions = () => {
        return SEARCH_SOURCE_TYPES.map((option) => {
            return {
                label: <div style={{ color: activeSearchSourceTab.name == option.name ? token.colorPrimary : 'inherit' }}
                    className={`${styles.segmentItem} ${activeSearchSourceTab.name == option.name ? styles.active : ''}`}>
                    <div className={styles.name}>{option.name}</div>
                </div>,
                value: option.name
            }
        })
    }

    const onSearchImages = (query) => {
        setIsError(false)
        if (query) {
            dispatch(toggleLoader(true));
            activeSearchSourceTab.apiFunction(query, BACKGROUND_IMAGES_ORIENTATIONS.LANDSCAPE, 1).then((imagesRes: any) => {
                console.log(imagesRes)
                setFetchedImages(imagesRes)
                dispatch(toggleLoader(false));
            })
        } else {
            setIsError(true);
        }
    }

    const onClickOptionsTab = (tab: any) => {
        setActiveSearchSourceTab(tab);
    }

    return (
        <div className={styles.serachImagesWrap}>
            <div className={styles.headerWrap}>
                <div className={styles.actionsWrap}>
                    <div className={styles.segmentWrap}>
                        <Segmented
                            size="small"
                            block={true}
                            value={activeSearchSourceTab.name}
                            defaultValue={SEARCH_SOURCE_TYPES[0].name}
                            onChange={(tab: any) => onClickOptionsTab(SEARCH_SOURCE_TYPES.find(i => i.name == tab))}
                            options={getSegmentOptions()}
                        />
                    </div>
                    <div className={styles.searchInputWrap}>
                        <Search placeholder="Enter image details"
                            loading={isLoading}
                            status={`${isError ? 'error' : ''}`}
                            onSearch={() => onSearchImages(searchQuery)}
                            enterButton="Search"
                            allowClear
                            size="middle"
                            value={searchQuery}
                            onPressEnter={() => onSearchImages(searchQuery)}
                            onChange={(e) => { setIsError(false); setSearchQuery(e.target.value) }}
                        />
                    </div>
                </div>
                <div className={styles.headingWrap}>
                    Search free images using
                    <span style={{ color: SEARCH_SOURCE_TYPES.find(i => i.name == activeSearchSourceTab.name).themeColor }}>
                        <div className={styles.iconWrap}>
                            {SEARCH_SOURCE_TYPES.find(i => i.name == activeSearchSourceTab.name).icon}
                        </div>
                        {activeSearchSourceTab.name}
                    </span>
                </div>
            </div>
            <div className={styles.imagesWrap}>
                {fetchedImages.length != 0 ? <>
                    {fetchedImages.map((imageData, i) => {
                        return <Fragment key={i}>
                            <BgImageRenderer
                                active={selectedImage?.src == imageData}
                                imageData={imageData}
                                onSelect={(image) => setSelectedImage(image)}
                                styleProps={{ height: 'auto', column: 3 }}
                            />
                        </Fragment>
                    })}
                </> : <>
                    {searchQuery && <>
                        <Result
                            status="500"
                            title="Images not found"
                            subTitle="Try another search"
                        // extra={<Button type="primary">Back Home</Button>}
                        /></>}
                </>}
            </div>
        </div>
    )
}

export default SearchImage