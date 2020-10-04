import React from "react";
import { Col, Row, ListGroup, ListGroupItem, Badge } from "react-bootstrap";
import { formatNumber } from "../Utils/utils";
const Hasil = ({ keranjangApp }) => {
  return (
    <Col md={3} mt={2}>
      <h4>
        <strong>Hasil</strong>
      </h4>
      <hr />
      {keranjangApp.length > 0 && (
        <ListGroup variant="flush">
          {keranjangApp.map((menuKeranjang) => (
            <Row>
              <Col xs={2}>
                <h4>
                  <Badge pill variant="success">
                    {menuKeranjang.jumlah}
                  </Badge>
                </h4>
              </Col>
              <Col>
                <h6>{menuKeranjang.product.nama}</h6>
                <p>Rp. {formatNumber(menuKeranjang.product.harga)}</p>
              </Col>
              <Col>
                <strong>Rp. {formatNumber(menuKeranjang.totalHarga)}</strong>
              </Col>
            </Row>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default Hasil;
