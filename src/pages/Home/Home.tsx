import { Button, FilterBar } from "../../components";
import Blog from "../../components/Blog/Blog";
import { AppContext } from "../../contexts/AppContext/AppContext";
import { useContext } from "react";

function Home() {
  const { blogs } = useContext(AppContext);

  console.log(blogs);

  return (
    <div className="flex flex-col items-center pt-7 pb-14">
      <div className="w-fit flex flex-col gap-7">
        <FilterBar />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
        <div className="w-full border-t border-gray-300">
          <div className="mt-2 flex items-center justify-between">
            <div>
              <p>
                showing <strong>1</strong> to <strong>10</strong> of{" "}
                <strong>20</strong> results
              </p>
            </div>
            <div className="space-x-2">
              <Button color="black">
                <div className="w-20">&larr; Previous</div>
              </Button>
              <Button color="black">
                <div className="w-20">Next &rarr;</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
