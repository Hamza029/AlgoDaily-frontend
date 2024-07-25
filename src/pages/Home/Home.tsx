import { Button, FilterBar } from "../../components";
import Blog from "../../components/Blog/Blog";
import { useContext, useState, useId } from "react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { Tooltip } from "@mui/material";
import Modal from "../../components/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import { Toast } from "../../components";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import useFetchBlogs from "../../hooks/useFetchBlogs";
import { motion } from "framer-motion";
import { FileText, FileJson, CodeXml } from "lucide-react";
import { BUTTON_COLOR } from "../../config/constants";
import blogAPI from "../../api/blogAPI";
import { AppError } from "../../helpers/AppError";

function Home() {
  const {
    blogs,
    errorMessage,
    setErrorMessage,
    filterType,
    setFilterType,
    setSearchText,
    currentPage,
    setCurrentPage,
  } = useFetchBlogs();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] =
    useState<boolean>(false);
  const { checkLoggedIn } = useContext(AuthContext);
  const searchInputId = useId();
  const [searchInput, setSearchInput] = useState<string>("");
  const [blogTitleInput, setBlogTitleInput] = useState<string>("");
  const [blogDescriptionInput, setBlogDescriptionInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleToastClose = () => {
    setErrorMessage(() => null);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleDownloadModal = () => {
    setIsDownloadModalOpen((prev) => !prev);
  };

  const handleSearch = () => {
    setSearchText(() => searchInput);
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const onBlogSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    blogAPI
      .createBlog(blogTitleInput, blogDescriptionInput)
      .then((res) => {
        setBlogTitleInput((_prev) => "");
        setBlogDescriptionInput((_prev) => "");
        setSuccess(res.message);
      })
      .catch((err) => {
        setBlogTitleInput((_prev) => "");
        setBlogDescriptionInput((_prev) => "");
        setError((err as AppError).message);
      });
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
            <FilterBar filterType={filterType} setFilterType={setFilterType} />
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
          <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-7">
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  toggleDownloadModal={toggleDownloadModal}
                />
              ))}
            </div>
            {!blogs.length && (
              <span className="text-xl">No blogs found :(</span>
            )}
          </div>
          <div className="w-full border-t border-gray-300 pt-3 flex justify-center items-center gap-3">
            <Button
              color={BUTTON_COLOR.GRAY}
              handleClick={(_e) =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
            >
              &larr;
            </Button>
            Page: <strong>{currentPage}</strong>
            <Button
              color={BUTTON_COLOR.GRAY}
              handleClick={(_e) => setCurrentPage((prev) => prev + 1)}
            >
              &rarr;
            </Button>
          </div>
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
              action=""
              className="w-[350px] md:w-[600px] h-96 p-10 text-lg"
            >
              <div>
                <input
                  required
                  type="text"
                  className="border-2 border-gray-500 w-full rounded-lg mb-3 p-2"
                  placeholder="Title..."
                  onChange={(e) => setBlogTitleInput(e.target.value)}
                  value={blogTitleInput}
                />
              </div>
              <div>
                <textarea
                  required
                  className="border-2 border-gray-500 resize-none w-full rounded-lg h-52 p-2"
                  placeholder="Description..."
                  onChange={(e) => setBlogDescriptionInput(e.target.value)}
                  value={blogDescriptionInput}
                />
              </div>
              <div className="flex justify-center mt-2">
                <Button color={BUTTON_COLOR.GREEN} handleClick={onBlogSubmit}>
                  Submit
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isDownloadModalOpen && (
          <Modal handleClose={toggleDownloadModal}>
            <div className="flex flex-col gap-3 items-center w-64 h-64 p-7 text-lg">
              <div className="font-bold text-xl">Download as</div>
              <Button color={BUTTON_COLOR.GRAY} wide={true} rounded={false}>
                <div className="flex justify-center items-center gap-3">
                  Text <FileText />
                </div>
              </Button>
              <Button color={BUTTON_COLOR.GRAY} wide={true} rounded={false}>
                <div className="flex justify-center items-center gap-3">
                  JSON <FileJson />
                </div>
              </Button>
              <Button color={BUTTON_COLOR.GRAY} wide={true} rounded={false}>
                <div className="flex justify-center items-center gap-3">
                  XML <CodeXml />
                </div>
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Home;
