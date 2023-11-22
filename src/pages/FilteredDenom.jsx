import { useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import Navbar from "src/components/Navbar";

const FilteredDenom = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredDenoms, setFilteredDenoms] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  useEffect(() => {
    // Data yang diberikan
    const jsonData = {
      status: 1,
      messages: "Sukses",
      data: {
        system_messages: "SUCCESS",
        response: {
          additionaldata: [],
          bill_details: [
            {
              admin_fee: "0.0",
              billid: "8",
              currency: "360",
              title: "TELKOMSEL 50rb = 50.149",
              totalamount: "50149.00",
              description: "null",
              body: ["DENOM : 50000"],
            },
            {
              admin_fee: "0.0",
              billid: "9",
              currency: "360",
              title: "TELKOMSEL 75rb = 74.050",
              totalamount: "74050.00",
              description: "null",
              body: ["DENOM : 75000"],
            },
            {
              admin_fee: "0.0",
              billid: "10",
              currency: "360",
              title: "TELKOMSEL 100rb = 98.264",
              totalamount: "98264.00",
              description: "null",
              body: ["DENOM : 100000"],
            },
            {
              admin_fee: "0.0",
              billid: "11",
              currency: "360",
              title: "TELKOMSEL 150rb = 146.600",
              totalamount: "146600.00",
              description: "null",
              body: ["DENOM : 150000"],
            },
            {
              admin_fee: "0.0",
              billid: "12",
              currency: "360",
              title: "TELKOMSEL 200rb = 194.900",
              totalamount: "194900.00",
              description: "null",
              body: ["DENOM : 200000"],
            },
          ],
          billername: "PULSA TSEL",
          inquiryid: "27190993",
          paymenttype: "CLOSE_PAYMENT",
          responcode: "0000",
          responsemsg: "SUCCESS",
          subscribedid: "081311529594",
          subcribername: "",
        },
        trace: {
          session_id: "812154EFADFB710C1258F79ABA1AD710.node3",
          request_date_time: "20190704185319",
          words: "7796718280415b568cdfd0abcc20e18b585",
          biller_id: "990002",
          account_number: "08131529594",
          systrace: 1564026434,
          inqury_id: "27190993",
        },
      },
    };

    // Fungsi untuk melakukan filter
    function filterDenomGreaterThan(data, threshold) {
      const denoms = data.data.response.bill_details
        .filter((item) => {
          const denom = parseInt(item.body[0].split(" ")[2]);
          return denom >= threshold;
        })
        .map((item) => {
          return parseInt(item.body[0].split(" ")[2]);
        });

      return denoms;
    }

    // Simpan data awal sebelum filter
    // setOriginalData(jsonData);
    setOriginalData(jsonData.data.response.bill_details);
    // Panggil fungsi filter dan atur state filteredDenoms
    const filteredArray = filterDenomGreaterThan(jsonData, 100000);
    setFilteredDenoms(filteredArray);
  }, []); // useEffect hanya dipanggil sekali saat komponen dimount

  function filterDenomGreaterThan(threshold) {
    const filteredArray = originalData
      .filter((item) => {
        const denom = parseInt(item.body[0].split(" ")[2]);
        return denom >= threshold;
      })
      .map((item) => parseInt(item.body[0].split(" ")[2]));

    setFilteredDenoms(filteredArray);
    setFilterApplied(true);
  }

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Data Bill Details:
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 bg-white p-6 rounded-lg">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  Original Data
                </h1>
                <table className="min-w-full border divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        Index
                      </th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                        DENOM
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {originalData.map((item, index) => (
                      <tr
                        key={index}
                        className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {index}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {String(item.body).replace("DENOM : ", "")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {filterApplied ? (
              <div className="xl:w-1/3 md:w-1/2 p-4">
                <div className="border border-gray-200 bg-white  p-6 rounded-lg">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                    Filter Data
                  </h1>
                  <table className="min-w-full border divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          Index
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                          DENOM
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredDenoms.map((denom, index) => (
                        <tr
                          className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                          key={index}
                        >
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {index}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {denom}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <>
                <Button
                  className=" bg-gradient-to-r from-blue-500 to-blue-600 text-white h-10 mt-10"
                  onClick={() => filterDenomGreaterThan(100000)}
                >
                  Filter Data
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FilteredDenom;
