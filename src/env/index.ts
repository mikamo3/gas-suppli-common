import { MasterRepository } from "repository/index";
import { DummyDatastore, SpreadSheetDatastore } from "datastore/index";
import { PropertyNames } from "constant/index";
import { logInstance, consoleLogWriter, gasLogWriter } from "gas-lib/Log";
const getEnv = () => {
  const stage = process.env.NODE_ENV;
  if (stage !== "test" && stage !== "production" && stage !== "development") {
    throw new Error(`invalid NODE_ENV: ${stage}`);
  }
  return stage;
};

const createMasterRepositoryWithSpreadSheetDatastore = () => {
  const spreadSheetId = PropertiesService.getScriptProperties().getProperty(
    PropertyNames.mastersheetId
  );
  if (!spreadSheetId) {
    throw new Error("spreadSheet does not exist");
  }
  return new MasterRepository(new SpreadSheetDatastore({ spreadSheetId }));
};

export const repository = () => {
  const stage = getEnv();
  switch (stage) {
    case "test":
      return new MasterRepository(new DummyDatastore({}));
    case "development":
      return createMasterRepositoryWithSpreadSheetDatastore();
    case "production": {
      return createMasterRepositoryWithSpreadSheetDatastore();
    }
  }
};

export const logger = () => {
  const stage = getEnv();
  switch (stage) {
    case "test":
      logInstance.setConfig({ logwriter: consoleLogWriter, mode: stage, useBuffer: true });
      break;
    case "development":
      logInstance.setConfig({ logwriter: gasLogWriter, mode: stage, useBuffer: true });
      break;
    case "production":
      logInstance.setConfig({ logwriter: gasLogWriter, mode: stage, useBuffer: false });
  }
  return logInstance;
};
