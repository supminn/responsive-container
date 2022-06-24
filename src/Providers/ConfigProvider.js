import React, { createContext, useContext } from "react";

const ContainerMediaCtx = createContext(null);
export const useContainerConfig = () => useContext(ContainerMediaCtx);

const ConfigProvider = ({ config, children }) => {
  return <ContainerMediaCtx.Provider value={config}>{children}</ContainerMediaCtx.Provider>;
};

export default ConfigProvider;
