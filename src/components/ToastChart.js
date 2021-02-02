import React, { useEffect, useState } from "react";
/* import "@toast-ui/chart/dist/toastui-chart.min.css"; */
import "@toast-ui/chart/dist/toastui-chart.css";
import { ColumnChart } from "@toast-ui/react-chart";

// context API
import {
  useDispatchChart,
  useStateChart,
  getWeekChart,
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
  const [csid, setCsid] = useState("1001");
  const [term, setTerm] = useState("WEEK");

  const chartLoading = state.loading;
  const companyLoading = company_state.loading;

  //const [companyId, setCompanyId] = useState(null);
  useEffect(() => {
    getCompanyInfo(company_dispatch);
    console.log("company state", company_state);
    getWeekChart(dispatch, csid, term);
  }, [dispatch, company_dispatch, csid, term]);

  const ChartShow = () => {
    if (chartLoading) {
      return <div>로딩중...</div>;
    } else {
      return <ColumnChart data={state.data} options={state.options} />;
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
          1주일
        </button>
        <button className="ui button" onClick={() => setTerm("MONTH")}>
          30일
        </button>
        <button className="ui button" onClick={() => setTerm("YEAR")}>
          1년
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {ChartShow()}
      </div>
    </div>
  );
}

export default ToastChart;
