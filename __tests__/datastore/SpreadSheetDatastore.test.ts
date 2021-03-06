import { SpreadSheetDatastore } from "datastore/index";
import { Spreadsheet } from "gas-lib/Spreadsheet";
import { IIntakeValues } from "model/index";
import { advanceTo } from "jest-date-mock";
import { mocked } from "ts-jest/utils";
import {
  createIntakeValues,
  createMakerSheet,
  createMaker,
  createMakerValues,
  createIntakeSheet,
  createSuppliValues,
  createSuppliSheet,
  createSuppliAmountValues,
  createSuppliAmountSheet,
  createTimingValues,
  createTimingSheet,
  createTypeValues,
  createTypeSheet,
  createIntakeDetailValues
} from "test/index";
import { IIntakeDetailValues } from "model/IntakeDetail";

jest.mock("gas-lib/Spreadsheet");

let getAllValuesRV: Array<Array<string | number>>;
let spreadSheetDatastore: SpreadSheetDatastore;
let configure: { spreadSheetId: string };

beforeAll(() => {
  configure = { spreadSheetId: "" };
  getAllValuesRV = [];
});

beforeEach(() => {
  mocked(Spreadsheet.openById).mockReturnValue(Spreadsheet.prototype);
  mocked(Spreadsheet.prototype.getAllValues).mockReturnValue(getAllValuesRV);
  spreadSheetDatastore = new SpreadSheetDatastore(configure);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("スプレッドシートの操作確認", () => {
  beforeAll(() => {
    configure = { spreadSheetId: "hoge" };
  });
  beforeEach(() => {
    new SpreadSheetDatastore(configure);
  });
  it("指定したIDのスプレッドシートが開かれること", () => {
    expect(Spreadsheet.openById).toBeCalledWith("hoge");
  });
});
describe("キャッシュの確認", () => {
  const sheetValues = createMakerSheet([createMaker(), createMaker()]);
  beforeAll(() => {
    getAllValuesRV = sheetValues;
  });
  beforeEach(() => {
    spreadSheetDatastore.fetchMaker();
    spreadSheetDatastore.fetchMaker();
  });
  it("spreadSheetのAPIが1度のみよばれること", () => {
    expect(Spreadsheet.prototype.getAllValues).toBeCalledTimes(1);
  });
});
describe("取得結果が存在しない場合", () => {
  let actual: ReturnType<typeof spreadSheetDatastore.fetchMaker>;
  beforeAll(() => {
    getAllValuesRV = createMakerSheet([]);
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchMaker();
  });
  it("空配列が返却されること", () => {
    expect(actual).toEqual([]);
  });
});
describe("fetchMaker", () => {
  const makers = [createMakerValues(1, "maker1"), createMakerValues(2, "maker2")];
  const sheetValues = createMakerSheet(makers);
  let actual: ReturnType<typeof spreadSheetDatastore.fetchMaker>;
  beforeAll(() => {
    getAllValuesRV = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchMaker();
  });
  it("Spreadsheet.prototype.getAllValuesが呼び出されること", () => {
    expect(Spreadsheet.prototype.getAllValues).toBeCalledWith("maker");
  });
  it("MakerValuesが件数分返却されること", () => {
    const expected = makers;
    expect(actual).toEqual(expected);
  });
});

describe("fetchIntake", () => {
  const intakes = [
    createIntakeValues(1, 10, 100, 1000),
    createIntakeValues(2, 11, 101, 1001),
    createIntakeValues(3, 12, 102, 1002)
  ];
  const sheetValues = createIntakeSheet(intakes);
  let actual: ReturnType<typeof spreadSheetDatastore.fetchIntake>;
  beforeAll(() => {
    getAllValuesRV = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchIntake();
  });
  it("IntakeValuesが件数分返却されること", () => {
    const expected = intakes;
    expect(actual).toEqual(expected);
  });
});

describe("fetchSuppli", () => {
  const supplis = [
    createSuppliValues(1, 10, 100, "suppli1", 1000, "unit1"),
    createSuppliValues(2, 11, 101, "suppli2", 1001, "unit2")
  ];
  const sheetValues = createSuppliSheet(supplis);
  let actual: ReturnType<typeof spreadSheetDatastore.fetchSuppli>;
  beforeAll(() => {
    getAllValuesRV = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchSuppli();
  });
  it("SuppliValuesが件数分返却されること", () => {
    const expected = supplis;
    expect(actual).toEqual(expected);
  });
});

describe("fetchSuppliAmount", () => {
  const suppliAmounts = [
    createSuppliAmountValues(1, 10, 100),
    createSuppliAmountValues(2, 11, 101)
  ];
  const sheetValues = createSuppliAmountSheet(suppliAmounts);
  let actual: ReturnType<typeof spreadSheetDatastore.fetchSuppliAmount>;
  beforeAll(() => {
    getAllValuesRV = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchSuppliAmount();
  });
  it("SuppliAmountValuesが件数分返却されること", () => {
    const expected = suppliAmounts;
    expect(actual).toEqual(expected);
  });
});

describe("fetchTiming", () => {
  const timings = [createTimingValues(1, "timing1"), createTimingValues(2, "timing2")];
  const sheetValues = createTimingSheet(timings);
  let actual: ReturnType<typeof spreadSheetDatastore.fetchTiming>;
  beforeAll(() => {
    getAllValuesRV = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchTiming();
  });
  it("TimingValuesが件数分返却されること", () => {
    const expected = timings;
    expect(actual).toEqual(expected);
  });
});

describe("fetchType", () => {
  const types = [createTypeValues(1, "type1"), createTypeValues(2, "type2")];
  const sheetValues = createTypeSheet(types);
  let actual: ReturnType<typeof spreadSheetDatastore.fetchType>;
  beforeAll(() => {
    getAllValuesRV = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchType();
  });
  it("TypeValuesが件数分返却されること", () => {
    const expected = types;
    expect(actual).toEqual(expected);
  });
});

describe("updateIntakes", () => {
  let intakes: IIntakeValues[];
  beforeAll(() => {
    intakes = [];
  });
  beforeEach(() => {
    spreadSheetDatastore.fetchIntake();
    spreadSheetDatastore.updateIntakes(intakes);
  });
  describe("実行後のfetchIntakeを実行した際", () => {
    beforeEach(() => {
      spreadSheetDatastore.fetchIntake();
    });
    it("キャッシュが使われないこと", () => {
      expect(Spreadsheet.prototype.getAllValues).toBeCalledTimes(2);
    });
  });
  describe("任意の値が指定された場合", () => {
    beforeAll(() => {
      intakes = [
        createIntakeValues(1, 10, 30, 5),
        createIntakeValues(2, 11, 31, 6),
        createIntakeValues(3, 12, 32, 7)
      ];
    });
    it("件数分データが追加されること", () => {
      const expected = [
        [1, 10, 30, 5],
        [2, 11, 31, 6],
        [3, 12, 32, 7]
      ];
      expect(Spreadsheet.prototype.replace).toBeCalledWith("intake", expected, 1);
    });
  });
});

describe("addIntakeDetailValues", () => {
  let intakeDetails: IIntakeDetailValues[];
  beforeAll(() => {
    intakeDetails = [];
  });
  beforeEach(() => {
    advanceTo(new Date(2020, 3, 1, 12, 0, 0));
    spreadSheetDatastore.addIntakeDetails(intakeDetails);
  });
  describe("空配列が指定されたとき", () => {
    beforeAll(() => {
      intakeDetails = [];
    });
    it("登録されないこと", () => {
      expect(Spreadsheet.prototype.add).toBeCalledWith("intakeDetail", []);
    });
  });
  describe("任意の値が指定されたとき", () => {
    beforeAll(() => {
      intakeDetails = [
        createIntakeDetailValues(new Date(), 1, 10, 100),
        createIntakeDetailValues(new Date(), 2, 20, 200)
      ];
    });
    it("dateのtoISOStringの値が1カラム目に設定されること", () => {
      const expected = [
        ["2020-04-01T12:00:00.000Z", 1, 10, 100],
        ["2020-04-01T12:00:00.000Z", 2, 20, 200]
      ];
      expect(Spreadsheet.prototype.add).toBeCalledWith("intakeDetail", expected);
    });
  });
});
