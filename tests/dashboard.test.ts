import DashboardViewModel from "../src/ts/viewModels/dashboard";
import { pieChart } from "./testData";
import { jest } from "@jest/globals";

jest.useFakeTimers();

describe("test dashboard parse", () => {
  const dashboard = new DashboardViewModel();
  describe("pie chart test", () => {
    beforeAll(() => {
      dashboard.handleInputChange({
        detail: {
          value:
            "series1\tseries2\tseries3\tseries4\tseries5\ngroupA\tgroupA\tgroupA\tgroupA\tgroupA\nvalue1\tvalue25\tvalue3\tvalue4\tvalue20",
        },
      });
    });
    it("should be correctly parsed", () => {
      expect(dashboard.chartData()).toStrictEqual(pieChart);
    });
  });
});
