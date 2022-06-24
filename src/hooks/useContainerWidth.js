import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

const useContainerWidth = ref => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(debounce((entries) => {
        const newWidth = entries[0].contentRect.width;
        setWidth(newWidth);
      }, 200)
    );
    resizeObserver.observe(ref.current);

    return () => resizeObserver.unobserve(ref.current);
  }, [ref.current]);

  return width;
};

export default useContainerWidth;
