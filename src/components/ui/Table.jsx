import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { fetchArticles, deleteArticle } from "src/store/slices/BlogSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const Table = ({ setShowModal, handleEditIcon }) => {
  const data = useSelector((state) => state.blog.articlesArray);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.length) {
      setIsLoading(true);
      dispatch(fetchArticles())
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to fetch articles",
          });
          console.error("Error fetching articles:", error);
        });
    }
  }, [data.length, dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        dispatch(deleteArticle(id));
      }
    });
  };

  return (
    <>
      <table className="min-w-full border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Title
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Description
            </th>

            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length > 0 ? (
            <>
              {data.map((datas) => (
                <tr
                  key={datas.id}
                  className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                >
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {datas?.article?.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {datas?.article?.desc}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <FaPencilAlt
                        className="w-4 h-4  cursor-pointer"
                        onClick={() => {
                          handleEditIcon(datas);
                          setShowModal(true);
                        }}
                      />

                      <FaTrash
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => handleDelete(datas.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {isLoading && (
                <tr>
                  <td
                    colSpan={3}
                    className="whitespace-nowrap px-6 py-4 text-center "
                  >
                    Please wait..
                    <span
                      className="ml-3 inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></span>
                  </td>
                </tr>
              )}
              {!isLoading && data.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="whitespace-nowrap px-6 py-4 text-center"
                  >
                    No articles available. Please create new articles.
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};
Table.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  handleEditIcon: PropTypes.func.isRequired,
};
export default Table;
