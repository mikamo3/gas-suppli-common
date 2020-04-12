import { SpreadSheetDatastore } from "datastore/index";
import MockSheet from "mocks/gas/MockSheet";
import MockRange from "mocks/gas/MockRange";
import {
  IMakerValues,
  IIntakeValues,
  ISuppliValues,
  ISuppliAmountValues,
  ITimingValues,
  ITypeValues
} from "model/index";

const openById = jest.fn();
let spreadSheetValues: Array<Array<string | number>>;
let spreadSheetDatastore: SpreadSheetDatastore;
let configure: { spreadSheetId: string };
SpreadsheetApp.openById = openById;
beforeAll(() => {
  configure = { spreadSheetId: "" };
  spreadSheetValues = [];
});

beforeEach(() => {
  openById.mockReturnValue(new MockSheet(spreadSheetValues));
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
    spreadSheetDatastore.fetchMaker();
  });
  it("指定したIDのスプレッドシートが開かれること", () => {
    expect(openById).toBeCalledWith("hoge");
  });
});
describe("キャッシュの確認", () => {
  const sheetValues: Array<Array<string | number>> = [
    ["id", "name"],
    [1, "maker1"],
    [2, "maker2"]
  ];
  beforeAll(() => {
    spreadSheetValues = sheetValues;
  });
  beforeEach(() => {
    spreadSheetDatastore.fetchMaker();
    spreadSheetDatastore.fetchMaker();
  });
  it("spreadSheetのAPIが1度のみよばれること", () => {
    expect(MockSheet.prototype.getSheetByName).toBeCalledTimes(1);
    expect(MockSheet.prototype.getDataRange).toBeCalledTimes(1);
    expect(MockRange.prototype.getValues).toBeCalledTimes(1);
  });
});
describe("取得結果が存在しない場合", () => {
  let actual: ReturnType<typeof spreadSheetDatastore.fetchMaker>;
  beforeAll(() => {
    spreadSheetValues = [];
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchMaker();
  });
  it("空配列が返却されること", () => {
    expect(actual).toEqual([]);
  });
});
describe("fetchMaker", () => {
  const sheetValues: Array<Array<string | number>> = [
    ["id", "name"],
    [1, "maker1"],
    [2, "maker2"]
  ];
  let actual: ReturnType<typeof spreadSheetDatastore.fetchMaker>;
  beforeAll(() => {
    configure = { spreadSheetId: "hogehoge" };
    spreadSheetValues = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchMaker();
  });
  it("指定したspreadSheetが開かれること", () => {
    expect(openById).toBeCalledWith("hogehoge");
  });
  it("makerシートが選択されること", () => {
    expect(MockSheet.prototype.getSheetByName).toBeCalledWith("maker");
  });
  it("シート内のすべてのデータが選択されること", () => {
    expect(MockSheet.prototype.getDataRange).toBeCalled();
  });
  it("選択されたデータが取得されること", () => {
    expect(MockRange.prototype.getValues).toReturnWith(sheetValues);
  });
  it("MakerValuesが件数分返却されること", () => {
    const expected: IMakerValues[] = [
      { id: 1, name: "maker1" },
      { id: 2, name: "maker2" }
    ];
    expect(actual).toEqual(expected);
  });
});

describe("fetchIntake", () => {
  const sheetValues: Array<Array<string | number>> = [
    ["id", "timingId", "typeId", "serving"],
    [1, 10, 100, 5],
    [2, 11, 101, 6],
    [3, 12, 102, 7]
  ];
  let actual: ReturnType<typeof spreadSheetDatastore.fetchIntake>;
  beforeAll(() => {
    configure = { spreadSheetId: "hogehoge" };
    spreadSheetValues = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchIntake();
  });
  it("指定したspreadSheetが開かれること", () => {
    expect(openById).toBeCalledWith("hogehoge");
  });
  it("intakeシートが選択されること", () => {
    expect(MockSheet.prototype.getSheetByName).toBeCalledWith("intake");
  });
  it("シート内のすべてのデータが選択されること", () => {
    expect(MockSheet.prototype.getDataRange).toBeCalled();
  });
  it("選択されたデータが取得されること", () => {
    expect(MockRange.prototype.getValues).toReturnWith(sheetValues);
  });
  it("IntakeValuesが件数分返却されること", () => {
    const expected: IIntakeValues[] = [
      { id: 1, timingId: 10, typeId: 100, serving: 5 },
      { id: 2, timingId: 11, typeId: 101, serving: 6 },
      { id: 3, timingId: 12, typeId: 102, serving: 7 }
    ];
    expect(actual).toEqual(expected);
  });
});

