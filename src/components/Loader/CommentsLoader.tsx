import { Skeleton } from "@mui/material";

function CommentsLoader() {
  return (
    <div className="flex flex-col items-start gap-1 ml-3 mt-3">
      <Skeleton animation="wave" width={220} height={18} />
      <Skeleton animation="wave" width={250} height={16} />
      <Skeleton animation="wave" width={150} height={16} />
    </div>
  );
}

export default CommentsLoader;
