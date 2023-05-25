import { BACKGROUND_TYPES } from "@constant/common";
import { getGradientValue } from "./utils";

const getBackground = (config) => {

    const configSample = {
        value: '#000',
        type: 'Color',
        colors: [{ color: '#000', format: 'hex' }]
    }

    let background = '';
    let backgroundImage = '';
    switch (config?.type) {
        case BACKGROUND_TYPES.COLOR:
            background = config.colors[0].color
            break;
        case BACKGROUND_TYPES.GRADIENT:
            background = getGradientValue(config.colors, config.direction);
            break;
        case BACKGROUND_TYPES.IMAGE:
            background = config.value;
            backgroundImage = `url(${config.src})`;
            return {
                backgroundImage,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }
            break;

        default:
            break;
    }
    return { background }
}

export default getBackground;