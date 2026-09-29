import { useMemo, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
  type ICellRendererParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Register the Community features used by this example.
ModuleRegistry.registerModules([AllCommunityModule]);

type Car = {
  make: string;
  model: string;
  year: number;
  price: number;
  releaseDate: Date;
};

const rowData: Car[] = [
  {
    make: "Toyota",
    model: "Celica",
    year: 2000,
    price: 35000,
    releaseDate: new Date(2000, 0, 1),
  },
  {
    make: "Ford",
    model: "Mondeo",
    year: 2001,
    price: 32000,
    releaseDate: new Date(2001, 0, 1),
  },
  {
    make: "Porsche",
    model: "Boxster",
    year: 2002,
    price: 72000,
    releaseDate: new Date(2002, 0, 1),
  },
];

// A cell renderer controls how a value is displayed; it does not change the data.
function MakeCellRenderer({ value }: ICellRendererParams<Car, string>) {
  return <strong style={{ color: "#2563eb" }}>{value}</strong>;
}

function App() {
  const [quickFilterText, setQuickFilterText] = useState("");
  const [selectedMake, setSelectedMake] = useState("");

  const columnDefs = useMemo<ColDef<Car>[]>(
    () => [
      {
        field: "make",
        filter: "agTextColumnFilter",
        // Use a React component for custom cell display. Editing still uses the text editor.
        cellRenderer: MakeCellRenderer,
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
    ],
    [],
  );

  // Reuse the shared column settings and add currency formatting only to the second grid.
  const secondColumnDefs = useMemo<ColDef<Car>[]>(
    () =>
      columnDefs.map((col) =>
        col.field === "price"
          ? {
              ...col,
              // Change how price is displayed without changing its numeric value in rowData.
              valueFormatter: ({ value }) =>
                value == null
                  ? ""
                  : new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(value),
              // Cell styles can be calculated from each row's current value.
              cellStyle: ({ value }) => ({
                color: value >= 50000 ? "#b91c1c" : "#166534",
                fontWeight: value >= 50000 ? "bold" : "normal",
              }),
            }
          : col,
      ),
    [columnDefs],
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <h1 style={{ margin: "0 0 8px", fontSize: "32px" }}>AG Grid Example</h1>

      <h2 style={{ margin: "0 0 8px", fontSize: "22px" }}>Basic Grid</h2>

      {/* Graph requires a container with defined height */}
      <div style={{ height: "260px", width: "100%" }}>
        <AgGridReact<Car> rowData={rowData} columnDefs={columnDefs} />
      </div>

      <h2 style={{ margin: "0 0 8px", fontSize: "22px" }}>Grid with Filters</h2>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "4px",
          alignItems: "center",
        }}
      >
        <label>
          Quick filter{" "}
          <input
            type="search"
            value={quickFilterText}
            onChange={(event) => setQuickFilterText(event.target.value)}
            placeholder="Search all columns"
          />
        </label>
        {/* Community-friendly set-style filter; the built-in Set Filter requires Enterprise. */}
        <label>
          Make values{" "}
          <select
            value={selectedMake}
            onChange={(event) => setSelectedMake(event.target.value)}
          >
            <option value="">All makes</option>
            {[...new Set(rowData.map(({ make }) => make))].map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ height: "260px", width: "100%" }}>
        <AgGridReact<Car>
          rowData={
            selectedMake
              ? rowData.filter(({ make }) => make === selectedMake)
              : rowData
          }
          columnDefs={secondColumnDefs}
          quickFilterText={quickFilterText}
          defaultColDef={{
            flex: 1,
            minWidth: 120,
            sortable: true,
            resizable: true,
            // Show an inline filter control below each filterable column header.
            floatingFilter: true,
          }}
        />
      </div>
    </main>
  );
}

export default App;
