# AG Grid Practice Project

This project demonstrates AG Grid Community and Enterprise features. **Enterprise features require a paid AG Grid subscription and a valid license.** Use the button at the top of the app to switch between the Community (free) grids and the Enterprise (paid) grid examples. The module registry is global and additive: after Enterprise modules are registered, reload the page to return to a Community-only session.

## Run the project

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Examples

### Community (free)

- Basic car data grid with editable cells
- Filters grid with quick search, make selection, column filters, and floating filters
- Row selection with row and header checkboxes
- Custom price formatting and conditional cell styling

### Enterprise (paid)

- Sales data grid with grouping and pivoting enabled
- Columns tool panel and status bar
- Multi-row selection
- Add and remove rows using grid transactions
- Export data as CSV

## Source files

- `src/App.tsx` — page layout, Community/Enterprise toggle, and grid options
- `src/columnDefs.tsx` — typed column definitions for car and sales data
- `src/rowData.tsx` — sample car and sales rows

The grids need containers with explicit heights so AG Grid can render its rows. The examples set these heights inline in pixels.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — type-check and build for production
- `npm run lint` — run ESLint
- `npm run preview` — preview a production build locally
