export {};

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        MAPBOXTOKEN: string
        ENV: 'test' | 'dev' | 'prod';

      }
    }
  }