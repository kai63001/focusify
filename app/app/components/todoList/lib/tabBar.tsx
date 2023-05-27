import { useState } from "react";
import { initialTabs as tabs } from "./ingredients";
import { motion, AnimatePresence } from "framer-motion";
import ToDoDetailDescription from "./description";

const TabBar = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <div className="window w-full px-5 py-5">
      <nav className="w-full">
        <ul className="flex space-x-5 w-full">
          {tabs.map((item) => (
            <li
              key={item.label}
              className={`${
                item === selectedTab ? "selected " : ""
              } cursor-pointer w-28 text-center`}
              onClick={() => setSelectedTab(item)}
            >
              {`${item.label}`}
              {item === selectedTab ? (
                <motion.div
                  className="border-b-2  pt-1 px-5"
                  layoutId="underline"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main className="mt-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab.label == "Description" ? (
              <ToDoDetailDescription
                description={"should go to the toilet first"}
              />
            ) : (
              "😋"
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TabBar;
