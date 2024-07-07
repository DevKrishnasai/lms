"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { DragHandleDots1Icon } from "@radix-ui/react-icons";
import { Delete, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { updateTheField } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ChaptersFieldProps {
  chapters: Chapter[];
  courseId: string;
  onReorder: (result: { id: string; order: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChaptersArea = ({
  chapters,
  onEdit,
  onReorder,
  courseId,
}: ChaptersFieldProps) => {
  const [chaptersList, setChaptersList] = useState(chapters);
  useEffect(() => {
    setChaptersList(chapters);
  }, [chapters]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(chaptersList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const [start, end] = [
      Math.min(result.source.index, result.destination.index),
      Math.max(result.source.index, result.destination.index),
    ];

    const updatedChapters = items.slice(start, end + 1);

    setChaptersList(items);

    const bulkUpdate = updatedChapters.map((chapter, index) => {
      return {
        id: chapter.id,
        order: start + index,
      };
    });
    onReorder(bulkUpdate);
  };

  const router = useRouter();
  const onDelete = async (id: string) => {
    await updateTheField(
      {},
      `/api/teacher/update/${courseId}/chapter/${id}`,
      "DELETE",
      true
    );
    router.refresh();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chaptersList.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className="flex flex-col bg-black text-white dark:bg-white dark:text-black mb-3 rounded-md group"
                    ref={provided.innerRef}
                    {...(provided.draggableProps as any)}
                  >
                    <div {...provided.dragHandleProps}>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <DragHandleDots1Icon className="h-full w-9 hover:bg-slate-500 animate-pulse" />
                          <p className="font-bold text-lg">{chapter.title}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {chapter.isFree && (
                            <Badge className="bg-white dark:bg-black text-black dark:text-white">
                              Free
                            </Badge>
                          )}
                          {chapter.isPublished ? (
                            <Badge className="bg-green-700">Published</Badge>
                          ) : (
                            <Badge className="bg-white dark:bg-black text-black dark:text-white animate-pulse">
                              Draft
                            </Badge>
                          )}
                          <button
                            onClick={() => onEdit(chapter.id)}
                            className=""
                          >
                            <Pencil className="group-hover:animate-spin" />
                          </button>
                          <button
                            onClick={() => onDelete(chapter.id)}
                            className="mr-2"
                          >
                            <Delete />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersArea;
