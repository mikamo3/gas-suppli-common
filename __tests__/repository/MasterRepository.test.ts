import { Datastore } from "datastore/Datastore";
import { DummyDatastore } from "datastore/index";
import {
  IIntakeValues,
  IMakerValues,
  Intake,
  ISuppliAmountValues,
  ISuppliValues,
  ITimingValues,
  ITypeValues,
  Maker,
  Suppli,
  SuppliAmount,
  Timing,
  Type
} from "model/index";
import { MasterRepository } from "repository/index";
import {
  createIntake,
  createMaker,
  createSuppli,
  createSuppliAmount,
  createTiming,
  createType
} from "testhelper/model";
import { mocked } from "ts-jest/utils";

let masterRepository: MasterRepository;
let datastore: Datastore;

jest.spyOn(DummyDatastore.prototype, "fetchType");
jest.spyOn(DummyDatastore.prototype, "fetchSuppli");
jest.spyOn(DummyDatastore.prototype, "fetchIntake");
jest.spyOn(DummyDatastore.prototype, "fetchSuppliAmount");
jest.spyOn(DummyDatastore.prototype, "fetchMaker");
jest.spyOn(DummyDatastore.prototype, "fetchTiming");
jest.spyOn(DummyDatastore.prototype, "updateIntakes");

