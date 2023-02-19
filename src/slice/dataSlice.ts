import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { eID } from "../App";

export interface IDataElement {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId: null | number;
  rowName: string;
  salary: number;
  supportCosts: number;
  id?: number;
  child?: Array<IDataElement>;
}

export interface IDataState {
  data: IData;
}

interface IData {
  status: string | null;
  error: string | null;
  data: Array<IDataElement>;
}

export const emptyElement: IDataElement = {
  equipmentCosts: 0,
  estimatedProfit: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  overheads: 0,
  parentId: null,
  rowName: " ",
  salary: 0,
  supportCosts: 0,
  id: 0,
};

export const getData: any = createAsyncThunk("data/getData", async () => {
  const data = await axios
    .get(`http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/list`)
    .then((res) => {
      return res.data;
    });
  return data;
});

export const createRow: any = createAsyncThunk(
  "data/createRow",
  async (element: IDataElement) => {
    const data = await axios
      .post(
        `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/create`,
        element
      )
      .then((res) => res.data);
    return { data: data.current, parentID: element.parentId };
  }
);

export const deleteRow: any = createAsyncThunk(
  "data/deleteRow",
  async (rID: number) => {
    const data = await axios.delete(
      `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/${rID}/delete`
    );
    return rID;
  }
);

export const updateRow: any = createAsyncThunk(
  "data/updateRow",
  async (dataEl: any) => {
    const element = {
      equipmentCosts: dataEl.element.equipmentCosts,
      estimatedProfit: dataEl.element.estimatedProfit,
      machineOperatorSalary: 0,
      mainCosts: 0,
      materials: 0,
      mimExploitation: 0,
      overheads: dataEl.element.overheads,
      rowName: dataEl.element.rowName,
      salary: dataEl.element.salary,
      supportCosts: 0,
    };
    const data = await axios.post(
      `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/${dataEl.id}/update`,
      element
    );
    return data.data.current;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: { status: null, error: null, data: [emptyElement] },
  reducers: {},
  extraReducers: {
    [getData.pending]: (state: IData) => {
      state.status = "pending";
      state.error = null;
    },
    [getData.fulfilled]: (
      state: IData,
      action: PayloadAction<Array<IDataElement>>
    ) => {
      state.status = "resolved";
      state.data = action.payload;
    },
    [getData.rejected]: (state: IData) => {
      state.status = "rejected";
    },

    [createRow.pending]: (state: IData) => {
      state.status = "pending";
      state.error = null;
    },
    [createRow.fulfilled]: (state: IData, action: any) => {
      state.status = "resolved";

      const recursiveSearch = (data: Array<IDataElement>, parentId: number) => {
        if (parentId === null) {
          state.data.push(action.payload.data);
          return;
        }
        data.find((el) => {
          if (el.id === parentId) {
            if (!el.child) el.child = [];
            el.child.push(action.payload.data);
            return el.id === parentId;
          }
          if (el.child && el.child?.length > 0) {
            recursiveSearch(el.child, parentId);
          }
          return el.id === parentId;
        });
      };

      recursiveSearch(state.data, action.payload.parentID);
    },

    [deleteRow.pending]: (state: IData) => {
      state.status = "pending";
      state.error = null;
    },
    [deleteRow.fulfilled]: (state: IData, action: PayloadAction<number>) => {
      state.status = "resolved";

      const recursiveSearch = (data: Array<IDataElement>, searchId: number) => {
        data.find((el, index) => {
          if (el.id === searchId) {
            data.splice(index, 1);
            return el.id === searchId;
          }
          if (el.child && el.child?.length > 0) {
            recursiveSearch(el.child, searchId);
          }
          return el.id === searchId;
        });
      };

      recursiveSearch(state.data, action.payload);
    },

    [updateRow.pending]: (state: IData) => {
      state.status = "pending";
      state.error = null;
    },
    [updateRow.fulfilled]: (
      state: IData,
      action: PayloadAction<IDataElement>
    ) => {
      state.status = "resolved";

      const recursiveSearch = (data: Array<IDataElement>, searchId: number) => {
        data.find((el, index) => {
          if (el.id === searchId) {
            action.payload.child = data[index].child;
            data.splice(index, 1, action.payload);
            return el.id === searchId;
          }
          if (el.child && el.child?.length > 0) {
            recursiveSearch(el.child, searchId);
          }
          return el.id === searchId;
        });
      };

      action.payload.id && recursiveSearch(state.data, action.payload.id);
    },
  },
});

export const {} = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
