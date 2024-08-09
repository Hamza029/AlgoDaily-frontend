import { Skeleton } from "@mui/material";

function ProfileLoader() {
  return (
    <div className="flex flex-col items-start gap-5">
      <Skeleton animation="wave" width={220} height={40} />
      <Skeleton animation="wave" width={250} height={32} />
      <Skeleton animation="wave" width={250} height={32} />
    </div>
  );
}

export default ProfileLoader;
