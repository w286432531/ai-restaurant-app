import React, { useEffect, useState, useMemo } from "react";
import { useUserInfoStore } from "../../../store/userReducer";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import currencyFormatter from "../../../utility/formatter";
import axios from "axios";
import {
  Container,
  Table,
  Modal,
  Button,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import parseOrdersData from "../../../utility/parseOrdersData";
import SortDownIcon from "../../../components/icons/SortDownIcon";
import SortUpIcon from "../../../components/icons/SortUpIcon";

const Sales = () => {
  const navigate = useNavigate();
  const { isLogin, user } = useUserInfoStore((state) => ({
    isLogin: state.isLogin,
    user: state.user,
  }));
  const [orders, setOrders] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getOrders"],
    () => {
      return axios.get("/api/order").then((res) => {
        console.log("got data");
        console.log(res.data);
        const parsedOrder = parseOrdersData(res.data);
        setOrders(parsedOrder);
        // console.log(res.data.ingredients);
        return parsedOrder;
      });
    }
  );

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("orderCreatedAt", {
        cell: ({ row, getValue }) => (
          <div
            style={{
              // Since rows are flattened by default,
              // we can use the row.depth property
              // and paddingLeft to visually indicate the depth
              // of the row
              paddingLeft: `${row.depth * 2}rem`,
            }}
          >
            {row.getCanExpand() ? (
              <Button
                variant="outline-primary"
                size="sm"
                {...{
                  onClick: row.getToggleExpandedHandler(),
                }}
              >
                {row.getIsExpanded() ? "👇" : "👉"}
              </Button>
            ) : (
              ""
            )} 
            {getValue()}
          </div>
        ),
        header: () => "Order Placed",
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("total", {
        // id: "id",
        cell: (info) => info.getValue(),
        header: () => "Total",
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("paymentMethod", {
        header: () => "Payment Method",
        cell: (info) => info.renderValue(),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor("paymentAmount", {
        header: () => "Payment Amount",
        footer: (info) => info.column.id,
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getSubRows: originalRow => {
      console.log(originalRow)
      return originalRow.items
        ? originalRow.items.map((item) => ({
            paymentMethod:
              item.itemOption.item.itemName +
              " " +
              item.itemOption.option.optionName,
            paymentAmount: item.itemPrice,
            total: item.quantity,
          }))
        : undefined;
    },
    state: {
      sorting,
      expanded,
    }
  });
  useEffect(() => {}, [setOrders, orders]);
  useEffect(() => {
    // if (!isLogin || !user || user.roleId === 1) {
    //   navigate("/");
    // }
  }, [user, isLogin, navigate]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Container>
      <h1>Sales</h1>
      <Table bordered>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} table={table} />
                    </div>
                  ) : null}
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <SortDownIcon />,
                        desc: <SortUpIcon />,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="item-row"
              // onClick={() => showDetail(row.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Container>
  );
};

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={columnFilterValue?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={columnFilterValue?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  );
}
export default Sales;
