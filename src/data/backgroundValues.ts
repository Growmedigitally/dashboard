import { BACKGROUND_TYPES } from "@constant/common";

export const GRADIENT_INITIAL_VALUE = {
    type: BACKGROUND_TYPES.GRADIENT,
    value: "linear-gradient(to right, #D3CCE3, #E9E4F0)",
    colors: [{ color: '#D3CCE3', format: 'hex' }, { color: '#E9E4F0', format: 'hex' }],
    direction: 'to right'
}

export const COLOR_INITIAL_VALUE = {
    type: BACKGROUND_TYPES.COLOR,
    value: "#D3CCE3",
    colors: [{ color: '#D3CCE3', format: 'hex' }],
}

export const IMAGE_INITIAL_VALUE = {
    type: BACKGROUND_TYPES.IMAGE,
    value: "#D3CCE3",
    colors: [],
    src: ''
}