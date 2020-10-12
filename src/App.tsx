import React, { useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarComponent, ListCategories, Hasil, Menu } from "./Components";
import { API_URL } from "./Utils/constants";
import swal from "sweetalert";
import axios from "axios";

interface IMenu {
  id?: number;
  kode: string
  nama: string
  harga: number
  is_ready: boolean
  gambar: string
  category: ICategory
}

export interface ICategory {
  id?: number;
  nama: string;
}

export interface IKeranjang {
  id?: number;
  jumlah: number;
  totalHarga: number;
  product: IMenu;
}

function App() {


  const [menus, setMenus] = React.useState<IMenu[]>([]);
  const [pilihCategory, setPilihCategory] = React.useState<ICategory>({ id: 1, nama: "Makanan" })
  const [keranjang, setKeranjang] = React.useState<IKeranjang[]>([]);

  React.useEffect(() => {
    getProducts(pilihCategory)
  }, [pilihCategory])

  React.useEffect(() => {
    getKeranjang()
  }, [])

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

  const getProducts = React.useCallback(async (category: ICategory) => {
    const result = await axios.get(API_URL + "products?category.nama=" + category.nama);
    setMenus(result.data);
  }, [])



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
          // buttons : false,
          timer: 2000,
        });
        setKeranjang([...keranjang, { ...keranjangItem }])
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keranjang])

  const updateItemKeranjang = React.useCallback((res, value) => {
    const keranjangItem: IKeranjang = {
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
          // buttons: false,
          timer: 2000,
        });

        // update state keranjang
        let tmp: IKeranjang[] = [...keranjang]
        console.log(tmp)
        let index: number = tmp.findIndex((item: IKeranjang) => {
          return item.id === res.data[0].id
        })
        tmp[index] = { ...keranjangItem }
        setKeranjang(tmp)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [keranjang])

  const masukKeranjang = React.useCallback((value: IMenu) => {
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
  }, [keranjang])

  return (
    <div>
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              onChangeCategory={setPilihCategory}
              onChoiseCategory={pilihCategory}
              categories = {cate}
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
            <Hasil keranjang={keranjang} />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;