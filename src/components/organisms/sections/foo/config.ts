import { FOO, SECTIONS_CATEGORIES } from "@constant/components";
import { v4 as uuid } from 'uuid';

export default {
    "id": uuid(),
    "uid": FOO,
    "section": SECTIONS_CATEGORIES.NAVIGATION,
    "className": "componentWrap",
    "style": {
        "background": '#dee1ec',
        "width": '100%',
        "height": '100%',
        "boxShadow": 'unset',
        "padding": '20px',
        "color": 'black'
    },
    "editable": { style: ['background', 'color', 'padding'], props: [] },
    "component": "div",
    "children": [
        {
            "component": "div",
            "props": {
                "text": "Hello, World!"
            },
            "editable": { style: ['background', 'color', 'fontSize'], props: ['text'] },
            "style": {
                "background": '#dee1ec',
                "color": "red",
                "fontSize": "30px"
            },
            children: [
                {
                    "component": "p",
                    "props": {
                        "text": "Welcome to the world of React components!"
                    },
                    "editable": { style: ['color', 'fontSize'], props: ['text'] },
                    "style": {
                        "background": '#dee1ec',
                        "color": "blue",
                        "fontSize": "18px"
                    }
                }
            ]
        }
    ]
}