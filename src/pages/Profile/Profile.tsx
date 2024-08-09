import { useContext, useEffect, useId, useState } from "react";
import { BUTTON_COLOR, PROFILE_TAB } from "../../config/constants";
import { Blog, Button, ProfileLoader, Toast } from "../../components";
import {
  IconSearch,
  IconUserFilled,
  IconUser,
  IconArticle,
  IconEdit,
  IconShieldLock,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import useFetchBlogs from "../../hooks/useFetchBlogs";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { UserResponse } from "../../shared/types";
import { AppError } from "../../helpers/AppError";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import NameUpdateModal from "./NameUpdateModal";
import userAPI from "../../api/userAPI";
import { CircularProgress, Pagination, Stack, Tooltip } from "@mui/material";
import PasswordUpdateForm from "./PasswordUpdateForm";

function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlProfileSection = searchParams.get("section") || PROFILE_TAB.INFO;

  const [profileTab, setProfileTab] = useState<string>(urlProfileSection);

  const { userId } = useParams();

  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);

  const { checkLoggedIn, currentUserId } = useContext(AuthContext);

  const searchInputId = useId();

  const {
    blogs,
    errorMessage,
    setErrorMessage,
    setSearchText,
    currentPage,
    setCurrentPage,
    fetchBlogs,
    totalPages,
    loading,
  } = useFetchBlogs({ currentAuthorId: userId });

  const [searchInput, setSearchInput] = useState<string>("");

  const isLoggedIn = checkLoggedIn();

  async function fetchUser() {
    setProfileLoading((_p) => true);
    userAPI
      .getUserById(userId!)
      .then((res) => {
        setCurrentUser(() => res.data);
      })
      .catch((err) => {
        setError(() => (err as AppError).message);
        navigate("404");
      })
      .finally(() => {
        setProfileLoading((_p) => false);
      });
  }

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
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoggedIn && urlProfileSection === PROFILE_TAB.SECURITY) {
      navigate(`?section=${PROFILE_TAB.INFO}`);
      return;
    }
    setProfileTab((_p) => urlProfileSection);
  }, [urlProfileSection, isLoggedIn]);

  return (
    <>
      {/* {!isLoggedIn && <Navigate to="/" replace={true} />} */}
      <AnimatePresence>
        {modalOpen && (
          <NameUpdateModal
            setModalOpen={setModalOpen}
            userId={currentUserId!}
            prevName={currentUser!.name}
            fetchCurrentUser={fetchUser}
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
      {success && (
        <Toast
          message={success}
          severity="success"
          handleToastClose={() => setSuccess(null)}
        />
      )}
      <div>
        <div className="w-full flex justify-center mt-7">
          <div className="w-[90%] md:w-[500px] lg:w-[600px] h-12 text-md md:text-lg bg-gray-100 flex justify-between">
            <div
              className={`flex justify-center items-center w-1/2 cursor-pointer hover:bg-gray-200 duration-300 ${profileTab === PROFILE_TAB.INFO ? "border-b-2 border-gray-800" : ""}`}
              onClick={(_e) => navigate(`?section=${PROFILE_TAB.INFO}`)}
            >
              Profile <IconUser className="inline-block ml-2 text-gray-600" />
            </div>
            <div
              className={`flex justify-center items-center w-1/2 cursor-pointer hover:bg-gray-200 duration-300 ${profileTab === PROFILE_TAB.MY_BLOGS ? "border-b-2 border-gray-800" : ""}`}
              onClick={(_e) => navigate(`?section=${PROFILE_TAB.MY_BLOGS}`)}
            >
              Blogs <IconArticle className="inline-block ml-2 text-gray-600" />
            </div>
            {isLoggedIn && currentUserId === userId && (
              <div
                className={`flex justify-center items-center w-1/2 cursor-pointer hover:bg-gray-200 duration-300 ${profileTab === PROFILE_TAB.SECURITY ? "border-b-2 border-gray-800" : ""}`}
                onClick={(_e) => navigate(`?section=${PROFILE_TAB.SECURITY}`)}
              >
                Security
                <IconShieldLock className="inline-block ml-2 text-gray-600" />
              </div>
            )}
          </div>
        </div>
        {profileTab === PROFILE_TAB.INFO && (
          <motion.div
            className="flex gap-5 justify-center items-center w-full mt-10"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
          >
            <div className="border-r-2 border-gray-700">
              <IconUserFilled className="h-16 w-16 md:w-24 md:h-24" />
            </div>
            {!profileLoading && currentUser ? (
              <div className="flex flex-col items-start gap-5">
                <div className="text-xl md:text-2xl">
                  <span className="font-bold">Username</span>:{" "}
                  {currentUser?.username}
                </div>
                <div className="text-lg md:text-xl flex items-center gap-2">
                  <span className="font-bold">Name</span>: {currentUser?.name}{" "}
                  {isLoggedIn && currentUserId === userId && (
                    <Tooltip title="edit">
                      <IconEdit
                        className="cursor-pointer"
                        onClick={(_e) => setModalOpen(() => true)}
                      />
                    </Tooltip>
                  )}
                </div>
                <div className="text-lg md:text-xl">
                  <span className="font-bold">Email</span>: {currentUser?.email}
                </div>
              </div>
            ) : (
              <ProfileLoader />
            )}
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

              {loading && (
                <div className="w-full flex justify-center mt-20">
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
                        page={currentPage}
                        onChange={(_event, value) =>
                          setCurrentPage((_p) => value)
                        }
                      />
                    </Stack>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
        {isLoggedIn &&
          currentUserId === userId &&
          profileTab === PROFILE_TAB.SECURITY && <PasswordUpdateForm />}
      </div>
    </>
  );
}

export default Profile;
