/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
      ENV: 'test' | 'development' | 'production';
      REACT_APP_MAPBOXTOKEN: string;
  
    }
      
  }