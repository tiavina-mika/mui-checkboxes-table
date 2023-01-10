import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ChangeEvent, FC, useState } from "react";
import { Checkbox } from "@mui/material";

interface Right {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface Item {
  label: string;
  value: string;
  rights: Right;
}

// columns (other than the first column)
const entities: Omit<Item, "rights">[] = [
  {
    label: "Users",
    value: "users"
  },
  {
    label: "Rides",
    value: "rides"
  },
  {
    label: "Settings",
    value: "settings"
  }
];

const rights: Right = {
  create: false,
  read: false,
  update: false,
  delete: false
};

const defaultValues = entities.map((entity) => ({
  ...entity,
  rights
}));

const RightsFields: FC = () => {
  const [items, setItems] = useState<Item[]>(defaultValues);
  console.log("items", items);

  // on checked one checkbox
  const handleChecked = (type: string, key: keyof Right) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // update the state
    setItems((prev) =>
      prev.map((state) => {
        return {
          ...state,
          rights: {
            ...state.rights,
            [key]:
              type === state.value // if the current cell
                ? event.target.checked // use the checkebox value
                : state.rights[key]
          } // use the previous value
        };
      })
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {/* head */}
        <TableHead>
          <TableRow>
            <TableCell />
            {items.map((item, index) => (
              <TableCell key={index}>{item.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* body */}
        <TableBody>
          {/* the number of row should be the number of rights (4 here) */}
          {Object.keys(rights).map((key, rightIndex) => (
            <TableRow
              key={rightIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ textTransform: "capitalize" }}>{key}</TableCell>
              {/* the number of remaining cells should be the number of column (other than the first column) */}
              {items.map((item, index) => (
                <TableCell key={item.value + index}>
                  <Checkbox
                    checked={item.rights[key]}
                    onChange={handleChecked(item.value, key as keyof Right)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RightsFields;
