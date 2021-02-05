import React, { useReducer, useContext, createContext } from "react";
import axios from "axios";

const MyWidth = (window.innerWidth * 80) / 100;
const theme = {
  series: {
    dataLabels: {
      fontFamily: "Impact",
      fontSize: 1,
      color: "#ffffff",
      textBubble: {
        visible: true,
        arrow: { visible: true },
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#e91e63",
        backgroundColor: "#0f73a2",
      },
    },
  },
};

const initialData = {
  loading: true,
  data: {
    categories: [
      "2021-01-23",
      "2021-01-24",
      "2021-01-25",
      "2021-01-26",
      "2021-01-27",
      "2021-01-28",
      "2021-01-29",
    ],
    series: [
      {
        name: "amount",
        data: [5000, , 5000, 7000, 6000, 4000, 1000],
      },
    ],
  },
  options: {
    chart: {
      width: MyWidth,
      height: 450,
      title: "? Revenue",
    },
    yAxis: {
      title: "Amount",
    },
    xAxis: {
      title: "?",
    },
    series: {
      dataLabels: {
        visible: true,
      },
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        data: action.data,
        loading: action.loading,
      };
    case "SET_XAXIS":
      return {
        ...state,
        loading: true,
        options: {
          ...state.options,
          chart: {
            ...state.options.chart,
            title: action.title + " Revenue",
          },
          xAxis: {
            title: action.title,
          },
        },
      };
    /* case "GET_DATA_SUCCESS":
      console.log("action data", action.data);
      console.log("state data", state);
      return {
        ...state,
        chartvalue: success(action.data),
      };
    case "GET_DATA_FAIL":
      return {
        ...state,
        error: error(action.error),
      }; */
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

const ChartStateContext = createContext();
const ChartDispatchcontext = createContext();

export function ChartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialData);
  console.log("chart state", state);

  return (
    <ChartStateContext.Provider value={state}>
      <ChartDispatchcontext.Provider value={dispatch}>
        {children}
      </ChartDispatchcontext.Provider>
    </ChartStateContext.Provider>
  );
}

export function useStateChart() {
  return useContext(ChartStateContext);
}

export function useDispatchChart() {
  return useContext(ChartDispatchcontext);
}

export async function getBarChart(dispatch, sid, term) {
  //dispatch({ type: "GET_DATA" });
  try {
    console.log("start getChart");
    const response = await axios.get(
      "http://localhost:8000/SALES/COMPANY/GET/" + term + "/AMOUNT/" + sid
    );
    console.log("res data", response.data);
    if (response.data) {
      const categories = [];
      const series = [
        {
          name: "amount",
          data: [],
        },
      ];
      response.data.map((e) => categories.push(e.day));
      console.log("categories data", categories);
      response.data.map((e) => {
        if (e.AMOUNT === "") {
          series[0].data.push("0");
        } else {
          series[0].data.push(e.AMOUNT);
        }
      });
      console.log("series data", series);
      dispatch({
        type: "GET_DATA",
        data: { categories, series },
        loading: false,
      });
    }
  } catch (e) {
    //dispatch({ type: "GET_DATA_FAIL", error: e });
    console.log(e);
  }
}

export async function getProductChart(dispatch, sid, term) {
  //dispatch({ type: "GET_DATA" });
  try {
    console.log("start getChart");
    const response = await axios.get(
      "http://localhost:8000/SALES/COMPANY/GET/" +
        term +
        "/PRODUCTS-AMOUNT/" +
        sid
    );
    console.log("res data", response.data);
    if (response.data) {
      const categories = response.data.categories;
      const series = [];

      console.log("categories data", categories);
      if (response.data.series) {
        response.data.series.map((e) => {
          const eaArray = {
            name: e.name,
            data: e.ea,
          };
          if (e.name) {
            series.push(eaArray);
          }
        });
      }
      console.log("series data", series);
      dispatch({
        type: "GET_DATA",
        data: { categories, series },
        loading: false,
      });
    }
  } catch (e) {
    //dispatch({ type: "GET_DATA_FAIL", error: e });
    console.log(e);
  }
}

function formattingDateTostring(date) {
  const year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "-" + month + "-" + day;
}

export async function getSelectDateChart(dispatch, sid, start, end) {
  const startday = formattingDateTostring(start);
  const endday = formattingDateTostring(end);
  console.log("startDate: ", startday);
  console.log("endDate: ", endday);
  //dispatch({ type: "GET_DATA" });
  try {
    console.log("start getChart");
    const response = await axios.post(
      "http://localhost:8000/SALES/PERIOD/GET/START-END",
      {
        startday: startday,
        endday: endday,
        company: sid,
      }
    );
    console.log("res data", response.data);
    if (response.data) {
      const categories = [];
      const series = [
        {
          name: "amount",
          data: [],
        },
      ];

      //categories값 집어넣기
      response.data.map((e) => categories.push(e.day));
      console.log("categories data", categories);

      //series값 집어넣기
      response.data.map((e) => {
        if (e.AMOUNT === "") {
          series[0].data.push("0");
        } else {
          series[0].data.push(e.AMOUNT);
        }
      });
      console.log("series data", series);

      dispatch({
        type: "GET_DATA",
        data: { categories, series },
        loading: false,
      });
    }
  } catch (e) {
    //dispatch({ type: "GET_DATA_FAIL", error: e });
    console.log(e);
  }
}

export function setxAxis(dispatch, title) {
  console.log("setxAxis", title);
  try {
    dispatch({ type: "SET_XAXIS", title: title });
  } catch (e) {}
}
