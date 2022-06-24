import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { BREAKPOINTS } from "../constants";
import { getContainerType } from "../utils/utils";
import Media from "../utils/Media";
import { useContainerConfig } from "./ConfigProvider";
import useContainerWidth from "../hooks/useContainerWidth";

const ContainerMediaCtx = createContext(null);
export const useContainerMedia = () => useContext(ContainerMediaCtx);

const ContainerMediaProvider = ({ children, threshold, cssTransformFn }) => {
  const ref = useRef(null);
  const containerWidth = useContainerWidth(ref);
  const parentMediaCtx = useContainerMedia();
  const parentContainerType = parentMediaCtx
    ? parentMediaCtx.containerType
    : null;

  // Config for deciding container type
  const breakPointConfig = useContainerConfig() || BREAKPOINTS;
  const getContainerTypeFromBreakpoints = useMemo(
    () => getContainerType(breakPointConfig),
    [breakPointConfig]
  );
  const [containerType, setContainerType] = useState();

  // media object for helper functions i.e media.laptop()/media.tablet()
  const media = useMemo(() => {
    return Media(containerType, breakPointConfig, cssTransformFn);
  }, [containerType, breakPointConfig]);

  // calculate container type
  useEffect(() => {
    const wrapperWidth = ref.current.clientWidth;

    let effElWidth = wrapperWidth;
    if (threshold && wrapperWidth > threshold) {
      effElWidth = threshold;
    }
    let finalContainerType = getContainerTypeFromBreakpoints(effElWidth);
    // child container type should not be greater than parent
    // in case parent have smaller threshold
    const useParentContainerType =
      parentContainerType &&
      breakPointConfig[parentContainerType] &&
      breakPointConfig[finalContainerType] >
        breakPointConfig[parentContainerType];

    finalContainerType = useParentContainerType
      ? parentContainerType
      : finalContainerType;
    setContainerType(finalContainerType);
  }, [containerWidth, threshold, parentContainerType]);

  return (
    <ContainerMediaCtx.Provider value={media}>
      <div ref={ref}>{containerType ? <div>{children}</div> : null}</div>
    </ContainerMediaCtx.Provider>
  );
};

ContainerMediaProvider.propTypes = {
  children: PropTypes.node.isRequired,
  threshold: PropTypes.number,
};

ContainerMediaProvider.defaultProps = {
  threshold: null,
};

export default ContainerMediaProvider;
