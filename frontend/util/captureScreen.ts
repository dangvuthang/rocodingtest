import axios from "axios";
import html2canvas from "html2canvas";

const captureScreen = async () => {
  try {
    const image = await html2canvas(document.body);
    const base64Image = image.toDataURL("image/png");
    return base64Image;
  } catch (error) {
    console.log(error);
  }
};

const savedToCloudinary = async (image: string) => {
  try {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "iiyg1094");
      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/dybygufkr/image/upload",
        formData
      );
      console.log(result);
      return result.data.secure_url;
    }
  } catch (error) {
    console.log(error);
  }
};

export { captureScreen, savedToCloudinary };
