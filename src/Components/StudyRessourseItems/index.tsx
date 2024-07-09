import {
  FileImageTwoTone,
  VideoCameraTwoTone,
  FilePdfTwoTone,
  FileWordTwoTone,
  FileExcelTwoTone,
  AudioTwoTone,
} from "@ant-design/icons";
type resourse = {
  id?: number;
  path?: string;
  type?: string;
};
type resoursesProps = {
  resources?: resourse[];
};
import styles from "./RessourseItems.module.css";
export default function StudyRessourseItems({ resources }: resoursesProps) {

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
      case "audio":
        return <AudioTwoTone title="audio" />;
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

  return (
    <div className="d-flex flex-column">
      {resources?.map((res: resourse, index: number) => (
        <div key={index}>
          {res.type?.split("/")[0] === "video" ? (
            <>
              <video width="100%" controls src={res.path} className="order-1" />
              <h3>assets</h3>
            </>
          ) : (
            <p
              className={styles.resourseLink}
              onClick={() => window.open(res.path)}
              key={index}
            >
              <span>{getIcon(res.type!)}</span>{" "}
              {res.path?.slice(res.path?.lastIndexOf("_") + 1)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
