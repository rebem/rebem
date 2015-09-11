import Yummies from './yummies';
import isYummiesClass from './isYummiesClass';

/**
 * Convert Yummies class type to React
 */
export default function convertToReactType(type) {
    if (isYummiesClass(type)) {
        return Yummies.yummify(
            Yummies._extendWith(type)
        );
    }

    return type;
}
