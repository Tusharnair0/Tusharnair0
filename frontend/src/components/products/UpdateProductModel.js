import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ProductContext } from "../../contexts/ProductContext";

const UpdateProductModel = () => {
  // Contexts
  const {
    productState: { productSelect },
    showUpdateProductModal,
    setShowUpdateProductModal,
    updateProducts,
    updateOutProducts,
    setShowToast,
  } = useContext(ProductContext);

  // State
  const [updateProduct, setUpdateProduct] = useState(productSelect);
  useEffect(() => {
    setUpdateProduct(productSelect);
  }, [productSelect]);
  const [IMAGE, setIMAGE] = useState("");

  const { title, description, price, image, categories } = updateProduct;
  const onChangeUpdatedProductForm = (event) => {
    if (event.target.name !== "image") {
      setUpdateProduct({
        ...updateProduct,
        [event.target.name]: event.target.value,
      });
    }
      else if (event.target.name === "categories") {
        let genres = event.target.value.split(",");
        setUpdateProduct({
          ...updateProduct,
          [event.target.name]: genres,
        });
      }
    else {
      setUpdateProduct({
        ...updateProduct,
        [event.target.name]: event.target.files[0],
        imgcheck: IMAGE,
      });
      setIMAGE(URL.createObjectURL(event.target.files[0]));
    }
  };

  const closeDialog = () => {
    resetUpdateProductData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Test :" + updateProduct.imgcheck);
    if (updateProduct.imgcheck === "") {
      const { message, success } = await updateProducts(updateProduct);
      resetUpdateProductData();
      setShowToast({
        show: true,
        message,
        type: success ? "success" : "danger",
      });
    } else {
      console.log("2");
      console.log(updateProduct);
      const { message, success } = await updateOutProducts(updateProduct);
      resetUpdateProductData();
      setShowToast({
        show: true,
        message,
        type: success ? "success" : "danger",
      });
    }
  };

  const resetUpdateProductData = () => {
    setUpdateProduct({
      ...updateProduct,
      title: title,
      description: description,
      categories: categories,
      price: price,
      image: image,
      imgcheck: "",
    });
    setIMAGE("");
    console.log(updateProduct);
    setShowUpdateProductModal(false);
  };

  return (
    <Modal show={showUpdateProductModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required-aria-aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedProductForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label id="title-help" muted>
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              row={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedProductForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="0"
              value={price}
              onChange={onChangeUpdatedProductForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>categories</Form.Label>
            <Form.Control  type="text" name="categories" value={typeof categories === "object" ? categories.join(",") : categories}  onChange={onChangeUpdatedProductForm}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={onChangeUpdatedProductForm}
            />
            <img
              src={IMAGE === "" ? `http://localhost:5000/${image}` : IMAGE}
              alt={title}
              className="productImage"
            />
          </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateProductModel;
