declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      DEBUG: 'true' | 'false';
      DB_HOST: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
    }
  }
}

export {};
