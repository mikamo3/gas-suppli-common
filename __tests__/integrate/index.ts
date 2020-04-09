import { SpreadSheetDatastore } from "src";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let global: any;

global.prepare = () => {
  Logger.log("hogehoge");
};
