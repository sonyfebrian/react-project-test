import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  addArticleToFirestore,
  fetchArticles,
  updateArticle,
} from "src/store/slices/BlogSlice";

import Label from "./ui/Label";
import Button from "./ui/Button";

const Modal = ({ showModal, setShowModal, articleToEdit, cancelUpdate }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // add article states
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");

  // update article states
  const [editedDesc, setEditedDesc] = useState("");
  const [editedTitle, setEditedTitle] = useState("");

  //updating update book states
  useEffect(() => {
    if (articleToEdit !== null) {
      setEditedDesc(articleToEdit.article.desc);
      setEditedTitle(articleToEdit.article.title);
    }
  }, [articleToEdit]);

  // add article event
  const handleCreate = async (e) => {
    e.preventDefault();
    let article = {
      desc,
      title,
    };

    try {
      setIsLoading(true);
      await dispatch(addArticleToFirestore(article));
      Swal.fire({
        icon: "success",
        title: "success create data",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(fetchArticles());
      setShowModal(false);
      setDesc("");
      setTitle("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Error adding article:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // update article event
  const handleUpdate = (e) => {
    e.preventDefault();
    let article = {
      desc: editedDesc,
      title: editedTitle,
    };
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateArticle({ id: articleToEdit.id, article }));
        Swal.fire("Saved!", "", "success");
        setShowModal(false);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        setShowModal(false);
        cancelUpdate();
      } else {
        setShowModal(false);
      }
    });
  };

  return (
    <>
      {" "}
      {articleToEdit === null ? (
        <>
          {showModal && (
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                    <h2 className="block text-black text-sm font-bold">
                      Create
                    </h2>
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
                          Cancel
                        </Button>
                        <Button
                          className=" bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="submit"
                        >
                          {isLoading ? (
                            <div className="text-bold">
                              Please wait..
                              <div
                                className="ml-3 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                              ></div>
                            </div>
                          ) : (
                            <>Save</>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {showModal && (
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                    <h2 className="block text-black text-sm font-bold">Edit</h2>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={cancelUpdate}
                    >
                      <IoIosCloseCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form onSubmit={handleUpdate}>
                      <Label className="block text-black text-sm font-bold mb-2">
                        Title
                      </Label>
                      <input
                        onChange={(e) => setEditedTitle(e.target.value)}
                        value={editedTitle}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      />
                      <Label className="block text-black text-sm font-bold my-2">
                        Description
                      </Label>
                      <input
                        onChange={(e) => setEditedDesc(e.target.value)}
                        value={editedDesc}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      />
                      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <Button
                          className=" background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={cancelUpdate}
                        >
                          Cancel
                        </Button>
                        <Button
                          className=" bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  articleToEdit: PropTypes.object,
  cancelUpdate: PropTypes.func.isRequired,
};
export default Modal;
