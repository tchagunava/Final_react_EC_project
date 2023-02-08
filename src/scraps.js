// import axios from "axios";
// import { useEffect, useState } from 'react';
// import './App.css';

const instance = axios.create({
  baseURL: "http://localhost:3001/users",
});

const initialValues = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  sex: "",
};

// const validate = (values) => {
//   const errors = {};
//   if (values.name.length < 4) {
//     errors.name = "Name is Requiers at list 4 characters";
//   }
//   if (values.lastname.length < 4) {
//     errors.lastname = "last name is Requiers at list 4 characters";
//   }
//   if (!values.Email) {
//     errors.Email = "Email is required!";
//   } else if (!values.Email.includes("@")) {
//     errors.Email = "This Email is not valid";
//   }
//   if (values.age.length < 18) {
//     errors.age = "user has to be over 18";
//   }
//   if (!values.Gender) {
//     errors.Gender = "please select your gender";
//   }
//   return errors;
// };


function App() {
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isUserUpdating, setIsUserUpdating] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getUsers = async () => {
    const { data } = await instance.get("")
    console.log(data);
    setUsers(data.data);
  };
  useEffect(() => {
    getUsers();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(formValues);
    if (!isUserUpdating) {
      await instance.post("", { ...formValues, sex: "male" });
    } else {
      await instance.put(`${formValues._id}`, { ...formValues });
    };
    await getUsers();
    //   setUsers(
    //     (prevUsers) => [
    //       ...prevUsers, { ...formValues, id: new Date().toString() },
    //     ]
    //   );

    // } else {
    //   setUsers(
    //     (prevUsers) => {
    //       const newUsersArray = prevUsers.reduce((acc, current) => {
    //         if (current.id === formValues.id) {
    //           return [...acc, formValues];
    //         } else return [...acc, current];
    //       }, []
    //       );
    //       return newUsersArray;
    //     }
    //   );
    // };
    setFormValues(initialValues);
    setIsUserUpdating(false);
  };
  const onDelete = async (id) => {
    await instance.delete(`/${id}`);
    await getUsers();
    // setUsers(
    //   (prevUsers) => {
    //     const newUsersArray = prevUsers.filter((user) => user.id !== id);
    //     return newUsersArray;
    //   }
    // );
  };
  const onEdit = (id) => {
    const selectedUser = users.find((user) => user._id === id);
    setFormValues(selectedUser);
  };

  return (
    <div>
      <div className="container">
        <input
          type="text"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
        />{" "}
        <label>Name</label>
        {/* {formErrors.name && <p>{formErrors.name}</p>} */}
        <div>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
          />{" "}
          <label>Last Name</label>
          {/* {formErrors.lastname && <p>{formErrors.lastname}</p>} */}
        </div>
        <div>
          <input
            type="number"
            name="age"
            value={formValues.age}
            onChange={handleChange}
          />{" "}
          <label>Age</label>
          {/* {formErrors.age && <p>{formErrors.age}</p>} */}
        </div>
        <div>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />{" "}
          <label>Email</label>
          {/* {formErrors.Email && <p>{formErrors.Email}</p>} */}
        </div>
        <select onChange={handleChange}>
          <option value={"male"}>Male</option>
          <option value={"famale"}>Famale</option>
          <option value={"other"}>Other</option>
        </select>
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
        {users.map((user) => (
          <div kay={user._id}>
            <h1>{user.firstName}</h1>
            <h1>{user.lastName}</h1>
            <button
              onClick={() => {
                setIsUserUpdating(true);
                onEdit(user._id);
              }}> edit
            </button>
            <button onClick={() => onDelete(user._id)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default App;