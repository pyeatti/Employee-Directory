import React, { useState, useEffect } from "react";
import NavSearch from "../NavSearch/index";
import "./styles.css";
import API from "../../utils/API";

function Table() {
  const [employeeState, setEmployeeState] = useState({
    employees: [],
    filteredEmployees: [],
  });

  useEffect(() => {
    API.getUsers().then((res) => {
      setEmployeeState({
        ...employeeState,
        employees: res.data.results,
        filteredEmployees: res.data.results,
      });
    });
  }, []);
  const onSortByName = (event) => {
    setEmployeeState({
      ...employeeState,
      filteredEmployees: employeeState.filteredEmployees.sort(function (a, b) {
        var nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }),
    });
  };

  const searchForEmployee = (e) => {
    let searchValue = e.target.value;
    searchValue = searchValue.toLowerCase();
    let searchResult = [...employeeState.employees];
    searchResult = searchResult.filter((user) => {
      let fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return fullName.includes(searchValue);
    });
    setEmployeeState({ ...employeeState, filteredEmployees: searchResult });
  };

  return (
    <div className="container">
      <div>
        <NavSearch searchForEmployee={searchForEmployee} />
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th
              onClick={(event) => {
                onSortByName(event);
              }}
            >
              Name
            </th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
          </tr>
        </thead>
        <tbody>
          {employeeState.filteredEmployees.map((user) => (
            <tr>
              <td>
                <img src={user.picture.medium} />
              </td>
              <td>{`${user.name.first} ${user.name.last}`}</td>
              <td>{user.email}</td>
              <td>{user.cell}</td>
              <td>{new Date(user.dob.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
