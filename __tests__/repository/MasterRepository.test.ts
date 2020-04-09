import MockedDatastore, {
  createIntake,
  createMaker,
  createSuppli,
  createSuppliAmount,
  createTiming,
  createType,
  init,
  setFetchIntakeReturnValue,
  setFetchMakerReturnValue,
  setFetchSuppliAmountReturnValue,
  setFetchSuppliReturnValue,
  setFetchTimingReturnValue,
  setFetchTypeReturnValue
} from "mocks/datastore/MockDatastore";
import { Datastore } from "src/datastore/Datastore";
import { Intake, IIntakeValues } from "src/model/Intake";
import { Maker, IMakerValues } from "src/model/Maker";
import { Suppli, ISuppliValues } from "src/model/Suppli";
import { SuppliAmount, ISuppliAmountValues } from "src/model/SuppliAmount";
import { Timing, ITimingValues } from "src/model/Timing";
import { Type, ITypeValues } from "src/model/Type";
import MasterRepository from "src/repository/MasterRepository";

let masterRepository: MasterRepository;
let datastore: Datastore;

init();

beforeEach(() => {
  datastore = new MockedDatastore();
  masterRepository = new MasterRepository(datastore);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("getTypes", () => {
  let actual: Type[];
  beforeEach(() => {
    actual = masterRepository.getTypes();
  });
  describe("複数件の場合", () => {
    const fetchTypeReturnValue: ITypeValues[] = [
      createType(1, "type1"),
      createType(2, "type2"),
      createType(3, "type3")
    ];
    beforeAll(() => {
      setFetchTypeReturnValue(fetchTypeReturnValue);
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
    const fetchTypeReturnValue: ITypeValues[] = [];
    beforeAll(() => {
      setFetchTypeReturnValue(fetchTypeReturnValue);
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    const fetchTypeReturnValue: ITypeValues[] = [
      createType(1, "type1"),
      createType(2, "type2"),
      createType(3, "type3")
    ];
    const fetchSuppliReturnValue: ISuppliValues[] = [
      createSuppli(100, 1),
      createSuppli(101, 1),
      createSuppli(102, 3)
    ];
    beforeAll(() => {
      setFetchTypeReturnValue(fetchTypeReturnValue);
      setFetchSuppliReturnValue(fetchSuppliReturnValue);
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

describe("getSupplis", () => {
  const fetchSuppliReturnValue: ISuppliValues[] = [
    createSuppli(1, 10, 100, "suppli1", 10, "unit1"),
    createSuppli(2, 11, 101, "suppli2", 11, "unit2")
  ];
  let actual: Suppli[];
  beforeAll(() => {
    setFetchSuppliReturnValue(fetchSuppliReturnValue);
  });
  beforeEach(() => {
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
      setFetchSuppliReturnValue([]);
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    const fetchSuppliReturnValue: ISuppliValues[] = [
      createSuppli(1, 10, 100, "suppli1", 10, "unit1"),
      createSuppli(2, 11, 101, "suppli2", 11, "unit2")
    ];
    beforeAll(() => {
      setFetchSuppliReturnValue(fetchSuppliReturnValue);
    });
    describe("type", () => {
      const fetchTypeReturnValue: ITypeValues[] = [
        createType(10, "type1"),
        createType(12, "type2")
      ];
      beforeAll(() => {
        setFetchTypeReturnValue(fetchTypeReturnValue);
      });
      it("Suppliが存在する場合はそれが返却されること", () => {
        expect(actual[0].type).toMatchObject(fetchTypeReturnValue[0]);
      });
      it("Suppliが存在しない場合はundefinedが返却されること", () => {
        expect(actual[1].type).toBeUndefined();
      });
    });
    describe("maker", () => {
      const fetchMakerReturnValue: IMakerValues[] = [createMaker(101), createMaker(102)];
      beforeAll(() => {
        setFetchMakerReturnValue(fetchMakerReturnValue);
      });
      it("Makerが存在する場合はそれが返却されること", () => {
        expect(actual[1].maker).toMatchObject(fetchMakerReturnValue[0]);
      });
      it("Makerが存在しない場合はundefinedが返却されること", () => {
        expect(actual[0].maker).toBeUndefined();
      });
    });
    describe("suppliAmounts", () => {
      const fetchSuppliAmountReturnValue: ISuppliAmountValues[] = [
        createSuppliAmount(1000, 1),
        createSuppliAmount(1001, 1),
        createSuppliAmount(1002, 3)
      ];
      beforeAll(() => {
        setFetchSuppliAmountReturnValue(fetchSuppliAmountReturnValue);
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
  beforeEach(() => {
    actual = masterRepository.getMakers();
  });
  describe("複数件の場合", () => {
    const fetchMakerReturnValue: IMakerValues[] = [
      createMaker(1, "maker1"),
      createMaker(2, "maker2"),
      createMaker(3, "maker3")
    ];
    beforeAll(() => {
      setFetchMakerReturnValue(fetchMakerReturnValue);
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
    const fetchMakerReturnValue: IMakerValues[] = [];
    beforeAll(() => {
      setFetchMakerReturnValue(fetchMakerReturnValue);
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    const fetchMakerReturnValue: IMakerValues[] = [
      createMaker(1, "maker1"),
      createMaker(2, "maker2"),
      createMaker(3, "maker3")
    ];
    const fetchSuppliReturnValue: ISuppliValues[] = [
      createSuppli(100, 10, 1),
      createSuppli(101, 10, 1),
      createSuppli(102, 10, 3)
    ];
    beforeAll(() => {
      setFetchMakerReturnValue(fetchMakerReturnValue);
      setFetchSuppliReturnValue(fetchSuppliReturnValue);
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
  const fetchSuppliAmountsReturnValue: ISuppliAmountValues[] = [
    createSuppliAmount(1, 11, 101),
    createSuppliAmount(2, 12, 102),
    createSuppliAmount(3, 13, 103)
  ];
  let actual: SuppliAmount[];
  beforeAll(() => {
    setFetchSuppliAmountReturnValue(fetchSuppliAmountsReturnValue);
  });
  beforeEach(() => {
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
      setFetchSuppliAmountReturnValue([]);
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    const fetchSuppliAmountsReturnValue: ISuppliAmountValues[] = [
      createSuppliAmount(1, 10),
      createSuppliAmount(2, 11)
    ];
    const fetchSuppliReturnValue: ISuppliValues[] = [createSuppli(10)];
    beforeAll(() => {
      setFetchSuppliAmountReturnValue(fetchSuppliAmountsReturnValue);
      setFetchSuppliReturnValue(fetchSuppliReturnValue);
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
  const fetchTimingReturnValue: ITimingValues[] = [
    { id: 1, name: "timing1" },
    { id: 2, name: "timing2" },
    { id: 3, name: "timing3" }
  ];
  let actual: Timing[];
  beforeAll(() => {
    setFetchTimingReturnValue(fetchTimingReturnValue);
  });
  beforeEach(() => {
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
      setFetchTimingReturnValue([]);
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    const fetchTimingReturnValue: ITimingValues[] = [createTiming(1), createTiming(2)];
    const fetchIntakeReturnValue: IIntakeValues[] = [createIntake(10, 1), createIntake(11, 1)];
    beforeAll(() => {
      setFetchTimingReturnValue(fetchTimingReturnValue);
      setFetchIntakeReturnValue(fetchIntakeReturnValue);
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
  const fetchIntakeReturnValue: IIntakeValues[] = [
    createIntake(1, 10, 100, 5),
    createIntake(2, 11, 101, 6),
    createIntake(2, 12, 102, 6)
  ];
  let actual: Intake[];
  beforeAll(() => {
    setFetchIntakeReturnValue(fetchIntakeReturnValue);
  });
  beforeEach(() => {
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
      setFetchIntakeReturnValue([]);
    });
    it("空配列が返却されること", () => {
      expect(actual).toEqual([]);
    });
  });
  describe("relationの確認", () => {
    const fetchIntakeReturnValue: IIntakeValues[] = [
      createIntake(1, 10, 100),
      createIntake(2, 10, 102),
      createIntake(3, 12, 102)
    ];
    beforeAll(() => {
      setFetchIntakeReturnValue(fetchIntakeReturnValue);
    });
    describe("timing", () => {
      const fetchTimingReturnValue: ITimingValues[] = [createTiming(10), createTiming(11)];
      beforeAll(() => {
        setFetchTimingReturnValue(fetchTimingReturnValue);
      });
      it("Timingが存在する場合はそれが返却されること", () => {
        expect(actual[0].timing.id).toEqual(10);
      });
      it("Timingが存在しない場合は空配列が返却されること", () => {
        expect(actual[2].timing).toBeUndefined();
      });
    });
    describe("type", () => {
      const fetchTypeReturnValue: ITypeValues[] = [createType(101), createType(102)];
      beforeAll(() => {
        setFetchTypeReturnValue(fetchTypeReturnValue);
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
