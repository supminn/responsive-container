// containerType => device type calculated by responsive container
// queryType => query device type
import { BREAKPOINTS } from "../constants";

function Utils(containerType, deviceConfig) {
  const deviceMap = Object.keys(deviceConfig)
    .sort((a, b) => deviceConfig[a] > deviceConfig[b])
    .reduce((acc, current, index) => {
      acc[current] = index;
      return acc;
    }, {});
  return {
    equal: (queryType) => containerType === queryType,
    // lessThan: queryType => deviceMap[containerType] <= deviceMap[queryType],
    greaterThan: (queryType) =>
      deviceMap[containerType] >= deviceMap[queryType],
    between: ({ min, max }) =>
      deviceMap[containerType] >= deviceMap[min] &&
      deviceMap[containerType] <= deviceMap[max],
  };
}

function Media(containerType, deviceConfig = BREAKPOINTS, cssTransformFn) {
  const styleProvider = (compareFn, deviceType) => {
    return (...styles) => {
      if (styles && styles.length && compareFn(deviceType)) {
        return cssTransformFn ? cssTransformFn(...styles) : styles;
      }
      return compareFn(deviceType);
    };
  };

  function CompareType(compareFn) {
    const deviceMap = Object.keys(deviceConfig).reduce((acc, current) => {
      acc[current] = styleProvider(compareFn, current);
      return acc;
    }, {});
    return deviceMap;
  }

  const util = Utils(containerType, deviceConfig);
  return {
    containerType,
    ...CompareType(util.greaterThan),
    // lessThan: CompareType(util.lessThan),
    only: CompareType(util.equal),
    between: (min, max) => styleProvider(util.between, { min, max }),
  };
}

export default Media;
