import { BAR, SECTIONS_CATEGORIES } from "@constant/components";
import { v4 as uuid } from 'uuid';

export default {
    id: uuid(),//id used for dnd
    uid: BAR,//uniqe id used for interbnal identifications
    section: SECTIONS_CATEGORIES.HERO,//category
    "className": "componentWrap",
    "style": {
        "background": '#dee1ec',
        "width": '100%',
        "height": '100%',
        "boxShadow": 'unset',
        "padding": '20px',
        "color": 'black'
    },
    "editable": { label: 'Container', style: ['background', 'padding'], props: [] },
    "component": "div",
    "children": [
        {
            "component": "div",
            "props": {
                "text": "Hello, BARR!"
            },
            "editable": { label: 'Heading', style: ['background', 'color', 'fontSize'], props: ['text'] },
            "style": {
                "background": '#dee1ec',
                "color": "red",
                "fontSize": "30px"
            }
        },
        {
            "component": "p",
            "props": {
                "text": "Welcome to the BARR world!"
            },
            "editable": { label: 'Subheading', style: ['color', 'fontSize'], props: ['text'] },
            "style": {
                "background": '#dee1ec',
                "color": "blue",
                "fontSize": "18px"
            }
        }
    ]
}