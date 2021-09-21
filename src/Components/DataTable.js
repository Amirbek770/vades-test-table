import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SearchBar from "material-ui-search-bar";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: "Amir", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  const [row, setRow] = useState(rows);
  const [q, setQ] = useState();
  const [searched, setSearched] = useState('');
  const [searchColumns, setSearchColumns] = useState();
  const getData = async () => {
    const url = `https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "undefined",
      },
    });

    const res = await response.json();
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  function search(searchedVal) {
    const filteredRows = rows.filter((row) => {
        return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRow(filteredRows);
  }

  const cancelSearch = () => {
    setSearched(" ");
    search(searched);
  };
  return (
    <div>
      <SearchBar
          value={searched}
          onChange={(searchVal) => search(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
