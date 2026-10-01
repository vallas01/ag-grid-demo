import { useRef, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry as CommunityModuleRegistry,
} from "ag-grid-community";
import type { GridApi } from "ag-grid-community";
import {
  AllEnterpriseModule,
  ModuleRegistry as EnterpriseModuleRegistry,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import {
  columnDefs,
  secondColumnDefs,
  salesColumnDefs,
  type Car,
  type Sales,
} from "./columnDefs";
import { rowCarData, rowSalesData } from "./rowData";

// Easy grid features are available in Community (free); Hard grid features use Enterprise (paid).
CommunityModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [quickFilterText, setQuickFilterText] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [show, setShow] = useState(true);
  const salesGridApi = useRef<GridApi<Sales> | null>(null);

  function toggleGridExamples() {
    const showFreeGrids = !show;

    if (showFreeGrids) {
      CommunityModuleRegistry.registerModules([AllCommunityModule]);
    } else {
      EnterpriseModuleRegistry.registerModules([AllEnterpriseModule]);
    }

    setShow(showFreeGrids);
  }

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
          onClick={toggleGridExamples}
          style={{
            width: "140px",
            fontStyle: "bold",
            backgroundColor: "yellow",
          }}
        >
          Show {show ? "Paid" : "Free"} Grids
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
    <h2 style={{ margin: "0 0 8px", fontSize: "22px" }}>
      Enterprise (paid)
    </h2>

    <div
      style={{
        display: "flex",
        gap: "8px",
        marginBottom: "8px",
      }}
    >
      <button
        onClick={() => {
          salesGridApi.current?.applyTransaction({
            add: [
              {
                id: Date.now(),
                customer: "New Customer",
                region: "Northeast",
                product: "Laptop",
                revenue: 150000,
                status: "won",
              },
            ],
          });
        }}
      >
        Add Sale
      </button>

      <button
        onClick={() => {
          const selectedRows =
            salesGridApi.current?.getSelectedRows();

          if (selectedRows?.length) {
            salesGridApi.current?.applyTransaction({
              remove: selectedRows,
            });
          }
        }}
      >
        Remove Selected
      </button>

      <button
        onClick={() => {
          salesGridApi.current?.exportDataAsCsv({
            fileName: "sales-data.csv",
          });
        }}
      >
        Export CSV
      </button>
    </div>

    <div
      style={{
        height: "600px",
        width: "100%",
      }}
    >
      <AgGridReact<Sales>
        ref={(grid) => {
          salesGridApi.current = grid?.api ?? null;
        }}
        rowData={rowSalesData}
        columnDefs={salesColumnDefs}
        getRowId={(params) => String(params.data.id)}
        defaultColDef={{
          flex: 1,
          minWidth: 130,
          sortable: true,
          resizable: true,
          filter: true,
          floatingFilter: true,
        }}
        rowSelection={{
          mode: "multiRow",
          checkboxes: true,
          headerCheckbox: true,
          enableClickSelection: true,
        }}
        sideBar="columns"
        pivotMode={false}
        groupDefaultExpanded={1}
        grandTotalRow="bottom"
        statusBar={{
          statusPanels: [
            {
              statusPanel: "agTotalAndFilteredRowCountComponent",
              align: "left",
            },
            {
              statusPanel: "agSelectedRowCountComponent",
              align: "center",
            },
            {
              statusPanel: "agAggregationComponent",
              align: "right",
            },
          ],
        }}
      />
    </div>
  </>
)}
      
    </main>
  );
}

export default App;
