import LineChart from "./Charts/LineChart";
import PieChart from "./Charts/PieChart";
import PyramidChart from "./Charts/Pyramid";
import StackedArea from "./Charts/StackedArea";
import {
    DashboardLayoutComponent,
    PanelsDirective,
    PanelDirective,
   } from "@syncfusion/ej2-react-layouts";
   
   import "/node_modules/@syncfusion/ej2/material.css";
//import TestCoverage from "./Charts/TestCoverage";
export default function DataAnalystCharts() {
    const onCreate = (args) => {
    };
    const onPanelResize = (args) => {
        /*if (
          args.element &&
          args.element.querySelector(".e-panel-container .e-panel-content div div div")
        ) {
          let chartObj = args.element.querySelector(".e-panel-container .e-panel-content div div div")
            .ej2_instances[0];
          const height = args.element.querySelector(".e-panel-container .e-panel-content").clientHeight;
          chartObj.height = `${height - 20}`;
          chartObj.width = "100%";
          chartObj.refresh();
        }*/
      };
    return (
        <DashboardLayoutComponent
        created={onCreate}
        columns={6}
        id="predefine_dashboard"
        cellSpacing={[5, 5]}
        resizeStop={onPanelResize}
        allowResizing={true}
        allowDragging={true}
        >
        <PanelsDirective>
            {/*<PanelDirective
            header=""
            content={TestCoverage}
            sizeX={1}
            sizeY={1}
            row={0}
            col={0}
            ></PanelDirective>*/}
            {/*<PanelDirective
            header=""
            content={LineChart}
            sizeX={2}
            sizeY={1}
            row={0}
            col={1}
            background='black'
        ></PanelDirective>*/}
            {/*<PanelDirective
            header=""
            content={StackedArea}
            sizeX={2}
            sizeY={1}
            row={0}
            col={3}
    ></PanelDirective>*/}
            <PanelDirective
            header=""
            content={PyramidChart}
            sizeX={2}
            sizeY={1}
            row={2}
            col={0}
            ></PanelDirective>
            <PanelDirective
            header=""
            content={PieChart}
            sizeX={2}
            sizeY={1}
            row={2}
            col={4}
            ></PanelDirective>
        </PanelsDirective>
        </DashboardLayoutComponent>
    )
}