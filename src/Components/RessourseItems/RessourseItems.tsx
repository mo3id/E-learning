import {
  FileImageTwoTone,
  VideoCameraTwoTone,
  FilePdfTwoTone,
  FileWordTwoTone,
  FileExcelTwoTone,
} from "@ant-design/icons";
type resourse = {
  id: number;
  path: string;
  type: string;
};
type resoursesProps = {
  resources: resourse[];
};
import styles from "./RessourseItems.module.css";
import { useAppDispatch } from "../../Hooks/ReduxHook";
import { showResourcesModalReducer } from "../../Redux/Slices/ResourcesModalSlice";
export default function RessourseItems({ resources }: resoursesProps) {
  const dispatch = useAppDispatch();

  const fileExtension = (filePath: string) => {
    return filePath.split("/")[0];
  };

  function getIcon(str: string) {
    const iconStr = fileExtension(str);
    switch (iconStr) {
      case "image":
        return <FileImageTwoTone title="Image" />;
      case "video":
        return <VideoCameraTwoTone title="Video" />;
      case "application":
        return <FilePdfTwoTone title="Pdf" />;
      case "doc":
        return <FileWordTwoTone title="Word" />;
      case "docx":
        return <FileWordTwoTone title="Word" />;
      case "xlsx":
        return <FileExcelTwoTone title="Excel" />;
      default:
        break;
    }
  }
  function onOction(res: resourse) {
    const str = res.type.split("/")[1];
    console.log(res);
    const title = res.path.slice(res.path.lastIndexOf("_") + 1);
    if (str === "jpeg" || str === "jpg" || str === "png" || str === "gif") {
      dispatch(
        showResourcesModalReducer({
          type: "image",
          title: title,
          resource: res.path,
        })
      );
    } else if (
      str === "mp4" ||
      str === "wmv" ||
      str === "ogg" ||
      str === "webm"
    ) {
      dispatch(
        showResourcesModalReducer({
          type: "video",
          title: title,
          resource: res.path,
        })
      );
    } else if (
      str === "pdf" ||
      str === "doc" ||
      str === "docx" ||
      str === "xlsx"
    ) {
      console.log("====================================");
      console.log(":gyfyvy");
      console.log("====================================");
      window.open(res.path);
    }
  }
  return (
    <>
      {resources.map((res: resourse, index: number) => {
        return (
          <>
            <p
              className={styles.resourseLink}
              onClick={() => onOction(res)}
              key={index}
            >
              <span>{getIcon(res.type)}</span>{" "}
              {res.path.slice(res.path.lastIndexOf("_") + 1)}
            </p>
          </>
        );
      })}
    </>
  );
}
