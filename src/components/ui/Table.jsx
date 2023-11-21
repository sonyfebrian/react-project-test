import { useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { fetchArticles } from "src/store/slices/BlogSlice";
import { useDispatch, useSelector } from "react-redux";

const Table = () => {
  const data = useSelector((state) => state.blog.articlesArray);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  console.log(data, "fetch data");
  return (
    <>
      {" "}
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
              {data.map((datas, i) => (
                <>
                  <tr className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td
                      key={i}
                      className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      {datas?.article?.title}
                    </td>
                    <td
                      key={i}
                      className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      {datas?.article?.desc}
                    </td>
                    <td
                      key={i}
                      className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                    >
                      <div className="flex items-center space-x-4">
                        <FaPencilAlt className="w-4 h-4" />
                        <FaTrash className="w-4 h-4" />
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </>
          ) : (
            <div>There are no books added yet!</div>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
