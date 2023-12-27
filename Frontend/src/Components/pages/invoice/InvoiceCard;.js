import { Box, Heading, Text, Divider, Button, Image, Flex } from "@chakra-ui/react";

const InvoiceCard = ({ invoiceData, onDownload, onDelete }) => {
  const { title, product, notes, tax, subtotal, total, productImage } = invoiceData;

  return (
    <Box borderWidth="1px" borderRadius="md" p="4" mb="4">
      <Heading as="h1" size="md" mb="2">
        Invoice Details
      </Heading>
      <Text>
        <strong>Title:</strong> {title}
      </Text>
      <Text>
        <strong>Product:</strong> {product}
      </Text>
      <Text>
        <strong>Notes:</strong> {notes}
      </Text>
      <Flex alignItems="center">
        <Text>
          <strong>Product Image:</strong>
        </Text>
        {productImage && (
          <Image src={productImage} alt="Product" boxSize="50px" ml="2" />
        )}
      </Flex>
      <Text>
        <strong>Tax:</strong> {tax}
      </Text>
      <Divider my="3" />
      <Text>
        <strong>Subtotal:</strong> {subtotal}
      </Text>
      <Text>
        <strong>Total:</strong> {total}
      </Text>
      {/* Download PDF Button */}
      <Button onClick={onDownload} mt="3" mr="2">
        Download PDF
      </Button>
      {/* Delete Button */}
      <Button colorScheme="red" onClick={onDelete} mt="3">
        Delete
      </Button>
    </Box>
  );
};

export default InvoiceCard;
