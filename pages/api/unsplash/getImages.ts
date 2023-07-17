import { APIROUTINGS } from '@util/apiRoutings/RestClient';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next'
const API_CLIENTID = process.env.NEXT_PUBLIC_UNSPLASH_API_CLIENTID;
const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=3&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_CLIENTID}`;

// export default {
//     search(imageSearch) {
//         const url = `${API_URL}&query=${imageSearch}`;
//         return fetch(url)
//             .then((response) => response.json())
//             .then((result) => result.results);
//     },
// };

export const IMAGE_SIZES = {
    RAW: 'raw',//28mb
    FULL: 'full',//6mb
    REGULAR: 'regular',//125kb
    SMALL: 'small',//31kb
    THUMB: 'thumb',//11kb
    "small_s3": ''
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { searchQuery } = req.body;
    const imagesData = await fetch(`${API_URL}&query=${searchQuery}`)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            return result.results
        })
    res.status(200).json({ data: imagesData });
    // APIROUTINGS.GET(`${API_URL}&query=${searchQuery}&orientation=landscape`).then((response) => {
    //     console.log(response)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // const jwt = cookies[USER_COOKIE_KEY || ''];
    // if (!jwt) {
    //     return res.json({ message: "Bro you are already not logged in..." });
    // } else {
    //     const serialised = serialize(USER_COOKIE_KEY, null, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV !== "development",
    //         sameSite: "strict",
    //         maxAge: -1,
    //         path: "/",
    //     });
    //     res.setHeader("Set-Cookie", serialised);
    //     res.status(200).json({ message: "Successfuly logged out!" });
    //     return;
    // }
}