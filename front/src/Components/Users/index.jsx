import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("users", (users) => {
      setUsers(users);
    });

    socket.on("user_disconnected", (user) =>
      toast.warn(`${user} disconnected`, {
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "light",
      })
    );

    socket.emit("get_users");

    return () => {
      socket.off("users");
      socket.off("user_disconnected");
    };
  }, []);

  return (
    <div className="bg-green-200 w-1/5 h-full overflow-y-scroll">
      <ToastContainer />
      <h1 className="text-center font-bold uppercase">
        {" "}
        Users: {users.length}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <ul className="w-full">
          {users.map((user, index) => (
            <li key={index} className="text-center text-green-700 font-bold">
              {user.nickname}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
