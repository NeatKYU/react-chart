import React, { useReducer, useContext, createContext } from "react";
import axios from "axios";

const MyWidth = (window.innerWidth * 80) / 100;

/* const success = (data) => ({
  loading: false,
  data: {
    categories: data.categories,
    series: data.series,
  },
  options: {
    chart: {
      width: MyWidth,
      height: 650,
      title: "Monthly Revenue",
    },
    yAxis: {
      title: "Amount",
    },
    xAxis: {
      title: "Month",
    },
  },
  error: null,
});

const error = (error) => ({
  loading: false,
  data: {
    categories: null,
    series: [
      {
        name: null,
        data: null,
      },
    ],
  },
  options: {
    chart: {
      width: MyWidth,
      height: 650,
      title: "Monthly Revenue",
    },
    yAxis: {
      title: "Amount",
    },
    xAxis: {
      title: "Month",
    },
  },
  error: error,
}); */

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
      title: "Week Revenue",
    },
    yAxis: {
      title: "Amount",
    },
    xAxis: {
      title: "Week",
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

export async function getWeekChart(dispatch, sid, term) {
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
