import { useState } from "react";
import PropTypes from "prop-types";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";

import { addArticleToFirestore } from "src/store/slices/BlogSlice";

import Label from "./ui/Label";
import Button from "./ui/Button";

const Modal = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();

  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    let article = {
      desc,
      title,
    };

    try {
      // Dispatch action and wait for it to complete
      await dispatch(addArticleToFirestore(article));

      // Clear the form fields after the action has successfully completed
      setDesc("");
      setTitle("");
    } catch (error) {
      console.error("Error adding article:", error);
      // Handle the error if needed, e.g., show an error message to the user
    }
  };

  return (
    <>
      {" "}
      {showModal && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                <h2 className="block text-black text-sm font-bold">Create</h2>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal(false)}
                >
                  <IoIosCloseCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleCreate}>
                  <Label className="block text-black text-sm font-bold mb-2">
                    Title
                  </Label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <Label className="block text-black text-sm font-bold my-2">
                    Description
                  </Label>
                  <input
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <Button
                      className=" background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </Button>
                    <Button
                      className=" bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};
export default Modal;
