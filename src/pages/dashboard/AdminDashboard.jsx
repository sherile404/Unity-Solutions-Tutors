/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import  { useState, useEffect } from "react";
import { FaCommentDollar, FaDatabase, FaHandshake, FaPlusCircle, FaUserCircle, FaUserEdit } from "react-icons/fa";
import MainLayout from "../../layout/MainLayout";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AdminDashboard() {
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [showAddWriterModal, setShowAddWriterModal] = useState(false);
  const [writerName, setWriterName] = useState("");
  const [writers, setWriters] = useState([]);

  const toggleAddWriterModal = () => {
    setShowAddWriterModal(!showAddWriterModal);
  };

  const handleWriterNameChange = (e) => {
    setWriterName(e.target.value);
  };

  const handleAddWriter = () => {
    if (writerName.trim() !== "") {
      setWriters([...writers, writerName]);
      setWriterName("");
      setShowAddWriterModal(false);
    }
  };
  const [orders, setOrders] = useState([]);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: null,
    status: '',
    title: '',
    writer: '',
    // client: '',
    book_balance: '',
    deadline: '',
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://unit-solutions.vercel.app/api/tasks/');
      if (response.status === 200) {
        setOrders(response.data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleAddOrderModal = () => {
    setShowAddOrderModal(!showAddOrderModal);
    setNewOrder({
      id: null,
      status: '',
      writer: '',
      title: '',
      // client: '',
      book_balance: '',
      deadline: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = async () => {
    if (
      newOrder.status.trim() !== '' &&
      newOrder.writer.trim() !== '' &&
      newOrder.title.trim() !== '' &&
      // newOrder.client.trim() !== '' &&
      newOrder.book_balance.trim() !== '' &&
      newOrder.deadline.trim() !== ''
    ) {
      try {
        if (newOrder.id) {
          // If an ID exists, it's an existing task that needs updating
          const response = await axios.put(`https://unit-solutions.vercel.app/api/tasks/${newOrder.id}`, newOrder);

          if (response.status === 200) {
            // alert('The task has been successfully updated');
            toast.success('Task updated successfully', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
            });

          } else {
            console.error('Failed to update the task');
            toast.error('Failed to update the task', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
            });

          }
        } else {
          // If no ID, it's a new task that needs adding
          const response = await axios.post('https://unit-solutions.vercel.app/api/tasks/', newOrder);

          if (response.status === 201) {
            // alert('The task has been successfully added');
            toast.success('Task added successfully', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
            });

          } else {
            console.error('Failed to add the task');
            toast.error('Failed to add the task', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: true,
            });

          }
        }

        fetchTasks();
        toggleAddOrderModal();
      } catch (error) {
        console.error('Error adding/updating task:', error);
      }
    }
  }

  const handleEditOrder = (orderId) => {
    const orderToEdit = orders.find((order) => order.id === orderId);
    setNewOrder(orderToEdit);
    setShowAddOrderModal(true);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`https://unit-solutions.vercel.app/api/tasks/${orderId}`);
      if (response.status === 204) {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
        toast.success('Task deleted successfully', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
      } else {
        // console.error('Failed to delete the task');
        toast.error('Failed to delete the task', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });

      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };



  const data = [
    {
      id: 1,
      title: "LAST 30 DAYS",
      content: "TURNOVER",
      value: "0.00",
      icon: <FaDatabase className="text-lg text-slate-100" />,
      bg: "bg-sky-600",
    },
    {
      id: 2,
      title: "LAST 30 DAYS",
      content: "PAYOUT",
      value: "0.00",
      icon: <FaCommentDollar className="text-lg text-slate-100" />,
      bg: "bg-orange-600",
    },
    {
      id: 3,
      title: "CLIENTS/ACCS",
      content: "ACCOUNTS",
      value: "10",
      icon: <FaHandshake className="text-lg text-slate-100" />,
      bg: "bg-green-600",
    },
    {
      id: 4,
      title: "ACTIVE WRITERS",
      content: "WRITERS",
      value: "10",
      icon: <FaUserEdit className="text-lg text-slate-100" />,
      bg: "bg-red-600",
    },
  ];

  // const orders = [
  //   {
  //     id: 1,
  //     status: "New",
  //     writer: "John Denver",
  //     client: "Client A",
  //     bookBalance: "$500",
  //     value: "20.37%",
  //   },
  //   {
  //     id: 2,
  //     status: "Pending",
  //     writer: "Jane Erickson",
  //     client: "Client B",
  //     bookBalance: "$800",
  //     value: "15.12%",
  //   },
  //   {
  //     id: 3,
  //     status: "Approved",
  //     writer: "Alice Johnson",
  //     client: "Client C",
  //     bookBalance: "$1000",
  //     value: "10.88%",
  //   },
  //   {
  //     id: 4,
  //     status: "New",
  //     writer: "Bob Brown",
  //     client: "Client D",
  //     bookBalance: "$1200",
  //     value: "25.75%",
  //   },
  //   {
  //     id: 5,
  //     status: "Pending",
  //     writer: "Eva Davis",
  //     client: "Client E",
  //     bookBalance: "$1500",
  //     value: "30.45%",
  //   },
  //   {
  //     id: 6,
  //     status: "Approved",
  //     writer: "Frank Wilson",
  //     client: "Client F",
  //     bookBalance: "$2000",
  //     value: "18.62%",
  //   },
  //   {
  //     id: 7,
  //     status: "New",
  //     writer: "Grace Lee",
  //     client: "Client G",
  //     bookBalance: "$900",
  //     value: "12.23%",
  //   },
  //   {
  //     id: 8,
  //     status: "Pending",
  //     writer: "Hannah Adams",
  //     client: "Client H",
  //     bookBalance: "$1100",
  //     value: "22.78%",
  //   },
  //   {
  //     id: 9,
  //     status: "Approved",
  //     writer: "Ian Miller",
  //     client: "Client I",
  //     bookBalance: "$1300",
  //     value: "17.91%",
  //   },
  //   {
  //     id: 10,
  //     status: "New",
  //     writer: "Jasmine Taylor",
  //     client: "Client J",
  //     bookBalance: "$1700",
  //     value: "28.33%",
  //   },
    
  // ];
  

  const displayedOrders = showAllOrders ? orders : orders.slice(0, 5);

  return (
    <div className="flex flex-col space-y-4">
       <ToastContainer />
      <div className="flex">
        {data.map((item) => (
          <div className="max-w-xs mx-auto p-3" key={item.id}>
            <div className={`bg-white shadow-md rounded-lg p-3 flex space-x-16`}>
              <div>
                <h2 className="text-xs font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 flex flex-col space-y-2 ">
                  <span className="text-slate-400 text-xs">{item.content}</span>
                  <span className="font-bold text-slate-400">{item.value} </span>
                </p>
              </div>
              <div className=" ">
                <p className={`${item.bg} p-3 rounded-full`}>
                  {item.icon}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row space-x-4">
        <div className="flex-1 w-2/3">
          <div className="bg-white shadow-md rounded-lg p-3">
            <div className="flex justify-between items-center ">
              <h2 className="text-xl font-semibold text-gray-800">Current Orders</h2>
              <a
                href="#"
                className="px-2 py-1 bg-gray-800 text-gray-100 font-bold rounded hover:bg-gray-700"
                onClick={() => setShowAllOrders(!showAllOrders)}
              >
                {showAllOrders ? "Show Less" : "View All"}
              </a>
            </div>

            {/* <div className="overflow-x-auto mt-6">
            <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-slate-400">
                    <th className="px-4 py-2 text-start">Status</th>
                    <th className="px-2 py-2 text-start">Writer</th>
                    <th className="px-2 py-2 text-start">Client</th>
                    <th className="px-2 py-2 text-start">Book Balance</th>
                    <th className="px-2 py-2 text-start">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedOrders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-300">
                      <td className="px-2 py-2">
                        <button
                          className={`bg-${order.status.toLowerCase()}-400 py-2 px-2 rounded-lg w-28 bg-sky-600 text-xs font-bold text-slate-100`}
                        >
                          {order.status}
                        </button>
                      </td>
                      <td className="px-2 py-2 text-gray-500">{order.writer}</td>
                      <td className="px-2 py-2 text-gray-500">{order.client}</td>
                      <td className="px-2 py-2 text-slate-600 font-semibold">{order.bookBalance}</td>
                      <td className="px-2 py-2 text-slate-600 font-semibold">{order.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
            <div className="flex flex-col md:flex-row p-4 md:p-0">
      <div className="flex-1">
        <div className="bg-white shadow-md rounded-lg p-3">
          <div className="flex justify-between items-center">
            {/* <h2 className="text-xl font-semibold text-gray-800">Tasks</h2> */}
            {/* <button
              onClick={toggleAddOrderModal}
              className="px-2 py-1 bg-gray-800 text-gray-100 font-bold rounded hover:bg-gray-700"
            >
              Add Task
            </button> */}
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-slate-400">
                  <th className="px-4 py-2 text-start">Status</th>
                  <th className="px-2 py-2 text-start">Writer</th>
                  <th className="px-2 py-2 text-start">Title</th>
                  {/* <th className="px-2 py-2 text-start">Client</th> */}
                  <th className="px-2 py-2 text-start">Book Balance</th>
                  <th className="px-2 py-2 text-start">Deadline</th>
                  {/* <th className="px-2 py-2 text-start">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-300 hover:bg-slate-100">
                    <td className="px-2 py-2">
                      <button
                        className={`bg-${order.status.toLowerCase()}-400 py-2 px-2 rounded-lg w-28 bg-sky-600 text-xs font-bold text-slate-100`}
                      >
                        {order.status}
                      </button>
                    </td>
                    <td className="px-2 py-2 text-gray-500">{order.writer}</td>
                    {/* <td className="px-2 py-2 text-gray-500">{order.client}</td> */}
                    <td className="px-2 py-2 text-gray-500">{order.title}</td>
                    
                    <td className="px-2 py-2 text-slate-600 font-semibold">{order.book_balance}</td>
                    <td className="px-2 py-2 text-slate-600 font-semibold">{order.deadline}</td>
                    {/* <td className="px-2 py-2">
                      <button
                        onClick={() => handleEditOrder(order.id)}
                        className=" py-2 px-4 w-20 rounded-lg  bg-blue-600 text-xs font-bold text-slate-100 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="py-2 px-4 w-20 rounded-lg  bg-red-600 text-xs font-bold text-slate-100"
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showAddOrderModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              {newOrder.id ? 'Edit Task' : 'Add Task'}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-800">Status</label>
              <select
                name="status"
                value={newOrder.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Status</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="New">New</option>
                <option value="Revision">Revision</option>
                <option value="Resubmission">Resubmission</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Writer</label>
              <input
                type="text"
                name="writer"
                value={newOrder.writer}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Client</label>
              <input
                type="text"
                name="client"
                value={newOrder.client}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Book Balance</label>
              <input
                type="text"
                name="book_balance"
                value={newOrder.book_balance}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={newOrder.deadline}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddOrder}
                className="px-4 py-2 bg-green-500 text-white rounded hover-bg-green-600"
              >
                {newOrder.id ? 'Save' : 'Add'}
              </button>
              <button
                onClick={toggleAddOrderModal}
                className="ml-2 px-4 py-2 bg-gray-400 text-gray-900 rounded hover-bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
          </div>
        </div>

        {/* <div className="bg-white shadow-md rounded-lg p-3 w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Our Writers</h2>
            <button
              onClick={toggleAddWriterModal}
              className="px-2 py-1 bg-gray-800 text-gray-100 font-bold rounded flex space-x-1 items-center hover:bg-gray-700"
            >
              <FaPlusCircle /> Add Writer
            </button>
          </div>

          <ul>
            {writers.map((writer, index) => (
              <li key={index} className="text-gray-800 mb-2 flex items-center">
                <p className="w-8 h-8 rounded-full mr-2">
                  <FaUserCircle className="text-4xl pr-2" />
                </p>
                <span className="font-medium">{writer}</span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {showAddWriterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Add Writer</h2>
            <div className="mb-4">
              <label className="block text-gray-800">Writers Name</label>
              <input
                type="text"
                value={writerName}
                onChange={handleWriterNameChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddWriter}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
              <button
                onClick={toggleAddWriterModal}
                className="ml-2 px-4 py-2 bg-gray-400 text-gray-900 rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;