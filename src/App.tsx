import { useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { columnDefs, secondColumnDefs, type Car } from "./columnDefs";
import { rowCarData } from "./rowData";

// Register the Community features used by this example.
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [quickFilterText, setQuickFilterText] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [show, setShow] = useState(true);

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
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          minHeight: "48px",
        }}
      >
        <h1
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            margin: 0,
            fontSize: "32px",
            whiteSpace: "nowrap",
          }}
        >
          AG Grid Examples
        </h1>
        <button
          onClick={() => setShow((currentShow) => !currentShow)}
          style={{
            width: "160px",
            fontStyle: "bold",
            backgroundColor: "yellow",
          }}
        >
          {show ? "Show Easy" : "Show Harder"} Grids
        </button>
      </div>

      {show && (
        <>
          <h2 style={{ margin: "0 0 8px", fontSize: "22px" }}>Basic Grid</h2>
          {/* Grid requires a container with a defined height. */}
          <div style={{ height: "260px", width: "100%" }}>
            <AgGridReact<Car> rowData={rowCarData} columnDefs={columnDefs} />
          </div>

          <h2 style={{ margin: "0 0 8px", fontSize: "22px" }}>
            Grid with Filters
          </h2>

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
                {[...new Set(rowCarData.map(({ make }) => make))].map(
                  (make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>
          <div style={{ height: "260px", width: "100%" }}>
            <AgGridReact<Car>
              rowData={
                selectedMake
                  ? rowCarData.filter(({ make }) => make === selectedMake)
                  : rowCarData
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

          <h2 style={{ margin: "0 0 8px", fontSize: "22px" }}>
            Grid with Selection
          </h2>

          {/* Graph requires a container with defined height */}
          <div style={{ height: "260px", width: "100%" }}>
            <AgGridReact<Car>
              rowData={rowCarData}
              columnDefs={columnDefs}
              rowSelection={{
                mode: "multiRow",
                checkboxes: true,
                headerCheckbox: true,
                enableClickSelection: true,
              }}
            />
          </div>
        </>
      )}

      {!show && (
        <>
          <h2 style={{ margin: "0 0 8px", fontSize: "22px" }}>Hard Grid</h2>
        </>
      )}
    </main>
  );
}

export default App;
