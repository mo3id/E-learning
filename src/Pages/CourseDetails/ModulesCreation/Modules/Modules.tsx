import { useEffect, useState } from "react";
import { CollapseProps } from "antd";
import { Collapse } from "antd";
import { ModalTypes } from "../../../../Services/Interfaces/modalTypes";
import RessourseItems from "../../../../Components/RessourseItems/RessourseItems";
import { useAppSelector } from "../../../../Hooks/ReduxHook";
import { User } from "../../../../Redux/Slices/UserSlice";

type ModuleTypes = ModalTypes & {
  id?: string | number;
  title?: string;
  lessons: [];
  study?: boolean;
  index: number;
};
type lessonINterface = {
  id?: number;
  name?: string;
  description?: string;
  course_id?: number;
  module_id?: number;
  resources?: [];
};

function Modules({ title, lessons, index, study }: ModuleTypes) {
  const [itemsNest, setItemsNest] = useState([] as CollapseProps["items"]);
  const { userData } = useAppSelector(User);

  useEffect(() => {
    if (lessons.length > 0) {
      const MappingElements: CollapseProps["items"] = lessons.map(
        (item: lessonINterface, index: number) => {
          return {
            key: item.id,
            label: `Lesson ${index + 1} :  ${item.name}`,
            children: (
              <>
                <p>{item.description}</p>
                {userData.role === "teacher" && (
                  <RessourseItems resources={item.resources!} />
                )}
              </>
            ),
          };
        }
      );
      setItemsNest(MappingElements);
    }
    //   else {
    //   const EmptyCollapse: CollapseProps["items"] = [
    //     {
    //       key: "1",
    //       label: "lessons",
    //       children: <p className="text-center">No Lessons Yet</p>,
    //     },
    //   ];
    //   setItemsNest(EmptyCollapse);
    // }
  }, []);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: `Module ${index + 1} :  ${title}`,
      children: (
        <>
          {itemsNest!.length > 0 ? (
            <Collapse items={itemsNest} />
          ) : (
            <p className="text-center">No lesson found in this module </p>
          )}
          {/* <Collapse items={itemsNest} /> */}
          {/* <Row justify="center" className="mt-3"></Row> */}
        </>
      ),
    },
  ];
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return <Collapse onChange={onChange} items={items} />;
}

export default Modules;
