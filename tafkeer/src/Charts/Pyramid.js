import * as React from "react";

import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  AccumulationDataLabel,
  AccumulationTooltip,
  PyramidSeries,
  AccumulationSelection,
} from "@syncfusion/ej2-react-charts";

export let data1 = [
  { x: "Ignored", y: 120, text: "120 Ignored" },
  { x: "Missed", y: 435, text: "435 Missed" },
  { x: "Error", y: 470, text: "470 Error" },
  { x: "Linting Error", y: 475, text: "475 Lints" },
  { x: "Warning", y: 520, text: "520 Warnings" },
  { x: "Passed", y: 930, text: "930 Passed" },
];

const Pyramid = () => {
  const pyramid = React.useRef();

  return (
    <div className="control-pane" >
      <div className="control-section row">
        <div className="col">
          <AccumulationChartComponent
            id="pyramid-chart"
            ref={pyramid}
            title="Test Coverage Chart"
            legendSettings={{
              visible: false,
            }}
            //   load={this.load.bind(this)}
            tooltip={{ enable: true, format: "${point.x} : <b>${point.y} cal</b>" }}
            //   loaded={this.onChartLoad.bind(this)}
            //   resized={this.chartResized.bind(this)}
            width="100%"
            height="80%"
            background="black"
          >
            <Inject
              services={[
                AccumulationDataLabel,
                AccumulationTooltip,
                PyramidSeries,
                AccumulationLegend,
                AccumulationSelection,
              ]}
            />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                name="Test"
                dataSource={data1}
                xName="x"
                yName="y"
                type="Pyramid"
                width="45%"
                height="80%"
                neckWidth="15%"
                gapRatio={0.03}
                explode={true}
                emptyPointSettings={{ mode: "Drop", fill: "red" }}
                dataLabel={{
                  visible: true,
                  position: "Inside",
                  name: "text",
                }}
              ></AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
      </div>
    </div>
  );
};

export default Pyramid;