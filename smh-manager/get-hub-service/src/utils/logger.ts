class Logger {
    info(message: string, ...optionalParams: any[]) {
      console.log(`[INFO]: ${message}`, ...optionalParams);
    }
  
    error(message: string, ...optionalParams: any[]) {
      console.error(`[ERROR]: ${message}`, ...optionalParams);
    }
  }
  
  export default new Logger();
  
  //src/utils/logger.ts