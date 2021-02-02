import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const initialCompanyState = {
  loading: true,
  company: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_COMPANYID":
      return {
        ...state,
        company: action.data,
        loading: action.loading,
      };
    default:
      return;
  }
}

const CompanyStateContext = createContext();
const CompanyDispatchContext = createContext();

export function CompanyProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialCompanyState);

  return (
    <CompanyStateContext.Provider value={state}>
      <CompanyDispatchContext.Provider value={dispatch}>
        {children}
      </CompanyDispatchContext.Provider>
    </CompanyStateContext.Provider>
  );
}

export function useStateCompany() {
  return useContext(CompanyStateContext);
}

export function useDispatchCompany() {
  return useContext(CompanyDispatchContext);
}

export async function getCompanyInfo(dispatch) {
  try {
    const response = await axios.get("http://localhost:8000/GET/COMPANYID");
    dispatch({ type: "GET_COMPANYID", data: response.data, loading: false });
  } catch (e) {
    console.log(e);
  }
}
