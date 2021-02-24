import React, { useEffect, useState } from "react";
/* import "@toast-ui/chart/dist/toastui-chart.min.css"; */
import "@toast-ui/chart/dist/toastui-chart.css";
import { ColumnChart } from "@toast-ui/react-chart";
import DatePicker from "react-datepicker";
import "../datepicker.css";

// context API
import {
  useDispatchChart,
  useStateChart,
  getBarChart,
  getProductChart,
  setxAxis,
  getSelectDateChart,
} from "../contextAPI/ChartContext";
import {
  useDispatchCompany,
  useStateCompany,
  getCompanyInfo,
} from "../contextAPI/CompanyInfoContext";

function ToastChart() {
  const state = useStateChart();
  const dispatch = useDispatchChart();
  const company_state = useStateCompany();
  const company_dispatch = useDispatchCompany();

  const [show, setShow] = useState(false);
  const [chartVersion, setChartVersion] = useState("Amount");
  const [csid, setCsid] = useState("1002");
  const [term, setTerm] = useState("WEEK");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const containerStyle = {
    width: "80vw",
    height: "60vh",
  };

  const chartLoading = state.loading;
  const companyLoading = company_state.loading;

  //const [companyId, setCompanyId] = useState(null);
  useEffect(() => {
    getCompanyInfo(company_dispatch);
    console.log("company state", company_state);
    //setxAxis(dispatch, term);
    if (chartVersion === "Amount") {
      getBarChart(dispatch, csid, term);
    } else if (chartVersion === "Product") {
      getProductChart(dispatch, csid, term);
    } else if (chartVersion === "StartEnd") {
      getSelectDateChart(dispatch, csid, startDate, endDate);
    } else {
      return <div>do not setting chartVersion</div>;
    }
  }, [
    dispatch,
    company_dispatch,
    csid,
    term,
    chartVersion,
    startDate,
    endDate,
  ]);

  const ChartShow = () => {
    if (chartLoading) {
      return <div>로딩중...</div>;
    } else {
      return (
        <ColumnChart
          style={containerStyle}
          data={state.data}
          options={state.options}
        />
      );
    }
  };

  const dropdownShow = () => {
    setShow(!show);
  };

  const setCompanyId = (sid) => {
    setCsid(sid);
    console.log("change sid = ", csid);
  };

  const CompanyList = () => {
    if (companyLoading) {
      return <div>로딩중...</div>;
    } else {
      return (
        <div className="ui selection dropdown" onClick={() => dropdownShow()}>
          <input type="hidden" name="Company" />
          <i className="dropdown icon"></i>
          <div className="default text">Company</div>
          <div
            className="menu"
            style={{ display: `${show ? "block" : "none"}` }}
          >
            {company_state.company.map((company) => (
              <div
                key={company.sid}
                onClick={() => setCompanyId(company.sid)}
                className="item"
                data-value="0"
              >
                {company.sid}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {CompanyList()}
        <button className="ui button" onClick={() => setTerm("WEEK")}>
          7일
        </button>
        <button className="ui button" onClick={() => setTerm("MONTH")}>
          30일
        </button>
        <button className="ui button" onClick={() => setTerm("YEAR")}>
          1년
        </button>
        <button className="ui button" onClick={() => setChartVersion("Amount")}>
          총량 차트
        </button>
        <button
          className="ui button"
          onClick={() => setChartVersion("Product")}
        >
          제품별 차트
        </button>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        ~
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        <button
          className="ui button"
          onClick={() => setChartVersion("StartEnd")}
        >
          검색
        </button>
      </div>
      <br />
      <div style={{ margin: "auto" }}>{ChartShow()}</div>
    </div>
  );
}

export default ToastChart;
