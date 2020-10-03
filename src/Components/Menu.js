import React from "react";
import { Col, Card } from "react-bootstrap";
import { formatNumber } from "../Utils/utils";
const Menu = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4">
      <Card onClick={() => masukKeranjang(menu)}>
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
          y
        />
        <Card.Body>
          <Card.Title>
            {menu.nama} <strong>{menu.kode}</strong>
          </Card.Title>
          <Card.Text>Rp. {formatNumber(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menu;
