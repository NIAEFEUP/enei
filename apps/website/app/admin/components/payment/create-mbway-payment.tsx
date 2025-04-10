import { Box, FormGroup, FormMessage, Input, InputGroup, Label } from "@adminjs/design-system";

function CreateMbWayPayment() {
  return (
    <Box flex>
      <Box variant="white" width={1 / 2} boxShadow="card" mr="xxl" flexShrink={0}>
        <FormGroup>
          <Label required>Phone Number</Label>
          <InputGroup>
            <Input required />
          </InputGroup>
          <FormMessage />
        </FormGroup>
      </Box>
    </Box>
  );
}

export default CreateMbWayPayment;
