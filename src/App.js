import "./App.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner.js";

function App() {
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("love");
  const [search, setSearch] = useState("");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://openlibrary.org/subjects/${subject}.json?details=true`)
      .then((res) => {
        const rowData = [];
        console.log(res.data.works);
        res.data.works.map((item, index) => {
          rowData.push({
            id: index + 1,
            title: item.title,
            author: item.authors[0].name,
            first_publish_year: item.first_publish_year,
            edition_count: item.edition_count,
          });
        });
        setIsLoading(false);
        setRows(rowData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subject]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.25 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      editable: true,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
      editable: true,
    },
    {
      field: "first_publish_year",
      headerName: "First published year",
      width: 110,
      flex: 1,
    },
    {
      field: "edition_count",
      headerName: "Edition count",
      sortable: false,
      flex: 1,
    },
  ];

  const handleClick = () => {
    setIsLoading(true);
    axios
      .get(`https://openlibrary.org/search.json?title=${search}`)
      .then((res) => {
        const rowData = [];
        console.log(res.data.docs);
        res.data.docs.map((item, index) => {
          console.log(item.title);
          // console.log(item.author_name[0]);
          console.log(item.first_publish_year);
          console.log(item.edition_count);
          rowData.push({
            id: index + 1,
            title: item.title,
            author: item.author_name === undefined ? null : item.author_name[0],
            first_publish_year: item.first_publish_year,
            edition_count: item.edition_count,
          });
        });
        setIsLoading(false);
        setRows(rowData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App" style={{ paddingInline: "15%", paddingBlock: "1%" }}>
      <div
        className="appsubjects"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "3rem",
          marginBlock: "1rem",
        }}
      >
        <div
          style={{
            width: "40%",
            height: "40px",
            backgroundColor: "white",
            borderRadius: "24px",
            display: "flex",
            alignItems: "center",
            paddingInline: "24px",
            paddingBlock: "4px",
            border: "1px solid black",
          }}
        >
          <input
            style={{
              flex: 1,

              height: "32px",

              border: "none",

              outline: "none",

              fontSize: "18px",

              paddingleft: "10px",
              color: "#ABABAB",
            }}
            type="text"
            placeholder="Search project"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <SearchOutlinedIcon
            style={{
              color: "#A8A8A8",
              paddingLeft: "5px",
              cursor: "pointer",
            }}
            onClick={handleClick}
          />
        </div>
        <Button variant="outlined" onClick={() => setSubject("history")}>
          History
        </Button>
        <Button variant="outlined" onClick={() => setSubject("places")}>
          Places
        </Button>
        <Button variant="outlined" onClick={() => setSubject("arts")}>
          Arts
        </Button>
        <Button variant="outlined" onClick={() => setSubject("biography")}>
          Biography
        </Button>
        <Button variant="outlined" onClick={() => setSubject("animals")}>
          Animals
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div
            className="appdatatable"
            style={{ width: "100%", height: "630px" }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              style={{ outline: "none" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
