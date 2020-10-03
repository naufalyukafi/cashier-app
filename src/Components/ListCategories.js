import React from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../Utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const ListCategories = (props) => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(API_URL + "categories");
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); // Or [] if effect

  const Icon = ({ nama }) => {
    if (nama === "Makanan")
      return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
    if (nama === "Minuman")
      return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
    if (nama === "Cemilan")
      return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
  };
  return (
    <Col md={2} mt={2}>
      <h4>
        <strong>Daftar Kategori</strong>
        <hr />
      </h4>
      <ListGroup>
        {categories &&
          categories.map((category) => (
            <h5>
              <ListGroup.Item
                key={category.id}
                onClick={() => props.onChangeCategory(category.nama)}
                className={
                  props.onChoiseCategory === category.nama && "category-active"
                }
                style={{ cursor: "pointer" }}
              >
                <Icon nama={category.nama} />
                {category.nama}
              </ListGroup.Item>
            </h5>
          ))}
      </ListGroup>
    </Col>
  );
};

export default ListCategories;
