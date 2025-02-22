import { useParams } from "react-router-dom";
import MainLayout from "../MainLayout";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* main image */}
        <div className="w-[550px] max-h-max overflow-hidden">
          <img
            className="object-cover w-full transition-transform duration-500 ease-in-out hover:scale-150"
            src="https://2885706055.e.cdneverest.net/img/1517/2000/resize/1/t/1tl23w006-fb446-122-1-u.webp"
            alt="clothes"
          />
        </div>

        {/* show images */}
        <div className="flex items-center justify-start w-full gap-4 md:ml-4 lg:flex-col">
          <div className="cursor-pointer">
            <img
              className="object-cover w-24"
              src="https://2885706055.e.cdneverest.net/img/212/284/resize/1/t/1tl23w006-fb446-122-2.webp"
              alt="sub_img"
            />
          </div>

          <div className="cursor-pointer">
            <img
              className="object-cover w-24"
              src="https://2885706055.e.cdneverest.net/img/212/284/resize/1/t/1tl23w006-fb446-122-2.webp"
              alt="sub_img"
            />
          </div>
        </div>

        {/* color and size picker */}
        <div>
          <div>
            <h3 className="mb-4 text-xl">
              Áo khoác gió bé trai chống thấm nước lót lông
            </h3>

            <h4 className="text-2xl font-bold">199.000d</h4>
            <div>
              <span className="mr-2 text-base line-through">499.000d </span>
              <span className="text-red-500">-60%</span>
            </div>
          </div>

          {/* colors */}
          <div>
            <h3 className="mt-4 mb-2 text-base font-bold">Màu sắc: FB446</h3>

            <div>
              <div
                className={`h-10 w-10 bg-white cursor-pointer border border-slate-600 flex justify-center items-center`}
              >
                <div className={`bg-[#BFE0ED] w-5/6 h-5/6 rounded-full`}></div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mt-4 mb-2 text-base font-bold">Size</h3>

            {/* sizes */}
            <div className="flex items-center max-w-full overflow-auto gap-x-2">
              {["S", "M", "XL", "L"].map((size) => (
                <div
                  key={size}
                  className={`h-10 w-10 cursor-pointer flex justify-center items-center bg-slate-200`}
                >
                  <div className={`rounded-full font-bold`}>100</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <button className="w-full py-3 my-4 text-white bg-red-500 rounded-md hover:bg-red-600 active:bg-red-700">
              Thêm vào giỏ
            </button>
          </div>

          <div>
            <h3 className="mt-4 mb-2 text-base font-bold">Description</h3>
            <p>
              Áo khoác parka in tràn họa tiết tráng cao su chống thấm nước, có
              mũ trùm đầu, dài tay. Cài khóa kéo phía trước. Có hai túi ở phía
              trước. Lót trong bằng chất liệu lông cừu nhân tạo.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
