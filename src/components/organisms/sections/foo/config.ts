import { FOO, SECTIONS_CATEGORIES } from "@constant/components";
import { BACKGROUND, BORDER, PADDING, TEXT_STYLES } from "@constant/editorStylesProperties";
import { v4 as uuid } from 'uuid';

export default {
    "id": uuid(),
    "uid": FOO,
    "section": SECTIONS_CATEGORIES.NAVIGATION,
    "className": "componentWrap",
    "appearance": {
        "mobile": true,
        "desktop": true
    },
    "style": {
        "background": '#ffff',
        "width": '100%',
        "height": '100%',
        "boxShadow": 'unset',
        "padding": '20px',
        "color": 'black'
    },
    "editable": { label: 'Container', style: [BACKGROUND, PADDING, BORDER], props: [] },
    "component": "div",
    "children": [
        {
            "uid": `${FOO}#${uuid()}`,
            "component": "div",
            "props": {
                "text": "Hello, World!"
            },
            "editable": { label: 'Heading', style: [BACKGROUND, TEXT_STYLES], props: ['text'] },
            "style": {
                "color": "red",
                "fontSize": "30px"
            },
            children: [
                {
                    "uid": `${FOO}#${uuid()}`,
                    "component": "p",
                    "props": {
                        "text": "Welcome to the world of React components!"
                    },
                    "editable": { label: 'Subheading', style: [TEXT_STYLES], props: ['text'] },
                    "style": {
                        "color": "blue",
                        "fontSize": "18px"
                    }
                }
            ]
        }
    ]
}