import Yummies from './index';
import isYummiesClass from './isYummiesClass';

/**
 * Convert Yummies class type to React
 */
export default function convertToReactType(type) {
    if (isYummiesClass(type)) {
        return Yummies.yummify(type);
    }

    return type;
}
