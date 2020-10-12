import React from "react";
import { Col, Row, ListGroup, ListGroupItem, Badge } from "react-bootstrap";
import { formatNumber } from "../Utils/utils";
import { IKeranjang } from "../App";

interface Iprops {
  keranjang: IKeranjang[];
}
const Hasil = (props: Iprops) => {
  return (
    <Col md={3}>
      <h4>
        <strong>Hasil</strong>
      </h4>
      <hr />
      {props.keranjang.length > 0 && (
        <ListGroup variant="flush">
          {props.keranjang.map((menuKeranjang) => (
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
