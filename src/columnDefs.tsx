import {
  type ColDef,
  type ICellRendererParams,
} from "ag-grid-community";

export type Car = {
  make: string;
  model: string;
  year: number;
  price: number;
  releaseDate: Date;
};

export type Sales = {
  id: number;
  customer: string;
  region: string;
  product: string;
  revenue: number;
  status:  string;
}

// A cell renderer controls how a value is displayed; it does not change the data.
function MakeCellRenderer({ value }: ICellRendererParams<Car, string>) {
  return <strong style={{ color: "#2563eb" }}>{value}</strong>;
}

export const columnDefs: ColDef<Car>[] = [
  {
    field: "make",
    filter: "agTextColumnFilter",
    editable: true,
    cellEditor: "agTextCellEditor",
  },
  {
    field: "model",
    filter: "agTextColumnFilter",
    editable: true,
    cellEditor: "agTextCellEditor",
  },
  {
    field: "year",
    filter: "agNumberColumnFilter",
    editable: true,
    cellEditor: "agNumberCellEditor",
  },
  {
    field: "releaseDate",
    headerName: "Release date",
    filter: "agDateColumnFilter",
  },
  {
    field: "price",
    filter: "agNumberColumnFilter",
    editable: true,
    cellEditor: "agNumberCellEditor",
  },
];

// Reuse shared column settings and add formatting and rendering for the second grid.
export const secondColumnDefs: ColDef<Car>[] = columnDefs.map((col) => {
  if (col.field === "price") {
    return {
      ...col,
      // Format the displayed text without changing the numeric value in rowData.
      valueFormatter: ({ value }) =>
        value == null
          ? ""
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(value),
      // Style the price based on its current value.
      cellStyle: ({ value }) => ({
        color: value >= 50000 ? "#b91c1c" : "#166534",
        fontWeight: value >= 50000 ? "bold" : "normal",
      }),
    };
  }

  if (col.field === "make") {
    return {
      ...col,
      // Use a React component for custom cell display.
      cellRenderer: MakeCellRenderer,
    };
  }

  return col;
});


export const salesColumnDefs: ColDef<Sales>[] = [
  {
    field: "customer",
    headerName: "Customer",
    filter: "agTextColumnFilter",
    enableRowGroup: true,
    enablePivot: true,
  },
  {
    field: "region",
    headerName: "Region",
    filter: "agTextColumnFilter",
    enableRowGroup: true,
    enablePivot: true,
  },
  {
    field: "product",
    headerName: "Product",
    filter: "agTextColumnFilter",
    enableRowGroup: true,
    enablePivot: true,
  },
  {
    field: "revenue",
    headerName: "Revenue",
    filter: "agNumberColumnFilter",
    type: "numericColumn",
    enableValue: true,
    aggFunc: "sum",
    valueFormatter: ({ value }) =>
      value == null
        ? ""
        : new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(value),
  },
  {
    field: "status",
    headerName: "Status",
    filter: "agTextColumnFilter",
    enableRowGroup: true,
    cellStyle: ({ value }) => {
      if (value === "won") {
        return {
          color: "#166534",
          fontWeight: "bold",
        };
      }

      if (value === "pending") {
        return {
          color: "#92400e",
          fontWeight: "bold",
        };
      }

      return {
        color: "#b91c1c",
        fontWeight: "bold",
      };
    },
  },
];