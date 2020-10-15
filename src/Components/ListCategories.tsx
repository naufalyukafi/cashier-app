import React from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../Utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ICategory} from "../App"
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

type IProps = {
  onChangeCategory: (category:ICategory) => void;
  selectedCategory: ICategory;
}
type Icategory2 = {
  nama: string;
}
const ListCategories = (props: IProps) => {
  const [categories, setCategories] = React.useState<ICategory[]>([])

  const getCategories = React.useCallback(async ()=> {
    const result = await axios.get(API_URL + "categories" );
    setCategories(result.data);
  }, [])

  React.useEffect(()=> {
    getCategories()
  }, [])
  const Icon = ({ nama }:Icategory2):JSX.Element => {
      if (nama === "Makanan")
        return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
      if (nama === "Minuman")
        return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
      if (nama === "Cemilan")
        return <FontAwesomeIcon icon={faCheese} className="mr-2" />;
        throw new Error('Invalid value');
    };
  return (
    <Col md={2} >
      <h4>
        <strong>Daftar Kategori</strong>
        <hr />
      </h4>
      <ListGroup>
        {categories &&
          categories.map((category:ICategory) => (
            <h5>
              <ListGroup.Item
                key={category.id}
                onClick={() => props.onChangeCategory(category)}
                className={
                  props.selectedCategory.nama === category.nama ? "category-active" : ""
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
