import { useContext, useEffect, useId, useState } from "react";
import { BUTTON_COLOR, PROFILE_TAB } from "../../config/constants";
import { Blog, Button, Toast } from "../../components";
import {
  IconSearch,
  IconUserFilled,
  IconUser,
  IconArticle,
  IconEdit,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import useFetchBlogs from "../../hooks/useFetchBlogs";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { UserResponse } from "../../shared/types";
import { AppError } from "../../helpers/AppError";
import { Navigate } from "react-router-dom";
import NameUpdateModal from "./NameUpdateModal";
import userAPI from "../../api/userAPI";
import { Tooltip } from "@mui/material";

function Profile() {
  const [profileTab, setProfileTab] = useState<PROFILE_TAB>(
    PROFILE_TAB.MY_PROFILE,
  );

  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  async function fetchCurrentUser() {
    userAPI
      .getUserById(currentUserId!)
      .then((res) => {
        setCurrentUser(() => res.data);
      })
      .catch((err) => {
        setError(() => (err as AppError).message);
      });
  }

  const { checkLoggedIn, currentUserId } = useContext(AuthContext);

  const {
    blogs,
    errorMessage,
    setErrorMessage,
    setSearchText,
    currentPage,
    setCurrentPage,
  } = useFetchBlogs(currentUserId || "");

  const searchInputId = useId();
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = () => {
    setCurrentPage(() => 1);
    setSearchText(() => searchInput);
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!checkLoggedIn() && <Navigate to="/" replace={true} />}
      <AnimatePresence>
        {modalOpen && (
          <NameUpdateModal
            setModalOpen={setModalOpen}
            userId={currentUserId!}
            fetchCurrentUser={fetchCurrentUser}
          />
        )}
      </AnimatePresence>
      {errorMessage && (
        <Toast
          message={errorMessage}
          severity="error"
          handleToastClose={() => setErrorMessage(null)}
        />
      )}
      {error && (
        <Toast
          message={error}
          severity="error"
          handleToastClose={() => setError(null)}
        />
      )}
      <div>
        <div className="w-full flex justify-center mt-7">
          <div className="w-[80%] md:w-[500px] lg:w-[600px] h-12 text-md md:text-lg bg-gray-100 flex justify-between">
            <div
              className={`flex justify-center items-center w-1/2 cursor-pointer hover:bg-gray-200 duration-300 ${profileTab === PROFILE_TAB.MY_PROFILE ? "border-b-2 border-gray-800" : ""}`}
              onClick={(_e) => setProfileTab(() => PROFILE_TAB.MY_PROFILE)}
            >
              Profile <IconUser className="inline-block ml-2 text-gray-600" />
            </div>
            <div
              className={`flex justify-center items-center w-1/2 cursor-pointer hover:bg-gray-200 duration-300 ${profileTab === PROFILE_TAB.MY_BLOGS ? "border-b-2 border-gray-800" : ""}`}
              onClick={(_e) => setProfileTab(() => PROFILE_TAB.MY_BLOGS)}
            >
              Blogs <IconArticle className="inline-block ml-2 text-gray-600" />
            </div>
          </div>
        </div>
        {profileTab === PROFILE_TAB.MY_PROFILE && (
          <motion.div
            className="flex gap-5 justify-center items-center w-full mt-10"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
          >
            <div className="border-r-2 border-gray-700">
              <IconUserFilled className="h-16 w-16 md:w-24 md:h-24" />
            </div>
            <div className="flex flex-col items-start gap-5">
              <div className="text-xl md:text-2xl">
                <span className="font-bold">Username</span>:{" "}
                {currentUser?.Username}
              </div>
              <div className="text-lg md:text-xl flex items-center gap-2">
                <span className="font-bold">Name</span>: {currentUser?.Name}{" "}
                <Tooltip title="edit">
                  <IconEdit
                    className="cursor-pointer"
                    onClick={(_e) => setModalOpen(() => true)}
                  />
                </Tooltip>
              </div>
              <div className="text-lg md:text-xl">
                <span className="font-bold">Email</span>: {currentUser?.Email}
              </div>
            </div>
          </motion.div>
        )}
        {profileTab === PROFILE_TAB.MY_BLOGS && (
          <motion.div
            className="flex justify-center gap-7 pt-7 pb-14"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
          >
            <div className="w-fit flex flex-col gap-7">
              <div className="md:w-[500px] lg:w-[988px]">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-7 lg:grid-flow-row">
                  {blogs.map((blog) => (
                    <Blog
                      key={blog.id}
                      blog={blog}
                      currentUserId={currentUserId || ""}
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
          </motion.div>
        )}
      </div>
    </>
  );
}

export default Profile;