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
            <th>Name</th>
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
