import useAppwrite from "@/app/hook/appwrite";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { setSelectNote } from "@/app/redux/slice/note.slice";
import { motion } from "framer-motion";
import { CollectionId, DatabaseId } from "@/libs/database";
import { ID } from "appwrite";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useAlert } from "@/app/hook/AlertContext";
const NoteDetail = () => {
  const { openAlert, toastAlert, closeAlert }: any = useAlert();
  const selectedNote = useAppSelector((state) => state.note.selectedNote);
  const { databases } = useAppwrite();
  const editorRef: any = useRef(null);
  const [titleInput, setTitleInput] = useState("");
  const [detail, setDetail] = useState<any>("");
  const dispath = useAppDispatch();

  const backToMain = () => {
    dispath(setSelectNote(""));
  };

  useEffect(() => {
    if (!databases) return;
    if (selectedNote == "add") return;
    const result: any = databases?.getDocument(
      DatabaseId.focusifyApp,
      CollectionId.note,
      selectedNote
    );
    result
      .then(function (response: any) {
        console.log(response);
        setTitleInput(response.title);
        setDetail(response.text);
        editorRef.current?.setContent(response.text);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [databases, selectedNote]);

  const handleSaveNote = () => {
    if (selectedNote == "add") {
      createNote();
      return;
    }
    updateNote();
  };

  const alertSaveSuccess = () => {
    toastAlert("Save success");
    setTimeout(() => {
      closeAlert();
    }, 1000);
  };

  const updateNote = () => {
    if (!databases) return;
    const result = databases.updateDocument(
      DatabaseId.focusifyApp,
      CollectionId.note,
      selectedNote,
      {
        title: titleInput,
        text: editorRef.current.getContent(),
      }
    );
    result
      .then(function (response: any) {
        console.log(response);
        alertSaveSuccess();
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  const createNote = () => {
    if (!databases) return;
    const result = databases.createDocument(
      DatabaseId.focusifyApp,
      CollectionId.note,
      ID.unique(),
      {
        title: titleInput,
        text: editorRef.current.getContent(),
      }
    );
    result
      .then(function (response: any) {
        dispath(setSelectNote(response.$id));
        console.log(response);
        alertSaveSuccess();
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  const handleDeleteNote = () => {
    openAlert(
      "Are you sure you want to delete this note?",
      () => console.log("Cancel"),
      () => {
        deleteNote();
      }
    );

    const deleteNote = () => {
      if (!databases) return;
      const result = databases.deleteDocument(
        DatabaseId.focusifyApp,
        CollectionId.note,
        selectedNote
      );
      result
        .then(function (response: any) {
          toastAlert("Delete success");
          setTimeout(() => {
            closeAlert();
            backToMain();
          }, 1000);
          console.log(response);
        })
        .catch(function (error: any) {
          console.log(error);
        });
    };
  };

  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.7 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="bg-primary bg-opacity-95 backdrop-blur-lg border border-primaryLight rounded-md text-sm w-[550px]">
        <div className="flex justify-between">
          <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
            <i
              onClick={backToMain}
              className="fi fi-sr-arrow-left cursor-pointer"
            ></i>
          </div>
          <div className="w-full cursor-grab handle"></div>
          <div className="px-5 pt-4 pb-2 items-center flex space-x-2">
            <i
              onClick={handleDeleteNote}
              className="fi fi-sr-trash text-lg cursor-pointer border-r border-gray-500 pr-1"
            ></i>
            <i
              onClick={handleSaveNote}
              className="fi fi-sr-disk text-lg cursor-pointer"
            ></i>
          </div>
        </div>
        <div className="px-5 pt-2 pb-5">
          <input
            onChange={(e) => setTitleInput(e.target.value)}
            value={titleInput}
            type="text"
            placeholder="Note title..."
            className="bg-primaryLight rounded-md px-3 py-2 outline-none mb-2 w-2/3"
          />
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={detail}
            apiKey="3sebmkk1m4t8x0vcudqws9lwdz2pqzs60giqdco3yfhleubs"
            init={{
              skin: "oxide-dark",
              content_css: ["/content.css"],
              height: 450,
              menubar: false,
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default NoteDetail;
