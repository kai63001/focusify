import { motion } from "framer-motion";

const ToDoDetailDescription = ({ description }: { description: string }) => {
  return (
    <>
      <div className="bg-primaryLight rounded-md p-3 text-md">
        {/* textare a*/}
        <textarea
          className="w-full h-full bg-transparent resize-none outline-none"
          placeholder="Add a more detailed description..."
          defaultValue={description}
          rows={4}
          id="description"
        ></textarea>
        <label htmlFor="description" className="flex w-full justify-end cursor-text">
          <motion.div
            className="box select-none "
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button
              className="bg-primary px-5 py-2 rounded-md cursor-pointer"
            >
              Save
            </button>
          </motion.div>
        </label>
      </div>
    </>
  );
};

export default ToDoDetailDescription;
