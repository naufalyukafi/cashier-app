import React, { useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarComponent, ListCategories, Hasil, Menu } from "./Components";
import { API_URL } from "./Utils/constants";
import swal from "sweetalert";
import axios from "axios";
function App() {
  const [menus, setMenus] = React.useState([]);
  const [pilihCategory, setPilihCategory] = React.useState("Makanan");
  const [keranjang, setKeranjang] = React.useState([]);

  const getKeranjang = React.useCallback(() => {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjangs = res.data;
        setKeranjang(keranjangs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])



  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          API_URL + "products?category.nama=" + pilihCategory
        );
        setMenus(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjangs = res.data;
        setKeranjang(keranjangs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Or [] if effect


  React.useEffect(() => {
    axios
      .get(API_URL + "keranjang")
      .then((res) => {
        const keranjangs = res.data;
        setKeranjang(keranjangs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pilihCategory]);

  const changeCategory = (value) => {
    setPilihCategory(value);
    setMenus([]);

    const fetchData = async () => {
      try {
        const result = await axios(API_URL + "products?category.nama=" + value);
        setMenus(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    axios
      .get(API_URL + "keranjang?product.id=" + value.id)
      .then((res) => {
        const keranjangs = res.data;
        setKeranjang(keranjangs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addItemKeranjang = React.useCallback((res, value) => {
    const keranjangItem = {
      jumlah: 1,
      totalHarga: value.harga,
      product: value,
    };
    axios
      .post(API_URL + "keranjang", keranjangItem)
      .then((res) => {
        swal({
          title: "Sukses Masuk Keranjang",
          text: "Sekses Masuk Keranjang " + keranjangItem.product.nama,
          icon: "success",
          button: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  const updateItemKeranjang = React.useCallback((res, value) => {
    const keranjangItem = {
      jumlah: res.data[0].jumlah + 1,
      totalHarga: res.data[0].totalHarga + value.harga,
      product: value,
    };
    axios
      .put(API_URL + "keranjang/" + res.data[0].id, keranjangItem)
      .then((result) => {
        // setKeranjang([...keranjang, result.data])
        swal({
          title: "Sukses Masuk Keranjang",
          text: "Sekses Masuk Keranjang " + keranjangItem.product.nama,
          icon: "success",
          button: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    let tmp = [...keranjang]
    let newKeranjang = tmp.forEach(item => {
      if (item.id === res.data[0].id) {
        item = { ...keranjangItem }
      }
    });
    console.log(newKeranjang)
    // setKeranjang(newKeranjang)
  })

  const masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjang?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          // buat item baru
          addItemKeranjang(res, value)
        } else {
          // update item keranjang yang id nya sama
          updateItemKeranjang(res, value)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              onChangeCategory={changeCategory}
              onChoiseCategory={pilihCategory}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menu
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangApp={keranjang} />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
