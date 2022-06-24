import React from 'react';
import { useContainerMedia } from "../../Providers/ContainerMediaProvider";


const ToggleComponents = () => {
    const media = useContainerMedia();
    return media.desktop() ? <DesktopView /> : (media.laptop() ? <LaptopView /> : <MobileView />);
}

const DesktopView = () => {
    const style = { backgroundColor: "#ff00002c", border: "1px solid #000", textAlign: "center" }
    return <div style={style}>I am Component 1</div>
}
const LaptopView = () => {
    const style = { backgroundColor: "#00FF002c", border: "1px solid #000", textAlign: "center" }
    return <div style={style}>I am Component 2</div>
}
const MobileView = () => {
    const style = { backgroundColor: "#0000FF2c", border: "1px solid #000", textAlign: "center" }
    return <div style={style}>I am Component 3</div>
}
 
export default ToggleComponents;