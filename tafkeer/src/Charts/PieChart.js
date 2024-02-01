import * as React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  AccumulationDataLabel,
} from "@syncfusion/ej2-react-charts";

export let data1 = [
  { x: "Passed", y: 37, text: "37%" },
  { x: "Lints", y: 17, text: "17%" },
  { x: "Warning", y: 19, text: "19%" },
  { x: "Ignored", y: 4, text: "4%" },
  { x: "Missed", y: 11, text: "11%" },
  { x: "Error", y: 12, text: "12%" },
];

const Pie = () => {
  const pie = React.useRef();

  return (
    <div className="control-pane" style={{
      
    }}>
      <div className="control-section row">
        <div className="col">
          <AccumulationChartComponent
            id="pie-chart"
            ref={pie}
            title="Test Covergae Statistics"
            // load={this.load.bind(this)}
            legendSettings={{ visible: false }}
            enableSmartLabels={true}
            enableAnimation={false}
            center={{ x: "50%" }}
            tooltip={{ enable: true, format: "${point.x} : <b>${point.y}%</b>" }}
            // loaded={this.onChartLoad.bind(this)}
          >
            <Inject
              services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel]}
            />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                dataSource={data1}
                name="Browser"
                xName="x"
                yName="y"
                explode={true}
                explodeOffset="10%"
                explodeIndex={0}
                dataLabel={{
                  visible: true,
                  position: "Inside",
                  name: "text",
                  font: {
                    fontWeight: "600",
                  },
                }}
                radius="70%"
              ></AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
      </div>
    </div>
  );
};

export default Pie;