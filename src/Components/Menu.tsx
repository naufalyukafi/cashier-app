import React from "react";
import { Col, Card } from "react-bootstrap";
import { formatNumber } from "../Utils/utils";
import {IMenu} from "../App"

type IPropsMenu = {
  menu : IMenu
  masukKeranjang : (value : IMenu)=> void
}

const Menu = ({ menu, masukKeranjang } : IPropsMenu ) => {
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
