import { FC } from "react";
import ImageTaken from "../components/ImageTaken";
import LoadFaceAPI from "../components/LoadFaceAPI";

const FaceTaken: FC = () => {
  return (
    <>
      <LoadFaceAPI />
      <div className="container mx-auto">
        <div className="flex justify-center">
          <ImageTaken />
        </div>
      </div>
    </>
  );
};

export default FaceTaken;
