import React, { useEffect, useState } from "react";
import { Table, Modal, Button, ListGroup, Row,Col } from "react-bootstrap";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./UserOrdersTable.scss";
const UserOrdersTable = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentRowId, setCurrentRowId] = useState(0);
  const closeModal = () => setShowModal(false);
  console.log(data);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("orderCreatedAt", {
      cell: (info) => info.getValue(),
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
  ];
  console.log(data);
  const showDetail = (id) => {
    console.log(id);
    setCurrentRowId(id);
    setShowModal(true);
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  if (!data || data.length === 0) {
    return <p>Loading...</p>
  }
  return (
    <>
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ListGroup>
            {data[currentRowId].items.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col>{item.quantity}</Col>
                  <Col>{item.itemOption.item.itemName}</Col>
                  <Col>
                    {item.itemOption.option.optionName !== "base" &&
                      item.itemOption.option.optionName}
                  </Col>
                  <Col>{item.itemPrice}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Table bordered>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
              onClick={() => showDetail(row.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot> */}
      </Table>
    </>
  );
};

export default UserOrdersTable;
