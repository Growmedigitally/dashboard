import { BACKGROUND_IMAGES_ORIENTATIONS, SEARCHED_IMAGES_COUNT_PER_REQUEST } from "@constant/common";
import { APIROUTINGS } from "src/utils/apiRoutings/RestClient";
const SEARCH_API_URL = `https://api.pexels.com/v1/search?`;

export const getPexelsImagesBySearchQuery = (searchQuery, orientation = BACKGROUND_IMAGES_ORIENTATIONS.LANDSCAPE, page = 1) => {
    return new Promise((res, rej) => {
        APIROUTINGS.GET(`${SEARCH_API_URL}orientation=${orientation}&page=${page}&per_page=${SEARCHED_IMAGES_COUNT_PER_REQUEST}&query=${searchQuery}`, {
            Accept: "application/json",
            Authorization: process.env.NEXT_PUBLIC_PEXELS_API_CLIENTID,
        })
            .then((response) => {
                res(response.data.photos.map((i) => { return { src: i.src.large } }));
            }).catch(function (error) {
                rej(error.response.data);
                console.log(`Error in api/unsplash/getImages = `, error);
            });
    })
}

// {
//     "total_results": 10000,
//         "page": 1,
//             "per_page": 1,
//                 "photos": [
//                     {
//                         "id": 3573351,
//                         "width": 3066,
//                         "height": 3968,
//                         "url": "https://www.pexels.com/photo/trees-during-day-3573351/",
//                         "photographer": "Lukas Rodriguez",
//                         "photographer_url": "https://www.pexels.com/@lukas-rodriguez-1845331",
//                         "photographer_id": 1845331,
//                         "avg_color": "#374824",
//                         "src": {
//                             "original": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png",
//                             "large2x": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//                             "large": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=650&w=940",
//                             "medium": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=350",
//                             "small": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&h=130",
//                             "portrait": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
//                             "landscape": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
//                             "tiny": "https://images.pexels.com/photos/3573351/pexels-photo-3573351.png?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
//                         },
//                         "liked": false,
//                         "alt": "Brown Rocks During Golden Hour"
//                     }
//                 ],
//                     "next_page": "https://api.pexels.com/v1/search/?page=2&per_page=1&query=nature"
// }