describe("fetchSuppli", () => {
  const sheetValues: Array<Array<string | number>> = [
    ["id", "typeId", "makerId", "name", "amountPerServing", "servingUnit"],
    [1, 10, 100, "suppli1", 5, "unit1"],
    [2, 11, 101, "suppli2", 6, "unit2"],
    [3, 12, 102, "suppli3", 7, "unit3"]
  ];
  let actual: ReturnType<typeof spreadSheetDatastore.fetchSuppli>;
  beforeAll(() => {
    configure = { spreadSheetId: "hogehoge" };
    spreadSheetValues = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchSuppli();
  });
  it("指定したspreadSheetが開かれること", () => {
    expect(openById).toBeCalledWith("hogehoge");
  });
  it("suppliシートが選択されること", () => {
    expect(MockSheet.prototype.getSheetByName).toBeCalledWith("suppli");
  });
  it("シート内のすべてのデータが選択されること", () => {
    expect(MockSheet.prototype.getDataRange).toBeCalled();
  });
  it("選択されたデータが取得されること", () => {
    expect(MockRange.prototype.getValues).toReturnWith(sheetValues);
  });
  it("SuppliValuesが件数分返却されること", () => {
    const expected: ISuppliValues[] = [
      {
        id: 1,
        typeId: 10,
        makerId: 100,
        name: "suppli1",
        amountPerServing: 5,
        servingUnit: "unit1"
      },
      {
        id: 2,
        typeId: 11,
        makerId: 101,
        name: "suppli2",
        amountPerServing: 6,
        servingUnit: "unit2"
      },
      {
        id: 3,
        typeId: 12,
        makerId: 102,
        name: "suppli3",
        amountPerServing: 7,
        servingUnit: "unit3"
      }
    ];
    expect(actual).toEqual(expected);
  });
});

describe("fetchSuppliAmount", () => {
  const sheetValues: Array<Array<string | number>> = [
    ["id", "suppliId", "amount"],
    [1, 10, 100],
    [2, 11, 101],
    [3, 12, 102]
  ];
  let actual: ReturnType<typeof spreadSheetDatastore.fetchSuppliAmount>;
  beforeAll(() => {
    configure = { spreadSheetId: "hogehoge" };
    spreadSheetValues = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchSuppliAmount();
  });
  it("指定したspreadSheetが開かれること", () => {
    expect(openById).toBeCalledWith("hogehoge");
  });
  it("suppliAmountシートが選択されること", () => {
    expect(MockSheet.prototype.getSheetByName).toBeCalledWith("suppliAmount");
  });
  it("シート内のすべてのデータが選択されること", () => {
    expect(MockSheet.prototype.getDataRange).toBeCalled();
  });
  it("選択されたデータが取得されること", () => {
    expect(MockRange.prototype.getValues).toReturnWith(sheetValues);
  });
  it("SuppliAmountValuesが件数分返却されること", () => {
    const expected: ISuppliAmountValues[] = [
      { id: 1, suppliId: 10, amount: 100 },
      { id: 2, suppliId: 11, amount: 101 },
      { id: 3, suppliId: 12, amount: 102 }
    ];
    expect(actual).toEqual(expected);
  });
});

describe("fetchTiming", () => {
  const sheetValues: Array<Array<string | number>> = [
    ["id", "name"],
    [1, "timing1"],
    [2, "timing2"]
  ];
  let actual: ReturnType<typeof spreadSheetDatastore.fetchTiming>;
  beforeAll(() => {
    configure = { spreadSheetId: "hogehoge" };
    spreadSheetValues = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchTiming();
  });
  it("指定したspreadSheetが開かれること", () => {
    expect(openById).toBeCalledWith("hogehoge");
  });
  it("timingシートが選択されること", () => {
    expect(MockSheet.prototype.getSheetByName).toBeCalledWith("timing");
  });
  it("シート内のすべてのデータが選択されること", () => {
    expect(MockSheet.prototype.getDataRange).toBeCalled();
  });
  it("選択されたデータが取得されること", () => {
    expect(MockRange.prototype.getValues).toReturnWith(sheetValues);
  });
  it("TimingValuesが件数分返却されること", () => {
    const expected: ITimingValues[] = [
      { id: 1, name: "timing1" },
      { id: 2, name: "timing2" }
    ];
    expect(actual).toEqual(expected);
  });
});

describe("fetchType", () => {
  const sheetValues: Array<Array<string | number>> = [
    ["id", "name"],
    [1, "type1"],
    [2, "type2"]
  ];
  let actual: ReturnType<typeof spreadSheetDatastore.fetchType>;
  beforeAll(() => {
    configure = { spreadSheetId: "hogehoge" };
    spreadSheetValues = sheetValues;
  });
  beforeEach(() => {
    actual = spreadSheetDatastore.fetchType();
  });
  it("指定したspreadSheetが開かれること", () => {
    expect(openById).toBeCalledWith("hogehoge");
  });
  it("typeシートが選択されること", () => {
    expect(MockSheet.prototype.getSheetByName).toBeCalledWith("type");
  });
  it("シート内のすべてのデータが選択されること", () => {
    expect(MockSheet.prototype.getDataRange).toBeCalled();
  });
  it("選択されたデータが取得されること", () => {
    expect(MockRange.prototype.getValues).toReturnWith(sheetValues);
  });
  it("TypeValuesが件数分返却されること", () => {
    const expected: ITypeValues[] = [
      { id: 1, name: "type1" },
      { id: 2, name: "type2" }
    ];
    expect(actual).toEqual(expected);
  });
});
