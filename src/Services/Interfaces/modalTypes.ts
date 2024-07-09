export type ModalTypes = {
  open?: boolean | undefined;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type lessonsType = ModalTypes & {
  id: number;
  name: string;
  description: string;
  hours: { hours: string; minutes: string };
  course_id: number;
  module_id: number;
  lessons: [];
  resources: [];
};

export type ModuleTypes = ModalTypes & {
  course_id?: number;
  title?: string;
  moduleId?: number | string;
  lessons?: lessonsType[];
};

export type LessonModalTypes = ModalTypes & {
  moduleId: number;
};
