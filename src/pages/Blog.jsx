import { useState } from "react";

import Table from "src/components/ui/Table";
import Navbar from "src/components/Navbar";
import Button from "src/components/ui/Button";
import Modal from "src/components/Modal";

const Blog = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Navbar />{" "}
      <div className="container  px-5 py-24 mx-auto">
        <Button
          onClick={() => setShowModal(true)}
          className=" bg-gradient-to-r from-blue-500 to-blue-600 text-white"
        >
          {" "}
          + Create
        </Button>
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <Table />
      </div>
    </>
  );
};

export default Blog;
