import { Button } from "../../components";
import Blog from "../../components/Blog/Blog";
import { useContext, useState, useId, useEffect } from "react";
import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { Tooltip, Stack, Pagination, CircularProgress } from "@mui/material";
import Modal from "../../components/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import { Toast } from "../../components";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import useFetchBlogs from "../../hooks/useFetchBlogs";
import { motion } from "framer-motion";
import { BUTTON_COLOR } from "../../config/constants";
import blogAPI from "../../api/blogAPI";
import { AppError } from "../../helpers/AppError";
import { SubmitHandler, useForm } from "react-hook-form";
import { BlogFormFields, blogValidationSchema } from "../../shared/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router-dom";

function Home() {
  const [searchParams] = useSearchParams();
  const urlPage = Number(searchParams.get("page")) || 1;
  const urlSearch = searchParams.get("search") || "";
  const {
    blogs,
    errorMessage,
    setErrorMessage,
    // filterType,
    // setFilterType,
    searchText,
    setSearchText,
    // currentPage,
    setCurrentPage,
    fetchBlogs,
    totalPages,
    loading,
  } = useFetchBlogs({ pageNumber: urlPage, blogSearchText: urlSearch });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { checkLoggedIn, currentUserId } = useContext(AuthContext);
  const searchInputId = useId();
  const [searchInput, setSearchInput] = useState<string>(urlSearch);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const isLoggedIn: boolean = checkLoggedIn();

  useEffect(() => {
    setCurrentPage(urlPage);
    setSearchInput(urlSearch);
    setSearchText(urlSearch);
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlPage, urlSearch]);

  const handleToastClose = () => {
    setErrorMessage(() => null);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSearch = () => {
    const queryParams = `${searchInput ? `?search=${searchInput}` : ""}`;
    navigate(queryParams);
    setCurrentPage(() => 1);
    setSearchText(() => searchInput);
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogFormFields>({
    resolver: yupResolver(blogValidationSchema),
  });

  const onBlogSubmit: SubmitHandler<BlogFormFields> = (data) => {
    blogAPI
      .createBlog(data.title, data.description)
      .then((res) => {
        setSuccess(res.message);
        reset();
        toggleModal();
        fetchBlogs();
      })
      .catch((err) => {
        setError((err as AppError).message);
      });
  };

  const handleClearSearch = () => {
    setSearchInput((_p) => "");
  };

  const navigatePage = (pageNumber: number) => {
    const queryParams = `?page=${pageNumber}${searchText ? `&search=${searchText}` : ""}`;
    setCurrentPage((_p) => pageNumber);
    navigate(queryParams);
  };

  return (
    <>
      {errorMessage && (
        <Toast
          message={errorMessage}
          severity="error"
          handleToastClose={handleToastClose}
        />
      )}
      {error && (
        <Toast
          message={error}
          severity="error"
          handleToastClose={() => setError(null)}
        />
      )}
      {success && (
        <Toast
          message={success}
          severity="success"
          handleToastClose={() => setSuccess(null)}
        />
      )}

      <div className="flex flex-col items-center pt-7 pb-14">
        <div className="w-fit flex flex-col gap-7">
          <div className="md:w-[500px] lg:w-[988px]">
            {/* <FilterBar filterType={filterType} setFilterType={setFilterType} /> */}
            <div className="border-2 border-gray-800 text-lg rounded-md flex mt-7">
              <input
                id={searchInputId}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearchEnter}
                type="text"
                placeholder="Search..."
                className="w-full rounded-md px-3 py-1 focus:outline-none"
              />
              {searchInput && (
                <Tooltip title="clear search">
                  <div>
                    <Button
                      color={BUTTON_COLOR.GRAY}
                      rounded={false}
                      handleClick={handleClearSearch}
                    >
                      <IconX />
                    </Button>
                  </div>
                </Tooltip>
              )}
              <Button
                color={BUTTON_COLOR.BLACK}
                rounded={false}
                handleClick={handleSearch}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconSearch />
                </motion.div>
              </Button>
            </div>
          </div>

          {loading && (
            <div className="w-full flex justify-center mt-10 mb-10">
              <CircularProgress color="inherit" />
            </div>
          )}

          {!loading && (
            <>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-7 lg:grid-flow-row">
                  {blogs.map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      currentUserId={currentUserId || ""}
                      isLoggedIn={isLoggedIn}
                      setSuccess={setSuccess}
                      setError={setError}
                      fetchBlogs={fetchBlogs}
                    />
                  ))}
                </div>
                {!blogs.length && (
                  <span className="text-xl">No blogs found :(</span>
                )}
              </div>
              <div className="w-full flex justify-center">
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={urlPage}
                    onChange={(_event, value) => navigatePage(value)}
                  />
                </Stack>
              </div>
            </>
          )}
        </div>
      </div>

      {checkLoggedIn() && (
        <Tooltip title="Write a blog" placement="left">
          <button
            onClick={() => toggleModal()}
            className="fixed bottom-12 right-12 bg-green-700 text-white p-2 rounded-full hover:rotate-90 focus:rotate-45 duration-300 shadow-lg"
          >
            <IconPlus />
          </button>
        </Tooltip>
      )}
      <AnimatePresence>
        {isModalOpen && (
          <Modal handleClose={toggleModal}>
            <form
              className="w-[350px] md:w-[600px] px-10 py-7 text-lg"
              onSubmit={handleSubmit(onBlogSubmit)}
            >
              <div>
                <p className="text-red-500">{errors.title?.message}</p>
                <input
                  type="text"
                  className="border-2 border-gray-500 w-full rounded-lg mb-3 p-2"
                  placeholder="Title..."
                  {...register("title")}
                />
              </div>
              <div>
                <p className="text-red-500">{errors.description?.message}</p>
                <textarea
                  className="border-2 border-gray-500 resize-none w-full rounded-lg h-52 p-2"
                  placeholder="Description..."
                  {...register("description")}
                />
              </div>
              <div className="flex justify-center mt-2">
                <Button color={BUTTON_COLOR.GREEN}>Create</Button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Home;
