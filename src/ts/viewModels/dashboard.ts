import * as ko from "knockout";
import ArrayDataProvider from "ojs/ojarraydataprovider";
import { ViewModel } from "../models";
import "ojs/ojlabel";
import "ojs/ojselectsingle";
import "ojs/ojchart";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojbutton";
import "ojs/ojformlayout";
import { ojButtonEventMap } from "ojs/ojbutton";

const SERIES = "series";
const GROUP = "group";

function parseCell(value: string, key: string): { key: string; value: string } {
  return {
    key: value.substring(0, key.length),
    value: value.substring(key.length, value.length),
  };
}

// \n row
// \t column
// pie char data: series1\tseries2\tseries3\tseries4\tseries5\ngroupA\tgroupA\tgroupA\tgroupA\tgroupA\nvalue1\tvalue25\tvalue3\tvalue4\tvalue20
// bar chart data: series1\tseries2\tseries3\tseries4\tseries5\ngroupGroupA\tgroupB\tgroupC\tgroupD\tgroupE\nvalue1\tvalue25\tvalue3\tvalue4\tvalue20
// scatter plot data: series1\tseries1\tseries2\tseries2\ngroupA\tgroupB\tgroupC\tgroupA\nx15\tx25\tx33\tx44\ny25\ty30\ty23\ty22\nz5\tz12\tz8\tz5

class DashboardViewModel implements ViewModel {
  types = [
    { value: "pie", label: "Pie" },
    { value: "bar", label: "Bar" },
    { value: "scatter", label: "Scatter" },
  ];

  data = ko.observable("");

  selectedChart = ko.observable("pie");

  chartTypes = new ArrayDataProvider(this.types, {
    keyAttributes: "value",
  });

  chartData = ko.observableArray();

  chartDataProvider = new ArrayDataProvider(this.chartData, {
    keyAttributes: "id",
  });

  connected() {
    document.title = "Dashboard";
  }

  private parseUserInput = (value: string) => {
    const data = [];
    const rows = value.trim().split("\\n");
    rows.forEach((row) => {
      const cells = row.split("\\t");
      cells.forEach((cell, idx) => {
        let charObject = data[idx] ?? { id: idx };
        const isSeries = cell.includes(SERIES);
        const isGroup = cell.includes(GROUP);
        // for charts group and series can be provided
        if (isSeries || isGroup) {
          const { key, value } = parseCell(cell, isSeries ? SERIES : GROUP);
          charObject = {
            ...charObject,
            [key]: isSeries ? `Series ${value}` : value,
          };
        } else {
          // rest of values are string key and number value pair, for now will crash if user will pass array
          const matchedNumber = cell.match(/\d+/g);
          if (matchedNumber) {
            const [num] = matchedNumber;
            charObject = {
              ...charObject,
              [cell.substring(0, cell.length - num.length)]: Number(num),
            };
          }
        }
        data[idx] = { ...charObject };
      });
    });
    return data;
  };

  public handleInputChange = ({ detail: { value } }) => {
    this.chartData(this.parseUserInput(value));
  };

  public buttonClick = (event: ojButtonEventMap["ojAction"]) => {
    this.selectedChart((event.currentTarget as HTMLElement).id);
    return true;
  };
}

export = DashboardViewModel;
