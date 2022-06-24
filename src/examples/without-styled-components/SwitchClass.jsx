import React from 'react';
import styles from './switch_class.css'
import { useContainerMedia } from "../../Providers/ContainerMediaProvider";

const SwitchClass = () => {
    const media = useContainerMedia();
    let className;
    if (media.desktop()) {
        className = "desktop";
      } else if (media.laptopL()) {
        className = "laptopL";
      } else if (media.laptop()) {
        className = "laptop";
      } else if (media.mobile()) {
        className = "mobile";
      } else {
        // mobileS
        className = "";
      }
      const style = { border: "1px solid #000", textAlign: "center" };
  return (
    <div className={`switch-class ${className}`} style={style}>
      <span>{media.containerType}</span>
    </div>
  );
}
 
export default SwitchClass;