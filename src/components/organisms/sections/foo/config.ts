import { FOO, SECTIONS_CATEGORIES } from "@constant/components";
import { v4 as uuid } from 'uuid';

export default {
    id: uuid(),
    uid: FOO,
    section: SECTIONS_CATEGORIES.FEATURES,
    style: {
        background: 'white',
        width: '100%',
        height: '100%',
        boxShadow: 'unset',
    },
    children: [
        {
            component: "img",
            src: "https://images.pexels.com/photos/2877188/pexels-photo-2877188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            style: {
                background: 'white',
                width: '100px',
                height: '100px',
            }
        },
        {
            component: "text",
            value: 'HEYYYY',
            style: {
                fontSize: '10px',
                color: 'green'
            }
        }
    ]

}
