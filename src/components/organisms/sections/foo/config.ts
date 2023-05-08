import { FOO, SECTIONS_CATEGORIES } from "@constant/components";

export default {
    uid: FOO,
    id: FOO,
    section: SECTIONS_CATEGORIES.FEATURES,
    style: {
        background: 'white',
        width: '100%',
        height: '100%',
        boxShadow: '',
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
