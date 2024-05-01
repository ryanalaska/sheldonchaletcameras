import React, { createContext, useReducer, useState } from 'react';
import { User } from '../types/credential';
import { Cam } from '../types/cams';
import Storage from '../utils/storage';

interface CamState {
  cam? : Cam
}

interface CamContextValue extends CamState {
  setCam : (cam:Cam) =>void
}

const initialState : CamContextValue = {
  cam:null,
  setCam:()=>{}
}

// Create the context
const CamContext = createContext<CamContextValue>(initialState);

const CamContextProvider = ({ children }) => {
  const [cam,_setCam] = useState<Cam|null>(null);

  const setCam = (cam:Cam)=>{
    _setCam(cam)
    Storage.setValue("CAM",cam)
  }
  return (
    <CamContext.Provider value={{cam,setCam}}>
      {children}
    </CamContext.Provider>
  );
};


export { CamContextProvider };
export default CamContext;
