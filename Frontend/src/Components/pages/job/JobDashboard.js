import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
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
import AddJob from "./AddJob";
import DeleteJob from "./DeleteJob";
import EditJob from "./EditJob";
import Pagination from "../../../Common/Pagination";

const JobProductDashboard = () => {
  const [jobData, setjobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const postPerPage = 2;
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentJobs = jobData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setcurrentPage(pageNumber);

  useEffect(() => {
    getJObData();
  }, []);

  const updateJob = (values) => {
    axios
      .patch(`http://localhost:5000/job/${values._id}`, values)
      .then((res) => {
        getJObData();
      })
      .catch((error) => console.error(error));
  };

  const getJObData = () => {
    axios
      .get("http://localhost:5000/job")
      .then((res) => {
        const jobs = res.data.data;
        setjobData(jobs);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const convertToInvoice = (jobId) => {
    axios
      .post(`http://localhost:5000/convert-to-invoice/${jobId}`)
      .then((res) => {
        getJObData();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios.get("http://localhost:5000/product").then((response) => {
      setProducts(response.data.data);
    });
  }, [products]);

  const getProductName = (productId) => {
    const product = products.find((p) => p._id === productId);
    return product ? product.name : "Product not found";
  };

  const isJobConverted = (job) => {
    return job.convertedToInvoice;
  };

  return (
    <>
      {" "}
      <Box display="flex" justifyContent="center" alignItems="center" mt="10">
        <AddJob getProductsData={getJObData} />
      </Box>{" "}
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
          ) : jobData.length > 0 ? (
            <>
              <TableContainer mb={5} mt={10}>
                <Table variant="striped">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Title</Th>
                      <Th>Tags</Th>
                      <Th>Notes</Th>
                      <Th>Tax</Th>
                      <Th>Subtotal</Th>
                      <Th>Total</Th>
                      <Th>Product</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {currentJobs.map((job) => (
                      <Tr key={job._id}>
                        <Td>{job._id}</Td>
                        <Td>{job.title}</Td>
                        <Td>{job.tags.join(", ")}</Td>
                        <Td>{job.notes}</Td>
                        <Td>{job.tax}</Td>
                        <Td>{job.subtotal}</Td>
                        <Td>{job.total}</Td>
                        <Td>{getProductName(job.product)}</Td>
                        <Td>
                          <Flex gap="2">
                            <DeleteJob
                              jobId={job._id}
                              getProductsData={getJObData}
                            />
                            <EditJob jobData={job} updateData={updateJob} />
                            <Button
                              colorScheme="green"
                              onClick={() => convertToInvoice(job._id)}
                              isDisabled={isJobConverted(job)}
                            >
                              Convert to Invoice
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
              {jobData.length > 2 && (
                <Pagination
                  currentPage={jobData}
                  postPerPage={jobData}
                  totalPosts={jobData.length}
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
    </>
  );
};

export default JobProductDashboard;
