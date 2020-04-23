import { MasterRepository } from "repository/index";
import { DummyDatastore, SpreadSheetDatastore } from "datastore/index";
import { PropertyNames } from "constant/index";

const getEnv = () => {
  const stage = process.env.NODE_ENV;
  if (stage !== "test" && stage !== "production" && stage !== "development") {
    throw new Error(`invalid NODE_ENV: ${stage}`);
  }
  return stage;
};

const createMasterRepository = () => {
  const spreadSheetId = PropertiesService.getScriptProperties().getProperty(
    PropertyNames.mastersheetId
  );
  if (!spreadSheetId) {
    throw new Error("spreadSheet does not exist");
  }
  return new MasterRepository(new SpreadSheetDatastore({ spreadSheetId }));
};

export const env = {
  getMasterRepository: () => {
    const stage = getEnv();
    switch (stage) {
      case "test":
        return new MasterRepository(new DummyDatastore({}));
      case "development":
        return createMasterRepository();
      case "production": {
        return createMasterRepository();
      }
    }
  }
};
