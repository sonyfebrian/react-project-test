import { useState } from "react";

import Table from "src/components/ui/Table";
import Navbar from "src/components/Navbar";
import Button from "src/components/ui/Button";
import Modal from "src/components/Modal";

const Blog = () => {
  const [showModal, setShowModal] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState(null);

  const handleEditIcon = (article) => {
    setArticleToEdit(article);
  };

  const cancelUpdate = () => {
    setArticleToEdit(null);
    setShowModal(false);
  };
  return (
    <>
      <Navbar />

      <div className="container  px-5 py-5 mx-auto">
        <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Welcome Admin
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          <Button
            onClick={() => setShowModal(true)}
            className=" bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          >
            {" "}
            + Create
          </Button>
          <Modal
            showModal={showModal}
            articleToEdit={articleToEdit}
            handleEditIcon={handleEditIcon}
            cancelUpdate={cancelUpdate}
            setShowModal={setShowModal}
          />
          <Table
            handleEditIcon={handleEditIcon}
            setShowModal={setShowModal}
            cancelUpdate={cancelUpdate}
          />
        </div>
      </div>
    </>
  );
};

export default Blog;
