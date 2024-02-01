import * as React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  StackingAreaSeries,
  Legend,
} from "@syncfusion/ej2-react-charts";

export let data1 = [
  { x: new Date(2000, 0, 1), y: 0.61 },
  { x: new Date(2001, 0, 1), y: 0.81 },
  { x: new Date(2002, 0, 1), y: 0.91 },
  { x: new Date(2003, 0, 1), y: 1 },
  { x: new Date(2004, 0, 1), y: 1.19 },
  { x: new Date(2005, 0, 1), y: 1.47 },
  { x: new Date(2006, 0, 1), y: 1.74 },
  { x: new Date(2007, 0, 1), y: 1.98 },
  { x: new Date(2008, 0, 1), y: 1.99 },
  { x: new Date(2009, 0, 1), y: 1.7 },
  { x: new Date(2010, 0, 1), y: 1.48 },
  { x: new Date(2011, 0, 1), y: 1.38 },
  { x: new Date(2012, 0, 1), y: 1.66 },
  { x: new Date(2013, 0, 1), y: 1.66 },
  { x: new Date(2014, 0, 1), y: 1.67 },
];
export let data2 = [
  { x: new Date(2000, 0, 1), y: 0.03 },
  { x: new Date(2001, 0, 1), y: 0.05 },
  { x: new Date(2002, 0, 1), y: 0.06 },
  { x: new Date(2003, 0, 1), y: 0.09 },
  { x: new Date(2004, 0, 1), y: 0.14 },
  { x: new Date(2005, 0, 1), y: 0.2 },
  { x: new Date(2006, 0, 1), y: 0.29 },
  { x: new Date(2007, 0, 1), y: 0.46 },
  { x: new Date(2008, 0, 1), y: 0.64 },
  { x: new Date(2009, 0, 1), y: 0.75 },
  { x: new Date(2010, 0, 1), y: 1.06 },
  { x: new Date(2011, 0, 1), y: 1.25 },
  { x: new Date(2012, 0, 1), y: 1.55 },
  { x: new Date(2013, 0, 1), y: 1.55 },
  { x: new Date(2014, 0, 1), y: 1.65 },
];
export let data3 = [
  { x: new Date(2000, 0, 1), y: 0.48 },
  { x: new Date(2001, 0, 1), y: 0.53 },
  { x: new Date(2002, 0, 1), y: 0.57 },
  { x: new Date(2003, 0, 1), y: 0.61 },
  { x: new Date(2004, 0, 1), y: 0.63 },
  { x: new Date(2005, 0, 1), y: 0.64 },
  { x: new Date(2006, 0, 1), y: 0.66 },
  { x: new Date(2007, 0, 1), y: 0.76 },
  { x: new Date(2008, 0, 1), y: 0.77 },
  { x: new Date(2009, 0, 1), y: 0.55 },
  { x: new Date(2010, 0, 1), y: 0.54 },
  { x: new Date(2011, 0, 1), y: 0.57 },
  { x: new Date(2012, 0, 1), y: 0.61 },
  { x: new Date(2013, 0, 1), y: 0.67 },
  { x: new Date(2014, 0, 1), y: 0.67 },
];
export let data4 = [
  { x: new Date(2000, 0, 1), y: 0.23 },
  { x: new Date(2001, 0, 1), y: 0.17 },
  { x: new Date(2002, 0, 1), y: 0.17 },
  { x: new Date(2003, 0, 1), y: 0.2 },
  { x: new Date(2004, 0, 1), y: 0.23 },
  { x: new Date(2005, 0, 1), y: 0.36 },
  { x: new Date(2006, 0, 1), y: 0.43 },
  { x: new Date(2007, 0, 1), y: 0.52 },
  { x: new Date(2008, 0, 1), y: 0.72 },
  { x: new Date(2009, 0, 1), y: 1.29 },
  { x: new Date(2010, 0, 1), y: 1.38 },
  { x: new Date(2011, 0, 1), y: 1.82 },
  { x: new Date(2012, 0, 1), y: 2.16 },
  { x: new Date(2013, 0, 1), y: 2.51 },
  { x: new Date(2014, 0, 1), y: 2.61 },
];

const StackedArea = () => {
  return (
    <div className="control-pane" style={{borderRadius:'10px', backgroundColor:'black'}}>
      <div className="control-section">
        <ChartComponent
          id="stacked-area-charts"
          background='black'
          style={{ textAlign: "center" }}
          primaryXAxis={{
            valueType: "DateTime",
            intervalType: "Years",
            majorGridLines: { width: 0 },
            labelFormat: "y",
            edgeLabelPlacement: "Shift",
          }}
          //   load={this.load.bind(this)}
          primaryYAxis={{
            title: "Spends",
            minimum: 0,
            maximum: 7,
            interval: 1,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            labelFormat: "{value}B",
          }}
          chartArea={{ border: { width: 0 } }}
          //   width={Browser.isDevice ? "100%" : "60%"}
          title="Trend in Sales of Ethical Produce"
          //   loaded={this.onChartLoad.bind(this)}

          height="250px"
        >
          <Inject services={[StackingAreaSeries, Legend, DateTime]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data1}
              xName="x"
              yName="y"
              name="Ignored"
              type="StackingArea"
              fill="gray"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data2}
              xName="x"
              yName="y"
              name="Lint"
              type="StackingArea"
              fill="yellow"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data3}
              xName="x"
              yName="y"
              name="Warnings"
              type="StackingArea"
              fill="orange"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data4}
              xName="x"
              yName="y"
              name="Passed"
              type="StackingArea"
              fill="green"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default StackedArea;