import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TableContainer,
  Flex,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import EditProdcut from "./EditProdcut";
import Pagination from "../../../Common/Pagination";

const ProductDashboard = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const postPerPage = 2;
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentProducts = productData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setcurrentPage(pageNumber);


  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = () => {
    axios
      .get("http://localhost:5000/product")
      .then((res) => {
        const products = res.data.data;
        setProductData(products);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt="10">
      <div>
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.8s"
            emptyColor="grey"
            color="blue"
            size="lg"
            mt="20"
          />
        ) : productData.length > 0 ? (
          <>
            <AddProduct getProductsData={getProductsData} pb={20} />
            <TableContainer mb={5} mt={10}>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Description</Th>
                    <Th>Price</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentProducts.map((product) => (
                    <Tr key={product._id}>
                      <Td>{product._id}</Td>
                      <Td>{product.name}</Td>
                      <Td>{product.description}</Td>
                      <Td>{product.price}</Td>
                      <Td>
                        <Flex gap="2">
                          <DeleteProduct
                            productId={product._id}
                            getProductsData={getProductsData}
                          />
                          <EditProdcut
                            productData={product}
                            getProductsData={getProductsData}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            {productData.length > 2 && (
              <Pagination
                currentPage={currentPage}
                postPerPage={postPerPage}
                totalPosts={productData.length}
                paginate={paginate}
                setcurrentPage={setcurrentPage}
              />
            )}
          </>
        ) : (
          <Heading as="h3" size="lg" my="10">
            No products found!!
          </Heading>
        )}
      </div>
    </Box>
  );
};

export default ProductDashboard;
