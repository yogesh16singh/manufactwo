import { Table } from "@mantine/core";

function TableTwo({ crmap }) {
  console.log(crmap);

  const row = Object.keys(crmap).map((element: any) => (
    <Table.Tr key={element}>
      <Table.Td>{element}</Table.Td>
      <Table.Td>
        {(crmap[element].yieldOfCrop / crmap[element].n).toFixed(3)}
      </Table.Td>
      <Table.Td>
        {(crmap[element].areaUnderCult / crmap[element].n).toFixed(3)}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table withColumnBorders withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ textAlign: "center" }}>Name of the Crop</Table.Th>
          <Table.Th style={{ textAlign: "center" }}>
            Average Yield of the Crop between 1950-2020
          </Table.Th>
          <Table.Th style={{ textAlign: "center" }}>
            Average Cultivation Area of the Crop between 1950-2020
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{row}</Table.Tbody>
    </Table>
  );
}

export default TableTwo;