beforeEach(() => {
  datastore = new DummyDatastore({});
  masterRepository = new MasterRepository(datastore);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("getTypes", () => {
  let fetchTypeReturnValue: ITypeValues[];
  let fetchSuppliReturnValue: ISuppliValues[];
  let fetchIntakeReturnValue: IIntakeValues[];
  let actual: Type[];
  beforeEach(() => {
    mocked(DummyDatastore.prototype.fetchType).mockReturnValue(fetchTypeReturnValue);
    mocked(DummyDatastore.prototype.fetchSuppli).mockReturnValue(fetchSuppliReturnValue);
    mocked(DummyDatastore.prototype.fetchIntake).mockReturnValue(fetchIntakeReturnValue);
    actual = masterRepository.getTypes();
  });
  describe("複数件の場合", () => {
    beforeAll(() => {
      fetchTypeReturnValue = [
        createType(1, "type1"),
        createType(2, "type2"),
        createType(3, "type3")
      ];
    });
    it("Typeが件数分返却されること", () => {
      expect(actual.length).toEqual(3);
    });
    it("propertyが期待値どおりであること", () => {
      const expected = fetchTypeReturnValue[0];
      expect(actual[0]).toMatchObject(expected);
      expect(actual[0]).toHaveProperty("supplis");
    });
  });
  describe("存在しない場合", () => {
    beforeAll(() => {
      fetchTypeReturnValue = [];
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    beforeAll(() => {
      fetchTypeReturnValue = [
        createType(1, "type1"),
        createType(2, "type2"),
        createType(3, "type3")
      ];
    });
    describe("supplis", () => {
      beforeAll(() => {
        fetchSuppliReturnValue = [createSuppli(100, 1), createSuppli(101, 1), createSuppli(102, 3)];
      });

      it("Suppliが存在する場合はそれが返却されること", () => {
        expect(actual[0].supplis).toHaveLength(2);
        expect(actual[0].supplis[0].id).toEqual(100);
        expect(actual[0].supplis[1].id).toEqual(101);
      });
      it("Suppliが存在しない場合は空配列が返却されること", () => {
        expect(actual[1].supplis).toMatchObject([]);
      });
    });
    describe("intakes", () => {
      beforeAll(() => {
        fetchIntakeReturnValue = [
          createIntake(10, 10, 1, 5),
          createIntake(11, 11, 1, 6),
          createIntake(12, 12, 3, 7)
        ];
      });

      it("Intakeが存在する場合はそれが返却されること", () => {
        expect(actual[0].intakes).toHaveLength(2);
        expect(actual[0].intakes[0].id).toEqual(10);
        expect(actual[0].intakes[1].id).toEqual(11);
      });
      it("Suppliが存在しない場合は空配列が返却されること", () => {
        expect(actual[1].intakes).toMatchObject([]);
      });
    });
  });
});

describe("getSupplis", () => {
  let fetchSuppliReturnValue: ISuppliValues[];
  let fetchTypeReturnValue: ITypeValues[];
  let fetchMakerReturnValue: IMakerValues[];
  let fetchSuppliAmountReturnValue: ISuppliAmountValues[];
  let actual: Suppli[];
  beforeAll(() => {
    fetchSuppliReturnValue = [
      createSuppli(1, 10, 100, "suppli1", 10, "unit1"),
      createSuppli(2, 11, 101, "suppli2", 11, "unit2")
    ];
  });
  beforeEach(() => {
    mocked(DummyDatastore.prototype.fetchSuppli).mockReturnValue(fetchSuppliReturnValue);
    mocked(DummyDatastore.prototype.fetchType).mockReturnValue(fetchTypeReturnValue);
    mocked(DummyDatastore.prototype.fetchMaker).mockReturnValue(fetchMakerReturnValue);
    mocked(DummyDatastore.prototype.fetchSuppliAmount).mockReturnValue(
      fetchSuppliAmountReturnValue
    );
    actual = masterRepository.getSupplis();
  });
  it("Suppliが件数分返却されること", () => {
    expect(actual).toHaveLength(2);
  });
  it("propertyが期待値どおりであること", () => {
    const expected = fetchSuppliReturnValue[0];
    expect(actual[0]).toMatchObject(expected);
    expect(actual[0]).toHaveProperty("type");
    expect(actual[0]).toHaveProperty("maker");
    expect(actual[0]).toHaveProperty("suppliAmounts");
  });
  describe("存在しない場合", () => {
    beforeAll(() => {
      fetchSuppliReturnValue = [];
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    beforeAll(() => {
      fetchSuppliReturnValue = [
        createSuppli(1, 10, 100, "suppli1", 10, "unit1"),
        createSuppli(2, 11, 101, "suppli2", 11, "unit2")
      ];
    });
    describe("type", () => {
      beforeAll(() => {
        fetchTypeReturnValue = [createType(10, "type1"), createType(12, "type2")];
      });
      it("Suppliが存在する場合はそれが返却されること", () => {
        expect(actual[0].type).toMatchObject(fetchTypeReturnValue[0]);
      });
      it("Suppliが存在しない場合はundefinedが返却されること", () => {
        expect(actual[1].type).toBeUndefined();
      });
    });
    describe("maker", () => {
      beforeAll(() => {
        fetchMakerReturnValue = [createMaker(101), createMaker(102)];
      });
      it("Makerが存在する場合はそれが返却されること", () => {
        expect(actual[1].maker).toMatchObject(fetchMakerReturnValue[0]);
      });
      it("Makerが存在しない場合はundefinedが返却されること", () => {
        expect(actual[0].maker).toBeUndefined();
      });
    });
    describe("suppliAmounts", () => {
      beforeAll(() => {
        fetchSuppliAmountReturnValue = [
          createSuppliAmount(1000, 1),
          createSuppliAmount(1001, 1),
          createSuppliAmount(1002, 3)
        ];
      });
      it("SuppliAmountsが存在する場合はそれが返却されること", () => {
        expect(actual[0].suppliAmounts).toHaveLength(2);
        expect(actual[0].suppliAmounts[0].id).toEqual(1000);
        expect(actual[0].suppliAmounts[1].id).toEqual(1001);
      });
      it("SuppliAmountsが存在しない場合は空配列が返却されること", () => {
        expect(actual[1].suppliAmounts).toEqual([]);
      });
    });
  });
});

describe("getMakers", () => {
  let actual: Maker[];
  let fetchMakerReturnValue: IMakerValues[];
  let fetchSuppliReturnValue: ISuppliValues[];

  beforeEach(() => {
    mocked(DummyDatastore.prototype.fetchMaker).mockReturnValue(fetchMakerReturnValue);
    mocked(DummyDatastore.prototype.fetchSuppli).mockReturnValue(fetchSuppliReturnValue);
    actual = masterRepository.getMakers();
  });

  describe("複数件の場合", () => {
    beforeAll(() => {
      fetchMakerReturnValue = [
        createMaker(1, "maker1"),
        createMaker(2, "maker2"),
        createMaker(3, "maker3")
      ];
    });
    it("Makerが件数分返却されること", () => {
      expect(actual.length).toEqual(3);
    });
    it("propertyが期待値どおりであること", () => {
      const expected = fetchMakerReturnValue[0];
      expect(actual[0]).toMatchObject(expected);
      expect(actual[0]).toHaveProperty("supplis");
    });
  });
  describe("存在しない場合", () => {
    beforeAll(() => {
      fetchMakerReturnValue = [];
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    beforeAll(() => {
      fetchMakerReturnValue = [
        createMaker(1, "maker1"),
        createMaker(2, "maker2"),
        createMaker(3, "maker3")
      ];
      fetchSuppliReturnValue = [
        createSuppli(100, 10, 1),
        createSuppli(101, 10, 1),
        createSuppli(102, 10, 3)
      ];
    });

    it("Suppliが存在する場合はそれが返却されること", () => {
      expect(actual[0].supplis).toHaveLength(2);
      expect(actual[0].supplis[0].id).toEqual(100);
      expect(actual[0].supplis[1].id).toEqual(101);
    });
    it("Suppliが存在しない場合は空配列が返却されること", () => {
      expect(actual[1].supplis).toMatchObject([]);
    });
  });
});

describe("getSuppliAmounts", () => {
  let fetchSuppliReturnValue: ISuppliValues[];
  let fetchSuppliAmountsReturnValue: ISuppliAmountValues[];
  let actual: SuppliAmount[];
  beforeAll(() => {
    fetchSuppliAmountsReturnValue = [
      createSuppliAmount(1, 11, 101),
      createSuppliAmount(2, 12, 102),
      createSuppliAmount(3, 13, 103)
    ];
  });
  beforeEach(() => {
    mocked(DummyDatastore.prototype.fetchSuppliAmount).mockReturnValue(
      fetchSuppliAmountsReturnValue
    );
    mocked(DummyDatastore.prototype.fetchSuppli).mockReturnValue(fetchSuppliReturnValue);
    actual = masterRepository.getSuppliAmounts();
  });
  it("SuppliAmountが件数分返却されること", () => {
    expect(actual).toHaveLength(3);
  });
  it("propertyが期待値どおりであること", () => {
    const expected = fetchSuppliAmountsReturnValue[0];
    expect(actual[0]).toMatchObject(expected);
    expect(actual[0]).toHaveProperty("suppli");
  });
  describe("存在しない場合", () => {
    beforeAll(() => {
      fetchSuppliAmountsReturnValue = [];
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    beforeAll(() => {
      fetchSuppliAmountsReturnValue = [createSuppliAmount(1, 10), createSuppliAmount(2, 11)];
      fetchSuppliReturnValue = [createSuppli(10)];
    });
    it("Suppliが存在する場合はそれが返却されること", () => {
      expect(actual[0].suppli.id).toEqual(10);
    });
    it("Suppliが存在しない場合はundefinedが返却されること", () => {
      expect(actual[1].suppli).toBeUndefined();
    });
  });
});

describe("getTimings", () => {
  let fetchTimingReturnValue: ITimingValues[];
  let fetchIntakeReturnValue: IIntakeValues[];
  let actual: Timing[];

  beforeAll(() => {
    fetchTimingReturnValue = [
      { id: 1, name: "timing1" },
      { id: 2, name: "timing2" },
      { id: 3, name: "timing3" }
    ];
  });
  beforeEach(() => {
    mocked(DummyDatastore.prototype.fetchTiming).mockReturnValue(fetchTimingReturnValue);
    mocked(DummyDatastore.prototype.fetchIntake).mockReturnValue(fetchIntakeReturnValue);
    actual = masterRepository.getTimings();
  });
  it("Timingが件数分返却されること", () => {
    expect(actual).toHaveLength(3);
  });
  it("propertyが期待値どおりであること", () => {
    const expected = fetchTimingReturnValue[0];
    expect(actual[0]).toMatchObject(expected);
    expect(actual[0]).toHaveProperty("intakes");
  });

  describe("存在しない場合", () => {
    beforeAll(() => {
      fetchTimingReturnValue = [];
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    beforeAll(() => {
      fetchTimingReturnValue = [createTiming(1), createTiming(2)];
      fetchIntakeReturnValue = [createIntake(10, 1), createIntake(11, 1)];
    });
    it("Intakeが存在する場合はそれが返却されること", () => {
      expect(actual[0].intakes[0].id).toEqual(10);
      expect(actual[0].intakes[1].id).toEqual(11);
    });
    it("Intakeが存在しない場合は空配列が返却されること", () => {
      expect(actual[1].intakes).toEqual([]);
    });
  });
});

describe("getIntakes", () => {
  let fetchIntakeReturnValue: IIntakeValues[];
  let fetchTimingReturnValue: ITimingValues[];
  let fetchTypeReturnValue: ITimingValues[];
  let actual: Intake[];
  beforeAll(() => {
    fetchIntakeReturnValue = [
      createIntake(1, 10, 100, 5),
      createIntake(2, 11, 101, 6),
      createIntake(2, 12, 102, 6)
    ];
  });
  beforeEach(() => {
    mocked(DummyDatastore.prototype.fetchIntake).mockReturnValue(fetchIntakeReturnValue);
    mocked(DummyDatastore.prototype.fetchTiming).mockReturnValue(fetchTimingReturnValue);
    mocked(DummyDatastore.prototype.fetchType).mockReturnValue(fetchTypeReturnValue);
    actual = masterRepository.getIntakes();
  });
  it("Intakeが件数分返却されること", () => {
    expect(actual).toHaveLength(3);
  });
  it("propertyが期待値どおりであること", () => {
    const expected = fetchIntakeReturnValue[0];
    expect(actual[0]).toMatchObject(expected);
    expect(actual[0]).toHaveProperty("type");
    expect(actual[0]).toHaveProperty("timing");
  });
  describe("存在しない場合", () => {
    beforeAll(() => {
      fetchIntakeReturnValue = [];
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    beforeAll(() => {
      fetchIntakeReturnValue = [
        createIntake(1, 10, 100),
        createIntake(2, 10, 102),
        createIntake(3, 12, 102)
      ];
    });
    describe("timing", () => {
      beforeAll(() => {
        fetchTimingReturnValue = [createTiming(10), createTiming(11)];
      });
      it("Timingが存在する場合はそれが返却されること", () => {
        expect(actual[0].timing.id).toEqual(10);
      });
      it("Timingが存在しない場合は空配列が返却されること", () => {
        expect(actual[2].timing).toBeUndefined();
      });
    });
    describe("type", () => {
      beforeAll(() => {
        fetchTypeReturnValue = [createType(101), createType(102)];
      });
      it("Typeが存在する場合はそれが返却されること", () => {
        expect(actual[1].type.id).toEqual(102);
        expect(actual[2].type.id).toEqual(102);
      });
      it("Timingが存在しない場合は空配列が返却されること", () => {
        expect(actual[0].type).toBeUndefined();
      });
    });
  });
});
describe("updateIntakes", () => {
  let intakes: Intake[];
  beforeEach(() => {
    masterRepository.updateIntakes(intakes);
  });
  describe("空の配列が渡されたとき", () => {
    beforeAll(() => {
      intakes = [];
    });
    it("datastore.updateIntakesが空の配列で呼び出されること", () => {
      expect(DummyDatastore.prototype.updateIntakes).toBeCalledWith([]);
    });
  });
  describe("複数のIntakeが指定されたとき", () => {
    const intakeValues: IIntakeValues[] = [
      { id: 1, timingId: 10, typeId: 100, serving: 5 },
      { id: 2, timingId: 11, typeId: 101, serving: 6 }
    ];
    beforeAll(() => {
      intakes = [
        new Intake(
          intakeValues[0],
          () => masterRepository.getTimingById(1),
          () => masterRepository.getTypeById(1)
        ),
        new Intake(
          intakeValues[1],
          () => masterRepository.getTimingById(1),
          () => masterRepository.getTypeById(1)
        )
      ];
    });
    it("datastore.updateIntakesが期待したパラメータで呼び出されること", () => {
      const expected = intakeValues;
      expect(DummyDatastore.prototype.updateIntakes).toBeCalledWith(expected);
    });
  });
});
